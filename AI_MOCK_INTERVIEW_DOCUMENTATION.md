# AI Mock Interview Assistant

## Overview
An intelligent interview preparation platform that leverages AI to conduct mock interviews, provide real-time feedback, and help candidates improve their interview skills. The application uses Next.js, Google's Gemini AI, and various modern web technologies to create an interactive and personalized interview experience.

## Features

### 1. Interactive Interview Sessions
- Real-time video recording through webcam integration
- Speech-to-text conversion for answer transcription
- AI-powered question generation based on job role and experience
- Dynamic question navigation system
- Real-time feedback on answers

### 2. Personalized Experience
- Custom interview creation based on:
  - Job role/position
  - Job description
  - Years of experience
  - Projects and skills
  - Resume details

### 3. Comprehensive Feedback
- Question-by-question analysis
- Rating system for answers
- Detailed feedback for improvement
- Historical interview data tracking

### 4. User Authentication
- Secure sign-up and sign-in using Clerk
- Protected routes and user-specific data

## Technology Stack

### Frontend
- Next.js 14
- React
- TailwindCSS
- Radix UI Components
- React Webcam
- React Speech-to-Text

### Backend
- Next.js API Routes
- Google Generative AI (Gemini)
- Drizzle ORM
- PostgreSQL (Neon Database)

### Authentication
- Clerk Authentication

### Additional Tools
- Moment.js for date handling
- UUID for unique identifiers
- Sonner for toast notifications

## Project Structure

### Core Components

1. **Dashboard**
   - Interview creation interface
   - Previous interview list
   - Navigation header

2. **Interview Process**
   - Question display
   - Webcam recording
   - Answer transcription
   - Real-time feedback

3. **Feedback System**
   - Comprehensive feedback display
   - Rating visualization
   - Answer comparison

## Setup Instructions

1. **Prerequisites**
   ```bash
   Node.js >= 18
   npm or yarn or pnpm
   ```

2. **Environment Variables**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_DRIZZEL=your_neon_database_url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

3. **Installation**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. **Database Setup**
   ```bash
   npm run db:push
   ```

5. **Development Server**
   ```bash
   npm run dev
   ```

## Database Schema

### MockInterview Table

## Key Features Implementation

### 1. Interview Creation
The AddNewInterview component handles the creation of new interview sessions:

### 2. Real-time Interview Process
The interview process is managed through multiple components:
- Question display and navigation
- Webcam integration
- Speech-to-text conversion
- Real-time answer processing

### 3. Feedback Generation
The system uses Google's Gemini AI to generate detailed feedback:

```

2. **Authentication Flow**
- Sign-up and Sign-in pages
- Protected dashboard access
- Secure API routes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.


