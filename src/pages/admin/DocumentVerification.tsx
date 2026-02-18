import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, XCircle, Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import { StatusBadge, Card, SectionHeader } from "@/components/ui/custom";
import { documents } from "@/models/mockData";

export default function DocumentVerification() {
  const [docs, setDocs] = useState(documents.filter(d => d.uploadedAt));
  const [selected, setSelected] = useState<string | null>(null);

  const approve = (id: string) => setDocs(prev => prev.map(d => d.id === id ? { ...d, status: "approved" as const } : d));
  const reject = (id: string) => setDocs(prev => prev.map(d => d.id === id ? { ...d, status: "rejected" as const, rejectionReason: "Document quality insufficient. Please re-upload." } : d));

  const stats = {
    approved: docs.filter(d => d.status === "approved").length,
    pending: docs.filter(d => d.status === "pending").length,
    rejected: docs.filter(d => d.status === "rejected").length,
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-5xl">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Approved", value: stats.approved, icon: CheckCircle2, color: "text-green-400 bg-success/10" },
          { label: "Pending Review", value: stats.pending, icon: Clock, color: "text-primary bg-primary/10" },
          { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-red-400 bg-destructive/10" },
        ].map(s => (
          <div key={s.label} className={`glass-card rounded-xl p-4 border border-border ${s.color.split(" ")[1]}`}>
            <s.icon className={`w-5 h-5 ${s.color.split(" ")[0]} mb-2`} />
            <div className={`text-2xl font-bold ${s.color.split(" ")[0]}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <Card>
        <SectionHeader title="Document Queue" subtitle="Review and verify student documents" />
        <div className="space-y-2.5">
          {docs.map((doc, i) => (
            <motion.div key={doc.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${selected === doc.id ? "border-primary/50 bg-primary/5" : "border-border bg-muted/20"}`}>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground">{doc.name}</div>
                <div className="text-xs text-muted-foreground">{doc.type} · Uploaded {doc.uploadedAt} {doc.fileSize && `· ${doc.fileSize}`}</div>
                {doc.rejectionReason && <div className="text-xs text-red-400 mt-1">{doc.rejectionReason}</div>}
              </div>
              <StatusBadge status={doc.status} />
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => setSelected(selected === doc.id ? null : doc.id)} className="p-2 rounded-lg bg-muted hover:bg-accent"><Eye className="w-3.5 h-3.5 text-muted-foreground" /></button>
                {doc.status === "pending" && (
                  <>
                    <button onClick={() => approve(doc.id)} className="p-2 rounded-lg bg-success/20 hover:bg-success/30 text-green-400"><ThumbsUp className="w-3.5 h-3.5" /></button>
                    <button onClick={() => reject(doc.id)} className="p-2 rounded-lg bg-destructive/20 hover:bg-destructive/30 text-red-400"><ThumbsDown className="w-3.5 h-3.5" /></button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
