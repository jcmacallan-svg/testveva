# Military Vocabulary Quiz App

GitHub-ready Node/Express app for a multiple-choice quiz based on **Engels Vocabulary Veva.pdf, pages 4-16** (Key Military Terms and Expressions D-E). Students can:

- log in
- complete the multiple-choice quiz
- get an automatic score
- upload a screenshot of their result

A teacher/admin can:

- log in
- view all submissions
- see scores and uploaded screenshots

## Demo accounts

### Teacher
- username: `docent`
- password: `Welkom123!`

### Students
- username: `student1` / password: `Welkom123!`
- username: `student2` / password: `Welkom123!`
- username: `student3` / password: `Welkom123!`

You can edit users in `data/users.json`.

## Install and run

```bash
npm install
npm start
```

Then open:

```bash
http://localhost:3000
```

## Project structure

- `server.js` – backend
- `questions.json` – quiz questions
- `public/` – frontend files
- `data/users.json` – demo users
- `data/submissions.json` – stored results
- `public/uploads/` – uploaded screenshots

## Notes

- This is a practical school/demo app and uses JSON files for storage.
- For production use, replace JSON storage with a database and use hashed passwords.
- Upload size is limited to 5 MB per screenshot.
