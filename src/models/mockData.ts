import type { Student, OnboardingTask, Document, Notification, EscalationTicket, ChatMessage } from "./types";

export const currentStudent: Student = {
  id: "s001",
  name: "Arjun Sharma",
  email: "arjun.sharma@engineering.edu",
  rollNumber: "CS2024001",
  department: "Computer Science",
  year: 1,
  completionPercentage: 62,
  joinedAt: "2024-07-15",
  status: "active",
  phone: "+91 98765 43210",
};

export const onboardingTasks: OnboardingTask[] = [
  {
    id: "t1",
    title: "Complete Admission Form",
    description: "Fill out the official admission form with personal and academic details.",
    category: "Registration",
    status: "completed",
    dueDate: "2024-07-20",
    completedAt: "2024-07-18",
    priority: "high",
    isRequired: true,
  },
  {
    id: "t2",
    title: "Fee Payment",
    description: "Pay semester fees via the online portal.",
    category: "Finance",
    status: "completed",
    dueDate: "2024-07-25",
    completedAt: "2024-07-23",
    priority: "high",
    isRequired: true,
  },
  {
    id: "t3",
    title: "Document Submission",
    description: "Upload all required documents for verification.",
    category: "Documents",
    status: "in-progress",
    dueDate: "2024-08-01",
    priority: "high",
    isRequired: true,
  },
  {
    id: "t4",
    title: "Hostel Allotment",
    description: "Submit hostel preference form and await room allotment.",
    category: "Accommodation",
    status: "pending",
    dueDate: "2024-08-05",
    priority: "medium",
    isRequired: false,
  },
  {
    id: "t5",
    title: "Library Card Registration",
    description: "Register for your library card to access campus resources.",
    category: "Campus",
    status: "pending",
    dueDate: "2024-08-10",
    priority: "low",
    isRequired: false,
  },
  {
    id: "t6",
    title: "ID Card Collection",
    description: "Collect your student ID card from the admin office.",
    category: "Registration",
    status: "pending",
    dueDate: "2024-08-08",
    priority: "medium",
    isRequired: true,
  },
  {
    id: "t7",
    title: "Department Orientation",
    description: "Attend the mandatory CS department orientation session.",
    category: "Orientation",
    status: "overdue",
    dueDate: "2024-07-28",
    priority: "high",
    isRequired: true,
  },
  {
    id: "t8",
    title: "Course Registration",
    description: "Register for your first semester courses via ERP portal.",
    category: "Academic",
    status: "pending",
    dueDate: "2024-08-12",
    priority: "high",
    isRequired: true,
  },
];

export const documents: Document[] = [
  { id: "d1", name: "10th Marksheet", type: "Academic", status: "approved", uploadedAt: "2024-07-16", reviewedAt: "2024-07-17", reviewedBy: "Dr. Meera Joshi", fileSize: "1.2 MB", isRequired: true },
  { id: "d2", name: "12th Marksheet", type: "Academic", status: "approved", uploadedAt: "2024-07-16", reviewedAt: "2024-07-17", reviewedBy: "Dr. Meera Joshi", fileSize: "1.4 MB", isRequired: true },
  { id: "d3", name: "Entrance Exam Scorecard", type: "Academic", status: "approved", uploadedAt: "2024-07-17", reviewedAt: "2024-07-18", reviewedBy: "Prof. Rajan Kumar", fileSize: "800 KB", isRequired: true },
  { id: "d4", name: "Transfer Certificate", type: "Academic", status: "pending", uploadedAt: "2024-07-19", fileSize: "950 KB", isRequired: true },
  { id: "d5", name: "Aadhar Card", type: "Identity", status: "approved", uploadedAt: "2024-07-16", reviewedAt: "2024-07-17", reviewedBy: "Dr. Meera Joshi", fileSize: "600 KB", isRequired: true },
  { id: "d6", name: "Passport Photo", type: "Identity", status: "approved", uploadedAt: "2024-07-16", reviewedAt: "2024-07-17", reviewedBy: "Dr. Meera Joshi", fileSize: "200 KB", isRequired: true },
  { id: "d7", name: "Caste Certificate", type: "Other", status: "rejected", uploadedAt: "2024-07-18", reviewedAt: "2024-07-19", reviewedBy: "Dr. Meera Joshi", fileSize: "1.1 MB", rejectionReason: "Document is illegible. Please re-upload a clearer scan.", isRequired: false },
  { id: "d8", name: "Medical Certificate", type: "Medical", status: "pending", isRequired: true },
  { id: "d9", name: "Income Certificate", type: "Other", status: "pending", isRequired: false },
];

export const notifications: Notification[] = [
  { id: "n1", title: "Document Rejected", message: "Your Caste Certificate was rejected. Please re-upload a clearer scan.", type: "alert", isRead: false, createdAt: "2024-07-19T10:30:00", actionLabel: "Re-upload" },
  { id: "n2", title: "Task Overdue!", message: "Department Orientation attendance is overdue. Contact admin immediately.", type: "warning", isRead: false, createdAt: "2024-07-29T09:00:00", actionLabel: "View Task" },
  { id: "n3", title: "Document Approved", message: "Your 12th Marksheet has been successfully verified.", type: "success", isRead: false, createdAt: "2024-07-17T14:15:00" },
  { id: "n4", title: "Fee Payment Reminder", message: "Hostel fee payment deadline is in 3 days (Aug 5). Pay now to secure your room.", type: "reminder", isRead: true, createdAt: "2024-08-02T08:00:00", actionLabel: "Pay Now" },
  { id: "n5", title: "Course Registration Open", message: "Course registration for Semester 1 is now open. Register before Aug 12.", type: "info", isRead: true, createdAt: "2024-08-01T09:00:00", actionLabel: "Register" },
  { id: "n6", title: "Welcome to EduOnboard!", message: "Your onboarding journey has begun. Complete all tasks to finish onboarding.", type: "info", isRead: true, createdAt: "2024-07-15T12:00:00" },
];

export const escalationTickets: EscalationTicket[] = [
  { id: "e1", studentId: "s002", studentName: "Priya Patel", department: "Electronics", title: "Fee payment portal not working", description: "Getting error 502 on payment gateway since 2 days.", status: "in-progress", priority: "high", createdAt: "2024-08-01T11:00:00", assignedTo: "IT Support" },
  { id: "e2", studentId: "s003", studentName: "Rahul Gupta", department: "Mechanical", title: "Hostel room not allotted despite payment", description: "Paid hostel fees 5 days ago but no room assigned yet.", status: "open", priority: "high", createdAt: "2024-08-02T09:30:00" },
  { id: "e3", studentId: "s004", studentName: "Sneha Kulkarni", department: "Computer Science", title: "Transfer certificate rejected twice", description: "TC keeps getting rejected but I am uploading the correct document.", status: "resolved", priority: "medium", createdAt: "2024-07-25T14:00:00", resolvedAt: "2024-07-28T10:00:00", assignedTo: "Dr. Meera Joshi" },
  { id: "e4", studentId: "s005", studentName: "Amit Verma", department: "Civil", title: "Cannot access ERP portal", description: "Login credentials not working for ERP system.", status: "open", priority: "medium", createdAt: "2024-08-03T16:00:00" },
  { id: "e5", studentId: "s006", studentName: "Divya Nair", department: "Information Technology", title: "Library card registration error", description: "System shows duplicate entry when trying to register.", status: "closed", priority: "low", createdAt: "2024-07-20T10:00:00", resolvedAt: "2024-07-22T11:00:00" },
];

export const allStudents: Student[] = [
  { id: "s001", name: "Arjun Sharma", email: "arjun@eng.edu", rollNumber: "CS2024001", department: "Computer Science", year: 1, completionPercentage: 62, joinedAt: "2024-07-15", status: "active", phone: "+91 98765 43210" },
  { id: "s002", name: "Priya Patel", email: "priya@eng.edu", rollNumber: "EC2024002", department: "Electronics", year: 1, completionPercentage: 45, joinedAt: "2024-07-15", status: "active", phone: "+91 98765 43211" },
  { id: "s003", name: "Rahul Gupta", email: "rahul@eng.edu", rollNumber: "ME2024003", department: "Mechanical", year: 1, completionPercentage: 80, joinedAt: "2024-07-15", status: "active", phone: "+91 98765 43212" },
  { id: "s004", name: "Sneha Kulkarni", email: "sneha@eng.edu", rollNumber: "CS2024004", department: "Computer Science", year: 1, completionPercentage: 95, joinedAt: "2024-07-15", status: "active", phone: "+91 98765 43213" },
  { id: "s005", name: "Amit Verma", email: "amit@eng.edu", rollNumber: "CE2024005", department: "Civil", year: 1, completionPercentage: 30, joinedAt: "2024-07-15", status: "active", phone: "+91 98765 43214" },
  { id: "s006", name: "Divya Nair", email: "divya@eng.edu", rollNumber: "IT2024006", department: "Information Technology", year: 1, completionPercentage: 100, joinedAt: "2024-07-15", status: "active", phone: "+91 98765 43215" },
  { id: "s007", name: "Karan Singh", email: "karan@eng.edu", rollNumber: "CS2024007", department: "Computer Science", year: 1, completionPercentage: 15, joinedAt: "2024-07-16", status: "pending", phone: "+91 98765 43216" },
  { id: "s008", name: "Anita Rao", email: "anita@eng.edu", rollNumber: "EC2024008", department: "Electronics", year: 1, completionPercentage: 70, joinedAt: "2024-07-16", status: "active", phone: "+91 98765 43217" },
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: "c0",
    role: "assistant",
    content: "👋 Hello Arjun! I'm EduBot, your Smart Onboarding Assistant. I'm here to help you navigate through the onboarding process.\n\nYou can ask me about:\n• **Documents** required for submission\n• **Fee structure** and payment options\n• **Deadline reminders** and task status\n• **Hostel** and accommodation details\n• **Course registration** guidance\n\nWhat would you like to know today?",
    timestamp: new Date().toISOString(),
    confidence: 1.0,
  },
];

export const aiResponses: Record<string, { content: string; confidence: number }> = {
  fee: {
    content: "💰 **Fee Structure for B.Tech Year 1:**\n\n| Category | Amount |\n|---------|--------|\n| Tuition Fee | ₹85,000/semester |\n| Development Fee | ₹15,000/year |\n| Library Fee | ₹2,000/year |\n| Hostel (optional) | ₹45,000/year |\n\n**Payment Modes:** Online (Net Banking, UPI, Cards) via the ERP portal.\n\n⚠️ Late payment attracts a fine of ₹500/week after due date.\n\nWould you like help with the payment process?",
    confidence: 0.96,
  },
  document: {
    content: "📄 **Required Documents for Onboarding:**\n\n✅ **Academic:**\n• 10th & 12th Marksheets (originals + 2 copies)\n• Entrance Exam Scorecard\n• Transfer Certificate\n\n✅ **Identity:**\n• Aadhar Card\n• 6 Passport-size photos\n\n✅ **Medical:**\n• Medical Fitness Certificate\n\n📌 All documents must be uploaded as **clear PDF/JPG** files (max 5MB each).\n\nYour current status: 6/9 documents completed.",
    confidence: 0.98,
  },
  hostel: {
    content: "🏠 **Hostel Information:**\n\nThe hostel allotment is done based on preferences submitted in the hostel form.\n\n**Hostels Available:**\n• Bharat Bhavan (Boys) - 300 seats\n• Shakti Bhavan (Girls) - 250 seats\n\n**Fees:** ₹45,000/year (includes mess)\n\n**Deadline:** August 5, 2024\n\n⚠️ You haven't completed the Hostel Allotment task yet. Please submit your preference form soon!",
    confidence: 0.91,
  },
  deadline: {
    content: "⏰ **Your Upcoming Deadlines:**\n\n🔴 **OVERDUE:** Department Orientation (was due Jul 28)\n🟡 Aug 1 - Document Submission\n🟡 Aug 5 - Hostel Allotment Form\n🟡 Aug 8 - ID Card Collection\n🟡 Aug 10 - Library Card Registration\n🟡 Aug 12 - Course Registration\n\n💡 **Tip:** Prioritize the overdue task first. Contact Admin to resolve the orientation attendance issue.",
    confidence: 0.99,
  },
  course: {
    content: "📚 **Course Registration Guide:**\n\n1. Login to the **ERP Portal** at erp.engineering.edu\n2. Navigate to **Academic → Course Registration**\n3. Select your **mandatory core courses** for Sem 1\n4. Choose 1-2 **electives** from the available list\n5. Submit and take a **printout** for records\n\n**Core Courses (Sem 1 - CS):**\n• Mathematics I\n• Physics\n• Engineering Drawing\n• C Programming\n• Communicative English\n\n**Registration opens:** August 1 | **Deadline:** August 12",
    confidence: 0.94,
  },
  status: {
    content: "📊 **Your Onboarding Status:**\n\n**Overall Progress: 62% Complete** 🟡\n\n✅ Completed (2/8 tasks)\n🔄 In Progress (1/8 tasks)\n🔴 Overdue (1/8 tasks)\n⏳ Pending (4/8 tasks)\n\n**Next Action:** Re-upload your Caste Certificate (rejected) and submit the Medical Certificate.\n\n**Documents:** 6/9 verified ✅\n\nYou're doing well! Complete the overdue task first.",
    confidence: 0.99,
  },
};
