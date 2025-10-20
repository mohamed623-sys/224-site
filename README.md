# 224 - (today - tomorrow - forever)
This is a starter project scaffold that reproduces the homepage you requested with:
- Black + deep purple gradient, animated star background
- Hero, Shop, Cart, Admin pages
- "Custom Design" button and email sending with EmailJS template variables:
  - user_name: {{user_name}}
  - user_email: {{user_email}}
  - message: {{message}}
- Clerk auth placeholders (configure your Clerk keys in .env)
- Firebase placeholders (you said firebase credentials already in .env)
- Simulated payment server endpoints for Vodafone Cash, Meeza card, and Cash on Delivery (COD).
  **Important:** The included server endpoints are mocks/simulations for development and testing only.
  **You must integrate a real payment gateway merchant account (local provider) to accept actual money.**
- Admin actions (add/remove product) protected by checking signed-in user's email against ADMIN_EMAIL in .env.

## What you get in the zip
- `app/` - React + Tailwind frontend (Vite)
- `server/` - small Node/Express mock server that simulates payment flows
- `.env.example` - shows environment variables to set
- `README.md` - (this file)

## How to run (development)
1. Copy `.env.example` to `.env` and fill in values (Clerk keys, Firebase config, ADMIN_EMAIL).
2. Install dependencies:
   ```
   cd /path/to/project
   npm install
   ```
3. Run the mock server:
   ```
   npm run server
   ```
   Server runs at http://localhost:4000
4. In another terminal, run the frontend:
   ```
   npm run dev --prefix app
   ```
   Frontend runs at http://localhost:5173 by default.

## Important: Real payments
- The code contains simulated payment endpoints in `server/`. To accept real Vodafone Cash / Meeza / card payments you must:
  1. Register with a local payment provider (e.g., a gateway that supports Meeza cards and Vodafone Cash in your country).
  2. Replace the mock endpoints in `server/` with the provider's official SDK/API calls and webhooks.
  3. Ensure server-side secret keys are stored in `.env` (never committed).
  4. Test in the provider's sandbox, then go live.

If you want, I can add integration notes for a specific Egyptian gateway (Fawry, PayTabs, or a bank gateway) — tell me which provider you choose and I'll add server-side code showing the required API calls.

## Admin email
Set `ADMIN_EMAIL` in `.env` to the admin email you want (your message included `mohamedtareq543219` — put the full valid email address there).

## EmailJS
The frontend uses EmailJS. Template variables used when sending:
- user_name: {{user_name}}
- user_email: {{user_email}}
- message: {{message}}

Configure `EMAILJS_USER_ID`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID` in `.env`.

## Visuals
The hero uses a black -> deep purple gradient with an animated starfield background and glowing text.

--- End of README
