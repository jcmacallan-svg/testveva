const loginView = document.getElementById('loginView');
const studentView = document.getElementById('studentView');
const teacherView = document.getElementById('teacherView');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const quizForm = document.getElementById('quizForm');
const resultBox = document.getElementById('resultBox');
const studentSubmissions = document.getElementById('studentSubmissions');
const teacherSubmissions = document.getElementById('teacherSubmissions');
const studentWelcome = document.getElementById('studentWelcome');
const teacherWelcome = document.getElementById('teacherWelcome');

document.getElementById('logoutStudent').addEventListener('click', logout);
document.getElementById('logoutTeacher').addEventListener('click', logout);
loginForm.addEventListener('submit', onLogin);

async function api(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Er ging iets mis.');
  }
  return data;
}

async function onLogin(event) {
  event.preventDefault();
  loginError.textContent = '';
  const formData = new FormData(loginForm);
  const body = Object.fromEntries(formData.entries());
  try {
    await api('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    loginForm.reset();
    await loadSession();
  } catch (error) {
    loginError.textContent = error.message;
  }
}

async function logout() {
  await api('/api/logout', { method: 'POST' });
  showLogin();
}

function showLogin() {
  loginView.classList.remove('hidden');
  studentView.classList.add('hidden');
  teacherView.classList.add('hidden');
}

async function loadSession() {
  const data = await api('/api/me');
  if (!data.user) {
    showLogin();
    return;
  }

  loginView.classList.add('hidden');

  if (data.user.role === 'teacher') {
    teacherView.classList.remove('hidden');
    studentView.classList.add('hidden');
    teacherWelcome.textContent = `Ingelogd als ${data.user.name} (${data.user.username})`;
    await renderTeacherSubmissions();
  } else {
    studentView.classList.remove('hidden');
    teacherView.classList.add('hidden');
    studentWelcome.textContent = `Ingelogd als ${data.user.name} (${data.user.username})`;
    await renderQuiz();
    await renderStudentSubmissions();
  }
}

async function renderQuiz() {
  const data = await api('/api/questions');
  quizForm.innerHTML = '<h3>Toets</h3>';

  data.questions.forEach((q, index) => {
    const block = document.createElement('section');
    block.className = 'question';
    block.innerHTML = `
      <p><strong>${index + 1}. ${q.question}</strong></p>
      <div class="options">
        ${q.options.map((option, i) => `
          <label>
            <input type="radio" name="q-${q.id}" value="${i}" required />
            <span>${option}</span>
          </label>
        `).join('')}
      </div>
    `;
    quizForm.appendChild(block);
  });

  const submitBlock = document.createElement('section');
  submitBlock.className = 'question';
  submitBlock.innerHTML = `
    <label>
      Screenshot van resultaat uploaden
      <input type="file" id="screenshot" accept=".png,.jpg,.jpeg,.webp" required />
    </label>
    <button type="submit">Nakijken en inleveren</button>
    <p class="muted">Je resultaat wordt automatisch berekend en samen met je screenshot opgeslagen.</p>
  `;
  quizForm.appendChild(submitBlock);

  quizForm.onsubmit = submitQuiz;
}

async function submitQuiz(event) {
  event.preventDefault();
  const data = await api('/api/questions');
  const answers = {};

  for (const q of data.questions) {
    const selected = quizForm.querySelector(`input[name="q-${q.id}"]:checked`);
    if (!selected) {
      alert('Beantwoord eerst alle vragen.');
      return;
    }
    answers[q.id] = Number(selected.value);
  }

  const screenshot = document.getElementById('screenshot').files[0];
  if (!screenshot) {
    alert('Upload een screenshot van je resultaat.');
    return;
  }

  const formData = new FormData();
  formData.append('answers', JSON.stringify(answers));
  formData.append('screenshot', screenshot);

  try {
    const response = await api('/api/submit', {
      method: 'POST',
      body: formData
    });

    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `
      <h3>Resultaat opgeslagen</h3>
      <p class="resultScore">${response.result.score}%</p>
      <p class="success">${response.result.correct} van ${response.result.total} goed.</p>
      <p class="muted">Ingeleverd op ${new Date(response.result.submittedAt).toLocaleString('nl-NL')}.</p>
      <p><a href="${response.result.screenshot}" target="_blank">Bekijk geüploade screenshot</a></p>
    `;

    await renderStudentSubmissions();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    alert(error.message);
  }
}

async function renderStudentSubmissions() {
  const data = await api('/api/my-submissions');
  if (!data.submissions.length) {
    studentSubmissions.innerHTML = '<p class="muted">Nog geen inzendingen.</p>';
    return;
  }

  studentSubmissions.innerHTML = data.submissions.map((s) => `
    <article class="submission">
      <p><span class="badge">${s.score}%</span></p>
      <p><strong>${s.correct}/${s.total} goed</strong></p>
      <p class="muted">${new Date(s.submittedAt).toLocaleString('nl-NL')}</p>
      <a href="${s.screenshot}" target="_blank">Screenshot openen</a>
      <img src="${s.screenshot}" alt="Screenshot van resultaat" />
    </article>
  `).join('');
}

async function renderTeacherSubmissions() {
  const data = await api('/api/admin/submissions');
  if (!data.submissions.length) {
    teacherSubmissions.innerHTML = '<p class="muted">Nog geen inzendingen.</p>';
    return;
  }

  teacherSubmissions.innerHTML = data.submissions.map((s) => `
    <article class="submission">
      <p><strong>${s.studentName}</strong> (${s.username})</p>
      <p><span class="badge">${s.score}%</span> — ${s.correct}/${s.total} goed</p>
      <p class="muted">${new Date(s.submittedAt).toLocaleString('nl-NL')}</p>
      <a href="${s.screenshot}" target="_blank">Screenshot openen</a>
      <img src="${s.screenshot}" alt="Screenshot van resultaat van ${s.studentName}" />
    </article>
  `).join('');
}

loadSession().catch(() => showLogin());
