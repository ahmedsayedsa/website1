# Al-Maali Tours Website

A premium full-stack travel agency website built with Next.js 14, Tailwind CSS, and Prisma.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (via Prisma ORM)
- **Internationalization**: next-intl (Arabic/English)

## Getting Started

1. **Environment Setup**:
   Copy `.env.example` to `.env` and configure your database URL.

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Database**:
   ```bash
   # Start DB container
   docker-compose up -d
   
   # Initialize Schema
   npx prisma db push
   
   # Seed Initial Data
   npx prisma db seed
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## Admin Access
Navigate to `/en/admin` (or `/ar/admin`) to access the dashboard. 

## Features
- Dynamic Tour Packages
- Multi-step Booking Engine
- PayMob Payment Integration (Mock)
- Admin Dashboard
- Bilingual (RTL/LTR) Support
