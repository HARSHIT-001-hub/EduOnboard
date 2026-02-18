import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Clock, ChevronDown } from "lucide-react";
import { StatusBadge, PriorityBadge, Card, SectionHeader } from "@/components/ui/custom";
import { escalationTickets } from "@/models/mockData";
import type { EscalationTicket } from "@/models/types";

export default function Escalations() {
  const [tickets, setTickets] = useState<EscalationTicket[]>(escalationTickets);
  const [expanded, setExpanded] = useState<string | null>(null);

  const resolve = (id: string) => setTickets(prev =>
    prev.map(t => t.id === id ? { ...t, status: "resolved" as const, resolvedAt: new Date().toISOString() } : t)
  );

  const stats = {
    open: tickets.filter(t => t.status === "open").length,
    inProgress: tickets.filter(t => t.status === "in-progress").length,
    resolved: tickets.filter(t => t.status === "resolved" || t.status === "closed").length,
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Open", value: stats.open, icon: AlertTriangle, color: "text-red-400 bg-destructive/10" },
          { label: "In Progress", value: stats.inProgress, icon: Clock, color: "text-primary bg-primary/10" },
          { label: "Resolved", value: stats.resolved, icon: CheckCircle2, color: "text-green-400 bg-success/10" },
        ].map(s => (
          <div key={s.label} className={`glass-card rounded-xl p-4 border border-border ${s.color.split(" ")[1]}`}>
            <s.icon className={`w-5 h-5 ${s.color.split(" ")[0]} mb-2`} />
            <div className={`text-2xl font-bold ${s.color.split(" ")[0]}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <Card>
        <SectionHeader title="Escalation Tickets" subtitle="Manage student-reported issues" />
        <div className="space-y-3">
          {tickets.map((ticket, i) => (
            <motion.div key={ticket.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`rounded-xl border overflow-hidden ${ticket.status === "open" ? "border-destructive/40" : ticket.status === "resolved" || ticket.status === "closed" ? "border-success/30 opacity-70" : "border-border"}`}>
              <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/20" onClick={() => setExpanded(expanded === ticket.id ? null : ticket.id)}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${ticket.status === "open" ? "bg-destructive/20 text-red-400" : ticket.status === "resolved" ? "bg-success/20 text-green-400" : "bg-primary/20 text-primary"}`}>
                  {ticket.status === "resolved" || ticket.status === "closed" ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground">{ticket.title}</div>
                  <div className="text-xs text-muted-foreground">{ticket.studentName} · {ticket.department} · {ticket.createdAt.split("T")[0]}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <PriorityBadge priority={ticket.priority} />
                  <StatusBadge status={ticket.status} />
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded === ticket.id ? "rotate-180" : ""}`} />
                </div>
              </div>
              {expanded === ticket.id && (
                <div className="border-t border-border px-4 pb-4 pt-3 bg-muted/10">
                  <p className="text-sm text-muted-foreground mb-3">{ticket.description}</p>
                  {ticket.assignedTo && <div className="text-xs text-muted-foreground mb-3">Assigned to: <span className="text-foreground font-medium">{ticket.assignedTo}</span></div>}
                  {(ticket.status === "open" || ticket.status === "in-progress") && (
                    <div className="flex gap-2">
                      <button onClick={() => resolve(ticket.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-brand text-white btn-glow">Mark Resolved</button>
                      <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted text-foreground hover:bg-accent">Assign to Team</button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
