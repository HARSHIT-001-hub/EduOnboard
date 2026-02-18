// Model Layer - Data Types & Interfaces

export type UserRole = "student" | "admin";
export type TaskStatus = "pending" | "in-progress" | "completed" | "overdue";
export type DocStatus = "pending" | "reviewed" | "approved" | "rejected";
export type TicketStatus = "open" | "in-progress" | "resolved" | "closed";
export type NotifType = "reminder" | "alert" | "info" | "success" | "warning";

export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  year: number;
  avatar?: string;
  completionPercentage: number;
  joinedAt: string;
  status: "active" | "pending" | "dropped";
  phone: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: "admin" | "super-admin";
  department: string;
}

export interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  category: string;
  status: TaskStatus;
  dueDate: string;
  completedAt?: string;
  priority: "low" | "medium" | "high";
  isRequired: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  status: DocStatus;
  uploadedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  fileSize?: string;
  rejectionReason?: string;
  isRequired: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotifType;
  isRead: boolean;
  createdAt: string;
  actionLabel?: string;
}

export interface EscalationTicket {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: "low" | "medium" | "high";
  createdAt: string;
  resolvedAt?: string;
  assignedTo?: string;
}

export interface AIQueryLog {
  id: string;
  query: string;
  response: string;
  confidence: number;
  timestamp: string;
  wasEscalated: boolean;
  role: "user" | "assistant";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  confidence?: number;
  isEscalated?: boolean;
}
