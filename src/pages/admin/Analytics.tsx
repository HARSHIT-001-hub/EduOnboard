import { motion } from "framer-motion";
import { TrendingUp, Users, FileCheck, AlertTriangle } from "lucide-react";
import { Card, SectionHeader } from "@/components/ui/custom";
import { allStudents } from "@/models/mockData";

const deptStats = [
  { dept: "Computer Science", students: 3, completion: 78, docs: 90, escalations: 1 },
  { dept: "Electronics", students: 2, completion: 57, docs: 65, escalations: 2 },
  { dept: "Mechanical", students: 1, completion: 80, docs: 85, escalations: 0 },
  { dept: "Civil", students: 1, completion: 30, docs: 40, escalations: 1 },
  { dept: "IT", students: 1, completion: 100, docs: 100, escalations: 0 },
];

const weeklyData = [
  { week: "Week 1", completed: 12, pending: 28 },
  { week: "Week 2", completed: 24, pending: 20 },
  { week: "Week 3", completed: 35, pending: 15 },
  { week: "Week 4", completed: 42, pending: 10 },
];

export default function Analytics() {
  const avgCompletion = Math.round(allStudents.reduce((s, st) => s + st.completionPercentage, 0) / allStudents.length);
  const maxBar = Math.max(...deptStats.map(d => d.completion));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-6xl">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Avg Completion", value: `${avgCompletion}%`, icon: TrendingUp, color: "text-primary" },
          { label: "Total Students", value: allStudents.length, icon: Users, color: "text-secondary" },
          { label: "Docs Verified", value: "24/36", icon: FileCheck, color: "text-green-400" },
          { label: "Escalations", value: 5, icon: AlertTriangle, color: "text-red-400" },
        ].map(k => (
          <div key={k.label} className="glass-card rounded-xl p-4 border border-border">
            <k.icon className={`w-5 h-5 ${k.color} mb-2`} />
            <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
            <div className="text-xs text-muted-foreground">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Dept bar chart */}
        <Card>
          <SectionHeader title="Completion by Department" subtitle="Onboarding progress %" />
          <div className="space-y-4 mt-2">
            {deptStats.map(d => (
              <div key={d.dept}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-foreground font-medium">{d.dept}</span>
                  <span className="text-muted-foreground">{d.students} students · <span className="text-foreground font-bold">{d.completion}%</span></span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.completion}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    className="h-full rounded-full progress-bar-gradient"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly progress */}
        <Card>
          <SectionHeader title="Weekly Onboarding Progress" subtitle="Tasks completed over time" />
          <div className="flex items-end gap-3 h-40 mt-2">
            {weeklyData.map((w, i) => (
              <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col-reverse gap-0.5" style={{ height: 120 }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(w.completed / 52) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="w-full rounded-t-lg progress-bar-gradient"
                  />
                </div>
                <div className="text-[10px] text-muted-foreground whitespace-nowrap">{w.week}</div>
                <div className="text-xs font-bold text-foreground">{w.completed}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-full progress-bar-gradient inline-block" />Completed tasks</span>
          </div>
        </Card>
      </div>

      {/* Department comparison table */}
      <Card>
        <SectionHeader title="Department Analytics" subtitle="Full breakdown by department" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="pb-3 font-semibold">Department</th>
                <th className="pb-3 font-semibold">Students</th>
                <th className="pb-3 font-semibold">Onboarding %</th>
                <th className="pb-3 font-semibold">Doc Compliance</th>
                <th className="pb-3 font-semibold">Escalations</th>
                <th className="pb-3 font-semibold">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {deptStats.map(d => (
                <tr key={d.dept} className="hover:bg-muted/20">
                  <td className="py-3 font-medium text-foreground text-xs">{d.dept}</td>
                  <td className="py-3 text-xs text-muted-foreground">{d.students}</td>
                  <td className="py-3 text-xs font-bold text-foreground">{d.completion}%</td>
                  <td className="py-3 text-xs font-bold text-foreground">{d.docs}%</td>
                  <td className="py-3 text-xs text-muted-foreground">{d.escalations}</td>
                  <td className="py-3">
                    <span className={d.completion < 50 ? "badge-danger" : d.completion < 75 ? "badge-warning" : "badge-success"}>
                      {d.completion < 50 ? "High" : d.completion < 75 ? "Medium" : "Low"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
