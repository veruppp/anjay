# V-Cloud

Simple file hosting and embed service for video, image, and audio.  
Built with Next.js, local storage, and styled with blue/white minimalist theme.

## Features

- Upload video, image, and audio
- Public share links like `/e/[slug]`
- Animated upload progress
- No login required
- Store files locally (`/public/uploads`)
- Simple clean UI (white + blue)

## Tech Stack

- Next.js 14
- TypeScript
- Prisma + SQLite
- CSS + React + Axios

## Run Locally

```bash
git clone https://github.com/yourusername/v-cloud.git
cd v-cloud
npm install
npx prisma migrate dev --name init
npm run dev
```

## Deploy

Push to GitHub, then deploy with [Vercel](https://vercel.com).
