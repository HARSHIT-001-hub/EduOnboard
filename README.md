# EduOnboard

EduOnboard is a comprehensive web application designed to streamline the student onboarding process for educational institutions. It provides a dual-interface system with dedicated portals for students and administrators, ensuring a smooth, transparent, and efficient admission and orientation experience.

## Key Features

The platform is divided into two main portals: one for students and one for administrators.

### Student Portal
- **Personalized Dashboard**: A central hub for students to view their overall onboarding progress, upcoming deadlines, and key stats.
- **Interactive Task Management**: A checklist-based system to guide students through all required onboarding tasks, such as fee payments, form submissions, and orientation attendance.
- **Document Hub**: A secure portal for uploading and tracking the status of required documents like academic records and identity proofs.
- **AI Assistant "EduBot"**: A rule-based chatbot that provides instant answers to common questions about deadlines, fees, documents, and procedures, with an option to escalate queries to a human advisor.
- **Notification Center**: Keeps students informed with timely alerts, reminders, and updates on their application status.

### Admin Portal
- **Centralized Overview**: A dashboard for administrators to monitor the real-time progress of the entire student batch.
- **Student Tracker**: A detailed searchable list of all students, showing their individual onboarding completion percentage, status, and contact details.
- **Document Verification**: A dedicated module for administrators to review, approve, or reject student-submitted documents.
- **Escalation Management**: A system to track, assign, and resolve issues reported by students.
- **Analytics & Reporting**: Provides insights into onboarding metrics, completion rates by department, and weekly progress trends.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend & Database**: Supabase (PostgreSQL, Auth, Storage, Serverless Functions)
- **UI & Styling**: Tailwind CSS, shadcn/ui, Framer Motion (animations), Recharts (charts)
- **State Management**: React Query, React Context
- **Routing**: React Router
- **Forms**: React Hook Form
- **Testing**: Vitest, React Testing Library

## Project Structure

The repository is organized to separate frontend logic from backend configuration.

```
.
├── src/
│   ├── components/    # Reusable UI components (shadcn/ui based)
│   ├── contexts/      # Global state (e.g., AuthContext)
│   ├── integrations/  # Supabase client and generated types
│   ├── pages/         # Top-level components for each route
│   │   └── admin/     # Components for the admin portal
│   └── lib/           # Utility functions
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/harshit-001-hub/EduOnboard.git
    cd EduOnboard
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Seed the Admin User**
    - **Default Admin Credentials:**
        - **Email:** `admin@eduonboard.com`
        - **Password:** `Admin@123`

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:8080`. You can now log in as the admin or register as a new student.
