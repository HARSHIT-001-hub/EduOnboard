import { Sidebar } from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { notifications } from "@/models/mockData";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  isAdmin: boolean;
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Student Dashboard", subtitle: "Welcome back! Here's your onboarding overview." },
  "/tasks": { title: "My Tasks", subtitle: "Track and manage your onboarding checklist." },
  "/documents": { title: "Document Manager", subtitle: "Upload and track your required documents." },
  "/ai-assistant": { title: "AI Assistant", subtitle: "Get instant answers from EduBot." },
  "/notifications": { title: "Notifications", subtitle: "Stay updated with alerts and reminders." },
  "/profile": { title: "My Profile", subtitle: "Manage your personal information." },
  "/admin": { title: "Admin Overview", subtitle: "Monitor student onboarding progress." },
  "/admin/students": { title: "Student Tracker", subtitle: "View and manage student onboarding status." },
  "/admin/documents": { title: "Document Verification", subtitle: "Review and approve student documents." },
  "/admin/escalations": { title: "Escalations", subtitle: "Manage and resolve student issues." },
  "/admin/analytics": { title: "Analytics", subtitle: "Insights and reports on onboarding progress." },
};

export function Layout({ isAdmin }: LayoutProps) {
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] || { title: "EduOnboard", subtitle: "" };
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const { user, profile } = useAuth();

  const displayName = profile?.full_name || user?.user_metadata?.full_name || "User";
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar isAdmin={isAdmin} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/40 backdrop-blur-sm flex-shrink-0 lg:pl-6 pl-16">
          <div>
            <h1 className="text-lg font-bold text-foreground">{pageInfo.title}</h1>
            <p className="text-xs text-muted-foreground">{pageInfo.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-muted rounded-lg border border-border text-sm text-muted-foreground">
              <Search className="w-3.5 h-3.5" />
              <span className="text-xs">Search...</span>
              <kbd className="text-[10px] bg-background px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
            </div>

            <ThemeToggle />

            <div className="relative">
              <button className="p-2 rounded-lg bg-muted border border-border hover:bg-accent transition-colors relative">
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-primary-foreground text-xs font-bold shadow-glow">
              {initials}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
