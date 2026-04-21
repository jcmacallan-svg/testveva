const STORAGE_KEY = 'military-vocab-gh-pages-submissions-v1';
const SESSION_KEY = 'military-vocab-gh-pages-session-v1';

const loginView = document.getElementById('loginView');
const quizView = document.getElementById('quizView');
const studentForm = document.getElementById('studentForm');
const quizForm = document.getElementById('quizForm');
const resultView = document.getElementById('resultView');
const localSubmissions = document.getElementById('localSubmissions');
const studentSummary = document.getElementById('studentSummary');
const resetSessionBtn = document.getElementById('resetSession');

studentForm.addEventListener('submit', startQuiz);
resetSessionBtn.addEventListener('click', resetSession);

function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch { return null; }
}
function setSession(value) { localStorage.setItem(SESSION_KEY, JSON.stringify(value)); }
function clearSession() { localStorage.removeItem(SESSION_KEY); }
function getSubmissions() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
}
function setSubmissions(value) { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); }

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function showQuiz() {
  const session = getSession();
  if (!session) {
    loginView.classList.remove('hidden');
    quizView.classList.add('hidden');
    return;
  }
  loginView.classList.add('hidden');
  quizView.classList.remove('hidden');
  studentSummary.textContent = `${session.studentName} — ${session.className}${session.studentId ? ` — ${session.studentId}` : ''}`;
  renderQuiz();
  renderSubmissions();
}

function startQuiz(event) {
  event.preventDefault();
  const formData = new FormData(studentForm);
  const session = Object.fromEntries(formData.entries());
  session.startedAt = new Date().toISOString();
  setSession(session);
  showQuiz();
}

function resetSession() {
  if (!confirm('Nieuwe student starten? De lokale inzendingen blijven bewaard op dit apparaat.')) return;
  clearSession();
  resultView.classList.add('hidden');
  resultView.innerHTML = '';
  studentForm.reset();
  showQuiz();
}

function renderQuiz() {
  quizForm.innerHTML = '<h3>Meerkeuzetoets</h3>';

  QUESTIONS.forEach((q, index) => {
    const section = document.createElement('section');
    section.className = 'question';
    section.innerHTML = `
      <p><strong>${index + 1}. ${escapeHtml(q.question)}</strong></p>
      <div class="options">
        ${q.options.map((option, i) => `
          <label>
            <input type="radio" name="q-${q.id}" value="${i}" required />
            <span>${escapeHtml(option)}</span>
          </label>
        `).join('')}
      </div>
    `;
    quizForm.appendChild(section);
  });

  const finalSection = document.createElement('section');
  finalSection.className = 'question stack';
  finalSection.innerHTML = `
    <label>
      Screenshot van je resultaat
      <input type="file" id="screenshotInput" accept=".png,.jpg,.jpeg,.webp" required />
    </label>
    <button type="submit">Nakijken</button>
    <p class="muted small">Deze upload wordt alleen in de browser opgeslagen, niet online.</p>
  `;
  quizForm.appendChild(finalSection);
  quizForm.onsubmit = submitQuiz;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Kon screenshot niet lezen.'));
    reader.readAsDataURL(file);
  });
}

async function submitQuiz(event) {
  event.preventDefault();
  const session = getSession();
  if (!session) return showQuiz();

  const answers = {};
  let correct = 0;
  const review = [];

  for (const q of QUESTIONS) {
    const selected = quizForm.querySelector(`input[name="q-${q.id}"]:checked`);
    if (!selected) {
      alert('Beantwoord eerst alle vragen.');
      return;
    }
    const chosen = Number(selected.value);
    answers[q.id] = chosen;
    const isCorrect = chosen === q.answer;
    if (isCorrect) correct += 1;
    review.push({
      id: q.id,
      question: q.question,
      chosenIndex: chosen,
      chosenText: q.options[chosen],
      correctIndex: q.answer,
      correctText: q.options[q.answer],
      isCorrect
    });
  }

  const screenshotFile = document.getElementById('screenshotInput').files[0];
  if (!screenshotFile) {
    alert('Upload een screenshot van je resultaat.');
    return;
  }

  const screenshotDataUrl = await fileToDataUrl(screenshotFile);
  const total = QUESTIONS.length;
  const score = Math.round((correct / total) * 100);

  const submission = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    studentName: session.studentName,
    className: session.className,
    studentId: session.studentId || '',
    submittedAt: new Date().toISOString(),
    score,
    correct,
    total,
    answers,
    review,
    screenshotName: screenshotFile.name,
    screenshotDataUrl
  };

  const submissions = getSubmissions();
  submissions.unshift(submission);
  setSubmissions(submissions);

  renderResult(submission);
  renderSubmissions();
  downloadSubmission(submission);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderResult(submission) {
  resultView.classList.remove('hidden');
  resultView.innerHTML = `
    <h3>Resultaat</h3>
    <p class="resultScore">${submission.score}%</p>
    <p class="success">${submission.correct} van ${submission.total} goed</p>
    <p class="muted">Ingeleverd op ${new Date(submission.submittedAt).toLocaleString('nl-NL')}</p>
    <p><strong>Belangrijk:</strong> je JSON-bestand wordt automatisch gedownload. Lever dat bestand samen met je screenshot in bij de docent.</p>
    <p><img src="${submission.screenshotDataUrl}" alt="Screenshot van resultaat" /></p>
    <div class="actions">
      <button id="downloadAgain">Download inzending opnieuw</button>
    </div>
    <div class="answerReview">
      ${submission.review.map((item, i) => `
        <article class="${item.isCorrect ? 'good' : 'bad'}">
          <p><strong>${i + 1}. ${escapeHtml(item.question)}</strong></p>
          <p>Jouw antwoord: ${escapeHtml(item.chosenText)}</p>
          ${item.isCorrect ? '<p class="success">Goed</p>' : `<p class="error">Fout — juiste antwoord: ${escapeHtml(item.correctText)}</p>`}
        </article>
      `).join('')}
    </div>
  `;
  document.getElementById('downloadAgain').addEventListener('click', () => downloadSubmission(submission));
}

function downloadSubmission(submission) {
  const safeName = `${submission.studentName || 'student'}-${submission.className || 'klas'}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '');
  const blob = new Blob([JSON.stringify(submission, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${safeName || 'inzending'}-${new Date(submission.submittedAt).toISOString().slice(0,19).replaceAll(':','-')}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function renderSubmissions() {
  const session = getSession();
  const submissions = getSubmissions().filter(s => !session || (s.studentName === session.studentName && s.className === session.className));
  if (!submissions.length) {
    localSubmissions.innerHTML = '<p class="muted">Nog geen lokale inzendingen voor deze student op dit apparaat.</p>';
    return;
  }

  localSubmissions.innerHTML = submissions.map(s => `
    <article class="submission">
      <p><span class="badge">${s.score}%</span></p>
      <p><strong>${escapeHtml(s.studentName)}</strong> — ${escapeHtml(s.className)}</p>
      <p>${s.correct}/${s.total} goed</p>
      <p class="muted">${new Date(s.submittedAt).toLocaleString('nl-NL')}</p>
      <img src="${s.screenshotDataUrl}" alt="Screenshot van resultaat" />
      <div class="actions">
        <button data-id="${s.id}" class="downloadLocal secondary">Download JSON</button>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.downloadLocal').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = getSubmissions().find(s => s.id === btn.dataset.id);
      if (item) downloadSubmission(item);
    });
  });
}

showQuiz();
