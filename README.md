# Military Vocabulary Quiz App

GitHub + Render-ready Node/Express app for a multiple-choice quiz based on **Engels Vocabulary Veva.pdf, pages 4-16**.

Students can:
- log in
- complete the multiple-choice quiz
- get an automatic score
- upload a screenshot of their result

A teacher/admin can:
- log in
- view all submissions
- see scores and uploaded screenshots
- export results as CSV

## Demo accounts

### Teacher
- username: `docent`
- password: `Welkom123!`

### Students
- username: `student1` / password: `Welkom123!`
- username: `student2` / password: `Welkom123!`
- username: `student3` / password: `Welkom123!`

You can edit the seed users in `data/users.seed.json`.

## Local start

```bash
npm install
npm start
```

Open:

```bash
http://localhost:3000
```

## Runtime storage

This app writes these files while running:
- `storage/data/users.json`
- `storage/data/submissions.json`
- `storage/uploads/*`

On first start, it automatically copies seed files from `data/*.seed.json` into `storage/data/`.

## Deploy to GitHub

1. Unzip this project.
2. Create a new GitHub repository.
3. Upload all files, including `render.yaml`.
4. Commit and push.

## Deploy to Render

### Fastest way: Blueprint deploy

1. Log in to Render.
2. Click **New +** → **Blueprint**.
3. Connect your GitHub repository.
4. Select the repo that contains this project.
5. Render reads `render.yaml` automatically.
6. Confirm the service settings.
7. Deploy.

### What `render.yaml` already sets

- `buildCommand`: `npm install`
- `startCommand`: `npm start`
- `healthCheckPath`: `/healthz`
- `APP_DATA_DIR`: `/opt/render/project/src/storage`
- a generated `SESSION_SECRET`
- a persistent disk mounted at `/opt/render/project/src/storage`

## Important for Render

This app stores results and screenshots on disk.
If you remove the disk, uploaded screenshots and saved submissions will not survive redeploys or restarts.

## Recommended next improvements

- hash passwords with `bcrypt`
- replace JSON storage with PostgreSQL or SQLite
- add per-student result history filters
- add teacher-only student management

## Project structure

- `server.js` – backend
- `questions.json` – quiz questions
- `public/` – frontend
- `data/users.seed.json` – starter users
- `data/submissions.seed.json` – starter submissions file
- `storage/` – runtime data and uploaded screenshots (ignored by Git)
- `render.yaml` – Render deployment blueprint

## Notes

- Screenshot upload limit: 5 MB
- Allowed formats: PNG, JPG, JPEG, WEBP
- This is a practical school/demo app; for production, use hashed passwords and a database
