const STORAGE_KEY = 'military-vocab-gh-pages-submissions-v4';
const SESSION_KEY = 'military-vocab-gh-pages-session-v4';
const COUNTER_KEY = 'military-vocab-gh-pages-start-counters-v2';

const loginView = document.getElementById('loginView');
const quizView = document.getElementById('quizView');
const studentForm = document.getElementById('studentForm');
const quizForm = document.getElementById('quizForm');
const resultView = document.getElementById('resultView');
const localSubmissions = document.getElementById('localSubmissions');
const studentSummary = document.getElementById('studentSummary');
const resetSessionBtn = document.getElementById('resetSession');
const resultModal = document.getElementById('resultModal');
const modalStudent = document.getElementById('modalStudent');
const modalScore = document.getElementById('modalScore');
const modalAnswered = document.getElementById('modalAnswered');
const modalSecretCode = document.getElementById('modalSecretCode');
const acknowledgeBtn = document.getElementById('acknowledgeBtn');
const showAnswersBtn = document.getElementById('showAnswersBtn');

let pendingSubmission = null;

studentForm.addEventListener('submit', startQuiz);
resetSessionBtn.addEventListener('click', resetSession);
acknowledgeBtn.addEventListener('click', () => closeModal(false));
showAnswersBtn.addEventListener('click', () => closeModal(true));
resultModal.addEventListener('click', (event) => {
  if (event.target === resultModal) closeModal(false);
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !resultModal.classList.contains('hidden')) closeModal(false);
});

function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch { return null; }
}
function setSession(value) { localStorage.setItem(SESSION_KEY, JSON.stringify(value)); }
function clearSession() { localStorage.removeItem(SESSION_KEY); }
function getSubmissions() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
}
function setSubmissions(value) { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); }
function getCounters() {
  try { return JSON.parse(localStorage.getItem(COUNTER_KEY)) || {}; } catch { return {}; }
}
function setCounters(value) { localStorage.setItem(COUNTER_KEY, JSON.stringify(value)); }

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function makeStudentKey(sessionLike) {
  const parts = [sessionLike.studentName || '', sessionLike.className || '', sessionLike.studentId || ''];
  return parts.map(v => String(v).trim().toLowerCase()).join('|');
}

function numberToAlphabetCode(num) {
  if (!Number.isFinite(num) || num < 1) return '';
  let n = Math.floor(num);
  let out = '';
  while (n > 0) {
    n -= 1;
    out = String.fromCharCode(65 + (n % 26)) + out;
    n = Math.floor(n / 26);
  }
  return out;
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

  const counters = getCounters();
  const key = makeStudentKey(session);
  counters[key] = (counters[key] || 0) + 1;
  session.startCount = counters[key];
  setCounters(counters);

  setSession(session);
  pendingSubmission = null;
  resultView.classList.add('hidden');
  resultView.innerHTML = '';
  showQuiz();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetSession() {
  if (!confirm('Nieuwe student starten? Eerdere resultaten op dit apparaat blijven bewaard.')) return;
  clearSession();
  pendingSubmission = null;
  resultView.classList.add('hidden');
  resultView.innerHTML = '';
  studentForm.reset();
  showQuiz();
}

function renderQuiz() {
  quizForm.innerHTML = '<h3>Meerkeuzetoets met 35 vragen</h3>';

  let currentCategory = '';
  QUESTIONS.forEach((q, index) => {
    if (q.category !== currentCategory) {
      currentCategory = q.category;
      const heading = document.createElement('div');
      heading.className = 'categoryHeading';
      heading.innerHTML = `<h4>${escapeHtml(currentCategory)}</h4>`;
      quizForm.appendChild(heading);
    }

    const section = document.createElement('section');
    section.className = 'question';
    section.innerHTML = `
      <p><strong>${index + 1}.</strong> ${q.questionHtml}</p>
      <div class="options">
        ${q.options.map((option, i) => `
          <label>
            <input type="radio" name="q-${q.id}" value="${i}" required />
            <span>${String.fromCharCode(65 + i)}. ${escapeHtml(option)}</span>
          </label>
        `).join('')}
      </div>
    `;
    quizForm.appendChild(section);
  });

  const finalSection = document.createElement('section');
  finalSection.className = 'question stack finalQuestion';
  finalSection.innerHTML = `
    <button type="submit" class="submitBtn">Nakijken</button>
    <p class="muted small">Na het nakijken zie je eerst je score in een pop-up en daarna het antwoordoverzicht.</p>
  `;
  quizForm.appendChild(finalSection);
  quizForm.onsubmit = submitQuiz;
}

function submitQuiz(event) {
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
      category: q.category,
      questionHtml: q.questionHtml,
      chosenIndex: chosen,
      chosenText: q.options[chosen],
      correctIndex: q.answer,
      correctText: q.options[q.answer],
      isCorrect,
      explanation: q.explanation || ''
    });
  }

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
    secretCode: numberToAlphabetCode(session.startCount || 1),
    startCount: session.startCount || 1
  };

  const submissions = getSubmissions();
  submissions.unshift(submission);
  setSubmissions(submissions);

  pendingSubmission = submission;
  renderSubmissions();
  openModal(submission);
}

function openModal(submission) {
  modalStudent.textContent = `Student: ${submission.studentName}`;
  modalScore.textContent = `${submission.score}%`;
  modalAnswered.textContent = `${submission.total} van ${submission.total}`;
  modalSecretCode.textContent = escapeHtml(submission.secretCode);
  resultModal.classList.remove('hidden');
  resultModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modalOpen');
}

function closeModal(scrollToAnswers) {
  resultModal.classList.add('hidden');
  resultModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modalOpen');
  if (!pendingSubmission) return;
  renderResult(pendingSubmission);
  if (scrollToAnswers) {
    resultView.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function renderResult(submission) {
  resultView.classList.remove('hidden');
  resultView.innerHTML = `
    <h3>Resultaat</h3>
    <p class="resultScore">${submission.score}%</p>
    <p class="success">${submission.correct} van ${submission.total} goed</p>
    <p class="muted">Nagekeken op ${new Date(submission.submittedAt).toLocaleString('nl-NL')}</p>
    <div class="answerReview">
      <h4>Antwoordenoverzicht</h4>
      ${submission.review.map((item, i) => `
        <article class="${item.isCorrect ? 'good' : 'bad'}">
          <p class="reviewCategory">${escapeHtml(item.category)}</p>
          <p><strong>${i + 1}.</strong> ${item.questionHtml}</p>
          <p>Jouw antwoord: <strong>${escapeHtml(item.chosenText)}</strong></p>
          <p>Goed antwoord: <strong>${escapeHtml(item.correctText)}</strong></p>
          ${item.isCorrect ? '<p class="success">Goed</p>' : '<p class="error">Fout</p>'}
          ${item.explanation ? `<p class="muted small">${escapeHtml(item.explanation)}</p>` : ''}
        </article>
      `).join('')}
    </div>
    <div class="secretCode" aria-hidden="true">${escapeHtml(submission.secretCode)}</div>
  `;
}

function renderSubmissions() {
  const session = getSession();
  const submissions = getSubmissions().filter(s => !session || (s.studentName === session.studentName && s.className === session.className && (s.studentId || '') === (session.studentId || '')));
  if (!submissions.length) {
    localSubmissions.innerHTML = '<p class="muted">Nog geen eerdere resultaten voor deze student op dit apparaat.</p>';
    return;
  }

  localSubmissions.innerHTML = submissions.map(s => `
    <article class="submission">
      <p><span class="badge">${s.score}%</span></p>
      <p><strong>${escapeHtml(s.studentName)}</strong> — ${escapeHtml(s.className)}${s.studentId ? ` — ${escapeHtml(s.studentId)}` : ''}</p>
      <p>${s.correct}/${s.total} goed</p>
      <p class="muted small">${new Date(s.submittedAt).toLocaleString('nl-NL')}</p>
    </article>
  `).join('');
}

showQuiz();
