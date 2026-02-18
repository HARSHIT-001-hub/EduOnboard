import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown, Eye, Mail } from "lucide-react";
import { ProgressBar, StatusBadge, Card } from "@/components/ui/custom";
import { allStudents } from "@/models/mockData";

const departments = ["All", "Computer Science", "Electronics", "Mechanical", "Civil", "Information Technology"];

export default function StudentTracker() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = allStudents.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNumber.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "All" || s.department === dept;
    return matchSearch && matchDept;
  });

  const selected = allStudents.find(s => s.id === selectedId);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-6xl">
      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5 border border-border">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or roll number..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            />
          </div>
          <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5 border border-border">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={dept}
              onChange={e => setDept(e.target.value)}
              className="bg-transparent text-sm text-foreground outline-none cursor-pointer"
            >
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Student list */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelectedId(s.id === selectedId ? null : s.id)}
              className={`glass-card rounded-xl p-4 border cursor-pointer transition-all hover:border-primary/40 ${
                selectedId === s.id ? "border-primary/60 bg-primary/5" : "border-border"
              } ${s.completionPercentage < 20 ? "border-destructive/30" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {s.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-foreground">{s.name}</span>
                    {s.completionPercentage < 20 && <span className="badge-danger">At Risk</span>}
                    {s.completionPercentage === 100 && <span className="badge-success">Complete</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">{s.rollNumber} · {s.department}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-foreground">{s.completionPercentage}%</div>
                  <StatusBadge status={s.status} />
                </div>
              </div>
              <div className="mt-3">
                <ProgressBar value={s.completionPercentage} />
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">No students found.</div>
          )}
        </div>

        {/* Detail panel */}
        <div>
          {selected ? (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center text-white text-xl font-bold mx-auto mb-3 shadow-glow">
                    {selected.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="font-bold text-foreground">{selected.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{selected.rollNumber}</div>
                  <div className="flex justify-center gap-2 mt-2">
                    <StatusBadge status={selected.status} />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {[
                    { label: "Department", value: selected.department },
                    { label: "Year", value: `Year ${selected.year}` },
                    { label: "Email", value: selected.email },
                    { label: "Phone", value: selected.phone },
                    { label: "Joined", value: selected.joinedAt },
                  ].map(f => (
                    <div key={f.label} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{f.label}</span>
                      <span className="text-foreground font-medium">{f.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-bold text-gradient">{selected.completionPercentage}%</span>
                  </div>
                  <ProgressBar value={selected.completionPercentage} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-gradient-brand text-white btn-glow">
                    <Eye className="w-3.5 h-3.5" /> View Details
                  </button>
                  <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-muted text-foreground hover:bg-accent">
                    <Mail className="w-3.5 h-3.5" /> Send Reminder
                  </button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <Card className="text-center py-10">
              <Eye className="w-8 h-8 mx-auto mb-2 text-muted-foreground opacity-40" />
              <div className="text-sm text-muted-foreground">Select a student to view details</div>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}
