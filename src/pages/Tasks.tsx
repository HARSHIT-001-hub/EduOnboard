import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertTriangle, Filter, ChevronDown } from "lucide-react";
import { StatusBadge, PriorityBadge, Card, SectionHeader } from "@/components/ui/custom";
import { onboardingTasks } from "@/models/mockData";
import type { TaskStatus } from "@/models/types";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const statusFilters: { label: string; value: TaskStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "In Progress", value: "in-progress" },
  { label: "Pending", value: "pending" },
  { label: "Overdue", value: "overdue" },
];

export default function Tasks() {
  const [filter, setFilter] = useState<TaskStatus | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === "all" ? onboardingTasks : onboardingTasks.filter(t => t.status === filter);

  const counts = {
    total: onboardingTasks.length,
    completed: onboardingTasks.filter(t => t.status === "completed").length,
    overdue: onboardingTasks.filter(t => t.status === "overdue").length,
    pending: onboardingTasks.filter(t => t.status === "pending").length,
  };

  const progressPct = Math.round((counts.completed / counts.total) * 100);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6 max-w-4xl">
      {/* Header stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Tasks", value: counts.total, color: "text-primary", bg: "bg-primary/10" },
          { label: "Completed", value: counts.completed, color: "text-green-400", bg: "bg-success/10" },
          { label: "Overdue", value: counts.overdue, color: "text-red-400", bg: "bg-destructive/10" },
          { label: "Pending", value: counts.pending, color: "text-yellow-400", bg: "bg-warning/10" },
        ].map(stat => (
          <div key={stat.label} className={`glass-card rounded-xl p-4 ${stat.bg} border border-border`}>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Progress bar */}
      <motion.div variants={itemVariants}>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-bold text-foreground">Overall Progress</div>
              <div className="text-xs text-muted-foreground">{counts.completed} of {counts.total} tasks completed</div>
            </div>
            <div className="text-2xl font-bold text-gradient">{progressPct}%</div>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full progress-bar-gradient"
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>Started</span>
            <span>Target: Aug 15, 2024</span>
          </div>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        {statusFilters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              filter === f.value
                ? "bg-gradient-brand text-white shadow-glow"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Task list */}
      <motion.div variants={itemVariants} className="space-y-2.5">
        {filtered.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`glass-card rounded-xl overflow-hidden border transition-colors ${
              task.status === "overdue" ? "border-destructive/40" :
              task.status === "completed" ? "border-success/30" :
              "border-border"
            }`}
          >
            <div
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/20 transition-colors"
              onClick={() => setExpandedId(expandedId === task.id ? null : task.id)}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                task.status === "completed" ? "bg-success/20 text-green-400" :
                task.status === "overdue" ? "bg-destructive/20 text-red-400" :
                task.status === "in-progress" ? "bg-primary/20 text-primary" :
                "bg-muted text-muted-foreground"
              }`}>
                {task.status === "completed" ? <CheckCircle2 className="w-5 h-5" /> :
                 task.status === "overdue" ? <AlertTriangle className="w-5 h-5" /> :
                 <Clock className="w-5 h-5" />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">{task.title}</span>
                  {task.isRequired && <span className="text-[10px] badge-danger">Required</span>}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                  <span>{task.category}</span>
                  <span>·</span>
                  <span>Due: {task.dueDate}</span>
                  {task.completedAt && <span className="text-green-400">· Done: {task.completedAt}</span>}
                </div>
              </div>

              {/* Right badges */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedId === task.id ? "rotate-180" : ""}`} />
              </div>
            </div>

            {/* Expanded */}
            {expandedId === task.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-border px-4 pb-4 pt-3 bg-muted/10"
              >
                <p className="text-sm text-muted-foreground">{task.description}</p>
                {task.status !== "completed" && (
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-brand text-white btn-glow">
                      Mark Complete
                    </button>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted text-foreground hover:bg-accent">
                      Escalate Issue
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
