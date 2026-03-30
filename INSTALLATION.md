Getting Started — Recura SaaS Dashboard

Overview

Recura is a modern SaaS dashboard built with:

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript

Requirements

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm or yarn or pnpm
- Git (optional)

Installation

Step 1 — Extract Files

After purchase, unzip the project folder:
recura.zip → recura/

Step 2 — Open Project
cd recura

Step 3 — Install Dependencies
npm install

Step 4 — Run Development Server
npm run dev

Your app will run at:
http://localhost:4000

Production Build
npm run build
npm start

Environment Setup (IMPORTANT)

Create a .env.local file:
NEXT_PUBLIC_APP_NAME=Recura
NEXT_PUBLIC_API_URL=http://localhost:4000/api

You can also provide:
STRIPE_KEY=
PAYSTACK_KEY=

Project Structure

src/
 ├── app/
 ├── components/
 ├── modules/
 ├── lib/
 ├── styles/

Styling System

Tailwind CSS 4
Utility-first approach
Uses clsx + tailwind-merge

UI Components

Buttons
Inputs
Cards
Tables
Modals

All components are reusable.

Payment System

Supports:
- Stripe (ready)
- Paystack (extendable)
- Custom UI payment cards

Theme Support

Uses:
- next-themes

Supports:
- Light Mode
- Dark Mode
- System Mode

Charts & Analytics

Uses:
- recharts

Available charts:
- Line chart
- Bar chart
- Pie chart

Export Features

- PDF export (jspdf)
- Image export (html-to-image, html2canvas)

Customization Guide

Change Colors
Edit Tailwind config: tailwind.config.js

Update Branding
Go to: Settings → Branding

Modify Components
Edit: src/components/

Deployment

You can deploy on:
- Vercel (recommended)
- Netlify
- Any Node.js server

Deploy on Vercel:
npm install -g vercel
vercel

Linting
npm run lint

Troubleshooting

Port already in use
Change port: npm run dev -- -p 3000

Node version error
Install correct version: nvm install 18

Who is this for?
- SaaS founders
- Agencies
- Developers
- Startups

What You Can Build
- Subscription platforms
- Payment dashboards
- CRM systems
- Analytics tools
