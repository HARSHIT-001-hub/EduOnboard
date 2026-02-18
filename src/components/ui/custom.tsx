import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, AlertCircle, Circle } from "lucide-react";
import type { TaskStatus, DocStatus } from "@/models/types";

// Animated progress bar
export function ProgressBar({ value, className, showLabel = false }: { value: number; className?: string; showLabel?: boolean }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span className="font-semibold text-foreground">{value}%</span>
        </div>
      )}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="h-full rounded-full progress-bar-gradient"
        />
      </div>
    </div>
  );
}

// Status badge
export function StatusBadge({ status }: { status: TaskStatus | DocStatus | string }) {
  const config: Record<string, { label: string; className: string; icon: React.ElementType }> = {
    completed: { label: "Completed", className: "badge-success", icon: CheckCircle2 },
    approved: { label: "Approved", className: "badge-success", icon: CheckCircle2 },
    "in-progress": { label: "In Progress", className: "badge-info", icon: Clock },
    pending: { label: "Pending", className: "badge-warning", icon: Clock },
    reviewed: { label: "Under Review", className: "badge-primary", icon: Clock },
    overdue: { label: "Overdue", className: "badge-danger", icon: AlertCircle },
    rejected: { label: "Rejected", className: "badge-danger", icon: AlertCircle },
    open: { label: "Open", className: "badge-warning", icon: Circle },
    resolved: { label: "Resolved", className: "badge-success", icon: CheckCircle2 },
    closed: { label: "Closed", className: "badge-info", icon: CheckCircle2 },
    "in-progress-ticket": { label: "In Progress", className: "badge-primary", icon: Clock },
  };

  const c = config[status] || { label: status, className: "badge-info", icon: Circle };
  const Icon = c.icon;

  return (
    <span className={c.className}>
      <Icon className="w-3 h-3" />
      {c.label}
    </span>
  );
}

// Stat card
export function StatCard({
  title, value, subtitle, icon: Icon, trend, colorClass = "text-primary"
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: { value: number; positive: boolean };
  colorClass?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="stat-card"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2.5 rounded-xl bg-muted", colorClass)}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={cn("text-xs font-semibold px-2 py-1 rounded-full", trend.positive ? "badge-success" : "badge-danger")}>
            {trend.positive ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm font-medium text-foreground mt-0.5">{title}</div>
      {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
    </motion.div>
  );
}

// Section header
export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-base font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// Card wrapper
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("glass-card rounded-xl p-5", className)}>
      {children}
    </div>
  );
}

// Priority badge
export function PriorityBadge({ priority }: { priority: "low" | "medium" | "high" }) {
  const config = {
    high: "badge-danger",
    medium: "badge-warning",
    low: "badge-info",
  };
  return <span className={config[priority]}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>;
}
