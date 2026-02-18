import { motion } from "framer-motion";
import {
  Users, CheckCircle2, AlertTriangle, FileText, TrendingUp,
  ArrowUp, Clock, Target, Activity
} from "lucide-react";
import { StatCard, ProgressBar, Card, SectionHeader, StatusBadge } from "@/components/ui/custom";
import { allStudents, escalationTickets, documents } from "@/models/mockData";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export default function AdminOverview() {
  const totalStudents = allStudents.length;
  const activeStudents = allStudents.filter(s => s.status === "active").length;
  const avgCompletion = Math.round(allStudents.reduce((sum, s) => sum + s.completionPercentage, 0) / totalStudents);
  const fullComplete = allStudents.filter(s => s.completionPercentage === 100).length;
  const dropOffs = allStudents.filter(s => s.completionPercentage < 20).length;
  const openEscalations = escalationTickets.filter(e => e.status === "open" || e.status === "in-progress").length;
  const pendingDocs = documents.filter(d => d.status === "pending").length;

  const deptData = [
    { dept: "Computer Science", count: 2, avg: 78, color: "bg-primary" },
    { dept: "Electronics", count: 2, avg: 57, color: "bg-secondary" },
    { dept: "Mechanical", count: 1, avg: 80, color: "bg-success" },
    { dept: "Civil", count: 1, avg: 30, color: "bg-warning" },
    { dept: "Information Technology", count: 1, avg: 100, color: "bg-info" },
  ];

  const recentActivity = [
    { text: "Sneha Kulkarni completed onboarding", time: "2h ago", type: "success" },
    { text: "Priya Patel escalated a payment issue", time: "3h ago", type: "warning" },
    { text: "Rahul Gupta uploaded Transfer Certificate", time: "5h ago", type: "info" },
    { text: "Karan Singh has not started onboarding", time: "1d ago", type: "danger" },
    { text: "Divya Nair's documents fully verified", time: "1d ago", type: "success" },
  ];

  const activityTypeClass: Record<string, string> = {
    success: "badge-success",
    warning: "badge-warning",
    info: "badge-info",
    danger: "badge-danger",
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6 max-w-7xl">
      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={totalStudents} subtitle="Batch 2024" icon={Users} colorClass="text-primary" trend={{ value: 8, positive: true }} />
        <StatCard title="Avg. Completion" value={`${avgCompletion}%`} subtitle="Across all students" icon={Target} colorClass="text-secondary" />
        <StatCard title="Fully Onboarded" value={fullComplete} subtitle="Out of 8 students" icon={CheckCircle2} colorClass="text-green-400" trend={{ value: 12, positive: true }} />
        <StatCard title="Open Escalations" value={openEscalations} subtitle="Need attention" icon={AlertTriangle} colorClass="text-red-400" />
      </motion.div>

      {/* Secondary stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Students", value: activeStudents, icon: Activity, color: "text-primary" },
          { label: "Pending Docs", value: pendingDocs, icon: FileText, color: "text-yellow-400" },
          { label: "Drop-off Risk", value: dropOffs, icon: ArrowUp, color: "text-red-400" },
          { label: "Completion Rate", value: `${Math.round((fullComplete / totalStudents) * 100)}%`, icon: TrendingUp, color: "text-green-400" },
        ].map(s => (
          <div key={s.label} className="glass-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className={`text-xl font-bold ${s.color}`}>{s.value}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Department breakdown */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <SectionHeader title="Completion by Department" subtitle="Average onboarding progress" />
            <div className="space-y-4">
              {deptData.map(d => (
                <div key={d.dept}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{d.dept}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{d.count} students</span>
                      <span className="text-sm font-bold text-foreground">{d.avg}%</span>
                    </div>
                  </div>
                  <ProgressBar value={d.avg} />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent activity */}
        <motion.div variants={itemVariants}>
          <Card>
            <SectionHeader title="Recent Activity" />
            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-foreground leading-relaxed">{a.text}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-muted-foreground">{a.time}</span>
                      <span className={activityTypeClass[a.type]}>{a.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Student overview table */}
      <motion.div variants={itemVariants}>
        <Card>
          <SectionHeader title="Student Overview" subtitle="Quick status snapshot" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="pb-3 font-semibold">Student</th>
                  <th className="pb-3 font-semibold">Department</th>
                  <th className="pb-3 font-semibold">Progress</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {allStudents.map(s => (
                  <tr key={s.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-brand flex items-center justify-center text-white text-[10px] font-bold">
                          {s.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-xs">{s.name}</div>
                          <div className="text-[10px] text-muted-foreground">{s.rollNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-xs text-muted-foreground">{s.department}</td>
                    <td className="py-3 w-32">
                      <ProgressBar value={s.completionPercentage} />
                    </td>
                    <td className="py-3">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="py-3 text-xs font-bold text-foreground">{s.completionPercentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
