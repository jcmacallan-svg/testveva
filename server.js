const express = require('express');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');
const RUNTIME_DIR = process.env.APP_DATA_DIR
  ? path.resolve(process.env.APP_DATA_DIR)
  : path.join(ROOT, 'storage');
const DATA_DIR = path.join(RUNTIME_DIR, 'data');
const UPLOAD_DIR = path.join(RUNTIME_DIR, 'uploads');
const SEED_DIR = path.join(ROOT, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');
const QUESTIONS_FILE = path.join(ROOT, 'questions.json');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function ensureFileFromSeed(target, seed, fallbackContent) {
  if (fs.existsSync(target)) return;
  if (seed && fs.existsSync(seed)) {
    fs.copyFileSync(seed, target);
    return;
  }
  fs.writeFileSync(target, fallbackContent, 'utf8');
}

ensureDir(RUNTIME_DIR);
ensureDir(DATA_DIR);
ensureDir(UPLOAD_DIR);
ensureFileFromSeed(USERS_FILE, path.join(SEED_DIR, 'users.seed.json'), '[]\n');
ensureFileFromSeed(SUBMISSIONS_FILE, path.join(SEED_DIR, 'submissions.seed.json'), '[]\n');

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-this-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction,
    maxAge: 1000 * 60 * 60 * 8
  }
}));
app.use(express.static(PUBLIC_DIR));
app.use('/uploads', express.static(UPLOAD_DIR));

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (_error) {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Niet ingelogd.' });
  }
  next();
}

function requireTeacher(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'teacher') {
    return res.status(403).json({ error: 'Alleen voor docent.' });
  }
  next();
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}-${req.session.user.username}-${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Alleen PNG, JPG of WEBP is toegestaan.'));
    }
    cb(null, true);
  }
});

app.get('/healthz', (_req, res) => {
  res.status(200).json({ ok: true, uptime: process.uptime() });
});

app.get('/api/me', (req, res) => {
  res.json({ user: req.session.user || null });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = readJson(USERS_FILE, []);
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Onjuiste gebruikersnaam of wachtwoord.' });
  }

  req.session.user = {
    username: user.username,
    role: user.role,
    name: user.name
  };

  res.json({ ok: true, user: req.session.user });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/questions', requireAuth, (req, res) => {
  const questions = readJson(QUESTIONS_FILE, []).map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options
  }));
  res.json({ questions });
});

app.get('/api/my-submissions', requireAuth, (req, res) => {
  const submissions = readJson(SUBMISSIONS_FILE, []);
  const mine = submissions.filter((s) => s.username === req.session.user.username);
  res.json({ submissions: mine.reverse() });
});

app.post('/api/submit', requireAuth, upload.single('screenshot'), (req, res) => {
  if (req.session.user.role !== 'student') {
    return res.status(403).json({ error: 'Alleen studenten kunnen inleveren.' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Upload een screenshot van het resultaat.' });
  }

  let answers;
  try {
    answers = JSON.parse(req.body.answers || '{}');
  } catch (_error) {
    return res.status(400).json({ error: 'Antwoorden konden niet worden gelezen.' });
  }

  const questions = readJson(QUESTIONS_FILE, []);
  let correct = 0;

  const detailed = questions.map((q) => {
    const selected = Number(answers[q.id]);
    const isCorrect = selected === q.answer;
    if (isCorrect) correct += 1;
    return {
      id: q.id,
      selected,
      correctAnswer: q.answer,
      isCorrect
    };
  });

  const score = questions.length === 0 ? 0 : Math.round((correct / questions.length) * 100);

  const submissions = readJson(SUBMISSIONS_FILE, []);
  const record = {
    id: Date.now(),
    username: req.session.user.username,
    studentName: req.session.user.name,
    submittedAt: new Date().toISOString(),
    correct,
    total: questions.length,
    score,
    screenshot: `/uploads/${req.file.filename}`,
    answers: detailed
  };

  submissions.push(record);
  writeJson(SUBMISSIONS_FILE, submissions);

  res.json({
    ok: true,
    result: {
      correct,
      total: questions.length,
      score,
      screenshot: record.screenshot,
      submittedAt: record.submittedAt
    }
  });
});

app.get('/api/admin/submissions', requireTeacher, (_req, res) => {
  const submissions = readJson(SUBMISSIONS_FILE, []).sort((a, b) =>
    new Date(b.submittedAt) - new Date(a.submittedAt)
  );
  res.json({ submissions });
});

app.get('/api/admin/export', requireTeacher, (_req, res) => {
  const submissions = readJson(SUBMISSIONS_FILE, []);
  const header = ['student', 'username', 'submittedAt', 'correct', 'total', 'score', 'screenshot'];
  const rows = submissions.map((s) => [
    s.studentName,
    s.username,
    s.submittedAt,
    s.correct,
    s.total,
    s.score,
    s.screenshot
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="results.csv"');
  res.send(csv);
});

app.use((err, _req, res, _next) => {
  res.status(400).json({ error: err.message || 'Er ging iets mis.' });
});

app.listen(PORT, () => {
  console.log(`Military Vocabulary Quiz draait op http://localhost:${PORT}`);
  console.log(`Runtime data directory: ${RUNTIME_DIR}`);
});
