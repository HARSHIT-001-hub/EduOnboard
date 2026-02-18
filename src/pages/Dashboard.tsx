import { motion } from "framer-motion";
import {
  CheckCircle2, Clock, AlertTriangle, FileText, Bot,
  TrendingUp, Calendar, ChevronRight, Zap, Target
} from "lucide-react";
import { ProgressBar, StatusBadge, StatCard, Card, SectionHeader } from "@/components/ui/custom";
import { currentStudent, onboardingTasks, documents, notifications } from "@/models/mockData";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Dashboard() {
  const { user, profile } = useAuth();
  const displayName = profile?.full_name || user?.user_metadata?.full_name || "Student";
  const firstName = displayName.split(" ")[0];
  const userEmail = user?.email || "";
  const department = profile?.department || "Not assigned";
  const rollNumber = profile?.roll_number || "Pending";

  const completedTasks = onboardingTasks.filter(t => t.status === "completed").length;
  const overdueTasks = onboardingTasks.filter(t => t.status === "overdue").length;
  const pendingDocs = documents.filter(d => d.status === "pending").length;
  const rejectedDocs = documents.filter(d => d.status === "rejected").length;
  const unreadNotifs = notifications.filter(n => !n.isRead).length;

  const nextTask = onboardingTasks.find(t => t.status !== "completed");
  const recentTasks = onboardingTasks.slice(0, 5);

  const timelineSteps = [
    { label: "Application Submitted", date: "Jul 15", done: true },
    { label: "Admission Confirmed", date: "Jul 16", done: true },
    { label: "Documents Submitted", date: "Aug 1", done: false, current: true },
    { label: "ID Card Issued", date: "Aug 8", done: false },
    { label: "Onboarding Complete", date: "Aug 15", done: false },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6 max-w-7xl">
      {/* Hero welcome banner */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl p-6 border border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge-primary">🎓 Year 1 Batch 2024</span>
              <span className="badge-success">Active</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Welcome back, <span className="text-gradient">{firstName}! 👋</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {department} • Roll: {rollNumber} • {userEmail}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">{currentStudent.completionPercentage}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
            <div className="w-20 h-20 relative">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                <motion.circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="url(#grad)" strokeWidth="3"
                  strokeDasharray={`${currentStudent.completionPercentage} 100`}
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray: `${currentStudent.completionPercentage} 100` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
                    <stop offset="100%" stopColor="hsl(262, 83%, 58%)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="relative mt-4">
          <ProgressBar value={currentStudent.completionPercentage} />
        </div>
      </motion.div>

      {/* Alert banners */}
      {overdueTasks > 0 && (
        <motion.div variants={itemVariants} className="flex items-center gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/10">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-semibold text-destructive">Action Required:</span>
            <span className="text-sm text-muted-foreground ml-2">
              You have {overdueTasks} overdue task(s). Please address them immediately.
            </span>
          </div>
          <Link to="/tasks" className="text-xs badge-danger hover:opacity-80">View Tasks →</Link>
        </motion.div>
      )}

      {rejectedDocs > 0 && (
        <motion.div variants={itemVariants} className="flex items-center gap-3 p-4 rounded-xl border border-warning/30 bg-warning/10">
          <FileText className="w-5 h-5 text-warning flex-shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-semibold" style={{ color: "hsl(38 92% 65%)" }}>Document Alert:</span>
            <span className="text-sm text-muted-foreground ml-2">
              {rejectedDocs} document(s) rejected. Re-upload required.
            </span>
          </div>
          <Link to="/documents" className="text-xs badge-warning hover:opacity-80">Fix Now →</Link>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Tasks Done"
          value={`${completedTasks}/${onboardingTasks.length}`}
          subtitle="Onboarding tasks"
          icon={CheckCircle2}
          colorClass="text-primary"
          trend={{ value: 25, positive: true }}
        />
        <StatCard
          title="Documents"
          value={`${documents.filter(d => d.status === "approved").length}/${documents.length}`}
          subtitle="Verified docs"
          icon={FileText}
          colorClass="text-secondary"
        />
        <StatCard
          title="Overdue"
          value={overdueTasks}
          subtitle="Needs attention"
          icon={AlertTriangle}
          colorClass="text-destructive"
        />
        <StatCard
          title="Notifications"
          value={unreadNotifs}
          subtitle="Unread alerts"
          icon={Zap}
          colorClass="text-warning"
        />
      </motion.div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tasks overview */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <SectionHeader
              title="Onboarding Tasks"
              subtitle="Your checklist progress"
              action={
                <Link to="/tasks" className="text-xs text-primary hover:underline flex items-center gap-1">
                  View all <ChevronRight className="w-3 h-3" />
                </Link>
              }
            />
            <div className="space-y-2.5">
              {recentTasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    task.status === "completed" ? "bg-success/20 text-green-400" :
                    task.status === "overdue" ? "bg-destructive/20 text-red-400" :
                    task.status === "in-progress" ? "bg-primary/20 text-primary" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {task.status === "completed" ? <CheckCircle2 className="w-4 h-4" /> :
                     task.status === "overdue" ? <AlertTriangle className="w-4 h-4" /> :
                     task.status === "in-progress" ? <Clock className="w-4 h-4" /> :
                     <Clock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{task.title}</div>
                    <div className="text-xs text-muted-foreground">{task.category} · Due {task.dueDate}</div>
                  </div>
                  <StatusBadge status={task.status} />
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Next deadline */}
          {nextTask && (
            <motion.div variants={itemVariants}>
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">Next Priority</span>
                </div>
                <div className="p-3 rounded-lg bg-gradient-hero border border-primary/20">
                  <div className="text-sm font-bold text-foreground">{nextTask.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{nextTask.description}</div>
                  <div className="flex items-center gap-2 mt-3">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Due: {nextTask.dueDate}</span>
                    <StatusBadge status={nextTask.status} />
                  </div>
                </div>
                <Link to="/tasks">
                  <button className="w-full mt-3 py-2 rounded-lg text-xs font-semibold bg-gradient-brand text-white btn-glow">
                    Take Action →
                  </button>
                </Link>
              </Card>
            </motion.div>
          )}

          {/* Quick actions */}
          <motion.div variants={itemVariants}>
            <Card>
              <SectionHeader title="Quick Actions" />
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Ask AI", icon: Bot, to: "/ai-assistant", color: "from-primary/20 to-primary/5" },
                  { label: "Upload Doc", icon: FileText, to: "/documents", color: "from-secondary/20 to-secondary/5" },
                  { label: "My Tasks", icon: CheckCircle2, to: "/tasks", color: "from-success/20 to-success/5" },
                  { label: "Alerts", icon: Zap, to: "/notifications", color: "from-warning/20 to-warning/5" },
                ].map(({ label, icon: Icon, to, color }) => (
                  <Link key={to} to={to}>
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${color} border border-border hover:scale-[1.02] transition-transform cursor-pointer text-center`}>
                      <Icon className="w-5 h-5 mx-auto mb-1.5 text-foreground" />
                      <div className="text-xs font-medium text-foreground">{label}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Timeline */}
      <motion.div variants={itemVariants}>
        <Card>
          <SectionHeader title="Onboarding Timeline" subtitle="Your journey milestones" />
          <div className="flex items-start gap-0 overflow-x-auto pb-2">
            {timelineSteps.map((step, i) => (
              <div key={i} className="flex flex-col items-center min-w-[120px]">
                <div className="flex items-center w-full">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 transition-all ${
                    step.done
                      ? "bg-success/20 border-green-500 text-green-400"
                      : step.current
                      ? "bg-gradient-brand border-primary text-white shadow-glow animate-pulse"
                      : "bg-muted border-border text-muted-foreground"
                  }`}>
                    {step.done ? <CheckCircle2 className="w-4 h-4" /> :
                     step.current ? <TrendingUp className="w-4 h-4" /> :
                     <div className="w-2 h-2 rounded-full bg-muted-foreground" />}
                  </div>
                  {i < timelineSteps.length - 1 && (
                    <div className={`h-0.5 flex-1 ${step.done ? "bg-green-500/50" : "bg-border"}`} />
                  )}
                </div>
                <div className="text-center mt-2 px-1">
                  <div className={`text-xs font-medium ${step.current ? "text-primary" : step.done ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </div>
                  <div className="text-[10px] text-muted-foreground">{step.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
