# Purflo — Bottled Drinking Water Website

A single-page MERN stack website for the Purflo drinking water brand (19L, 6L, 1.5L, 500ml), with
a secure contact form that saves enquiries to MongoDB and emails you a notification.

```
purflo-water/
├── client/     React (Vite) single-page frontend
└── server/     Express + MongoDB API (contact form only)
```

---

## 1. Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account
- A [Vercel](https://vercel.com) or [Netlify](https://netlify.com) account (frontend hosting)
- An email account to send from (Gmail with an **App Password**, or any SMTP provider)

---

## 2. Run it locally

### 2.1 Backend

```bash
cd server
cp .env.example .env      # then fill in the values, see section 3 below
npm install
npm run dev                # starts on http://localhost:5000
```

### 2.2 Frontend

In a second terminal:

```bash
cd client
npm install
npm run dev                # starts on http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`, so you don't need to set
`VITE_API_URL` locally. Open http://localhost:5173 and test the contact form — a submission
should appear in your MongoDB Atlas collection and land in your inbox.

---

## 3. Setting up MongoDB Atlas

1. Create a free cluster at MongoDB Atlas.
2. Under **Database Access**, create a database user with a strong password.
3. Under **Network Access**, add `0.0.0.0/0` (allow from anywhere) — required since your backend
   host's IP isn't fixed on most free hosting tiers.
4. Click **Connect → Drivers**, copy the connection string, and paste it into `server/.env` as
   `MONGODB_URI`. Replace `<password>` with your database user's password.

## 4. Setting up email (Nodemailer)

The easiest option is Gmail with an **App Password** (not your normal password):

1. Turn on 2-Step Verification on the Google account you'll send from.
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) and
   generate a 16-character app password.
3. In `server/.env`, set:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=465
   EMAIL_SECURE=true
   EMAIL_USER=your-gmail-address@gmail.com
   EMAIL_PASS=the-16-character-app-password
   EMAIL_TO=orders@purflowater.com   # where you want enquiries delivered
   ```

Any other SMTP provider (Zoho, SendGrid, Mailgun, your own domain email) works the same way —
just change the host/port.

---

## 5. Deployment

**Why two different hosts?** Vercel/Netlify are built for static frontends and short-lived
serverless functions. Our backend is a small, always-on Express server with in-memory rate
limiting, which fits better on a host that keeps a persistent Node process running. We'll deploy:

- **Frontend** → Vercel or Netlify (as you planned)
- **Backend** → [Render](https://render.com) (free tier, same idea as Vercel but for persistent
  Node servers) or Railway — both are drag-and-drop from GitHub
- **Database** → MongoDB Atlas (as you planned)

### 5.1 Push to GitHub

```bash
cd purflo-water
git init
git add .
git commit -m "Initial Purflo website"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

### 5.2 Deploy the backend (Render)

1. Go to Render → **New → Web Service** → connect your GitHub repo.
2. **Root directory:** `server`
3. **Build command:** `npm install`
4. **Start command:** `npm start`
5. Add all the variables from `server/.env` under **Environment**.
6. Deploy. Note the URL Render gives you, e.g. `https://purflo-api.onrender.com`.
7. Once the frontend is deployed too (next step), come back and set `CLIENT_ORIGIN` to your
   real frontend URL(s), comma-separated, then redeploy.

### 5.3 Deploy the frontend (Vercel)

1. Go to Vercel → **Add New → Project** → import the same GitHub repo.
2. **Root directory:** `client`
3. **Framework preset:** Vite (auto-detected)
4. Add an environment variable: `VITE_API_URL` = `https://purflo-api.onrender.com/api`
   (your Render URL from step 5.2, with `/api` on the end)
5. Deploy. Vercel gives you a URL like `https://purflo-water.vercel.app`.

*(Netlify: same idea — root directory `client`, build command `npm run build`, publish
directory `dist`, and the same `VITE_API_URL` environment variable.)*

### 5.4 Connect a custom domain

Both Render and Vercel/Netlify support adding your own domain (e.g. `purflowater.com`) under
their **Domains** settings — point your domain's DNS records as each dashboard instructs, and
both platforms issue free HTTPS certificates automatically.

---

## 6. Security features already built in

- **Helmet** sets secure HTTP headers, including a Content-Security-Policy.
- **CORS allowlist** — only origins listed in `CLIENT_ORIGIN` can call the API.
- **Rate limiting** — 5 contact submissions per 15 minutes per IP (plus a general API limit).
- **Input validation** (`express-validator`) — every field is checked for type, length, and format.
- **Sanitization** — inputs are stripped of HTML/script content (`xss`) and MongoDB operator
  injection is blocked (`express-mongo-sanitize`).
- **Honeypot field** — a hidden form field that only bots fill in, silently rejected server-side.
- **Small JSON body limit** (10kb) so the API can't be used to upload large payloads.
- Environment variables keep all secrets (DB password, email password) out of the codebase —
  never commit your real `.env` file (it's already in `.gitignore`).

## 7. Customizing content

- **Contact details, phone/email/hours:** `client/src/components/Contact.jsx` and `Footer.jsx`
- **Product descriptions:** `client/src/components/Products.jsx`
- **About copy:** `client/src/components/About.jsx`
- **Quality/certification claims:** `client/src/components/WhyChooseUs.jsx` — the copy there is
  written generically (filtration, testing, sanitized bottles). If you hold specific
  certifications (e.g. a national standards body approval), add them here with the real
  certificate name/number rather than generic wording.
- **Colors/fonts:** `client/src/styles/tokens.css`
- **Images:** `client/src/assets/` — replace with real product photography when you have it;
  the current images are the marketing renders you supplied.

## 8. Viewing contact submissions

There's no admin panel by design (per your requirements). Submissions land in your inbox via
email, and are also saved permanently to the `contacts` collection in MongoDB Atlas — you can
browse them anytime from the Atlas dashboard under **Browse Collections**, or export them, or
ask me to build a simple admin view later if you want one.
