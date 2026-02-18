import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle2, XCircle, Clock, FileText, Eye, RefreshCw, AlertCircle } from "lucide-react";
import { StatusBadge, Card, SectionHeader } from "@/components/ui/custom";
import { documents } from "@/models/mockData";
import type { Document } from "@/models/types";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const typeColors: Record<string, string> = {
  Academic: "badge-primary",
  Identity: "badge-info",
  Medical: "badge-warning",
  Other: "badge-success",
};

export default function Documents() {
  const [docs, setDocs] = useState<Document[]>(documents);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (docId: string) => {
    setUploadingId(docId);
    setTimeout(() => {
      setDocs(prev => prev.map(d =>
        d.id === docId
          ? { ...d, status: "pending" as const, uploadedAt: new Date().toISOString().split("T")[0], fileSize: "1.2 MB" }
          : d
      ));
      setUploadingId(null);
    }, 1800);
  };

  const filtered = filter === "all" ? docs : docs.filter(d => d.status === filter || d.type === filter);

  const stats = {
    approved: docs.filter(d => d.status === "approved").length,
    pending: docs.filter(d => d.status === "pending").length,
    rejected: docs.filter(d => d.status === "rejected").length,
    missing: docs.filter(d => !d.uploadedAt).length,
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6 max-w-5xl">
      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Approved", value: stats.approved, icon: CheckCircle2, className: "text-green-400 bg-success/10" },
          { label: "Under Review", value: stats.pending, icon: Clock, className: "text-primary bg-primary/10" },
          { label: "Rejected", value: stats.rejected, icon: XCircle, className: "text-red-400 bg-destructive/10" },
          { label: "Missing", value: stats.missing, icon: AlertCircle, className: "text-yellow-400 bg-warning/10" },
        ].map(s => (
          <div key={s.label} className={`glass-card rounded-xl p-4 border border-border ${s.className.split(" ")[1]}`}>
            <div className="flex items-center gap-2 mb-1">
              <s.icon className={`w-4 h-4 ${s.className.split(" ")[0]}`} />
              <span className={`text-xl font-bold ${s.className.split(" ")[0]}`}>{s.value}</span>
            </div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Filter tabs */}
      <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto pb-1">
        {["all", "approved", "pending", "rejected", "Academic", "Identity", "Medical"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all capitalize ${
              filter === f ? "bg-gradient-brand text-white shadow-glow" : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Document grid */}
      <motion.div variants={itemVariants} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className={`glass-card rounded-xl p-4 border transition-all ${
              doc.status === "rejected" ? "border-destructive/40 bg-destructive/5" :
              doc.status === "approved" ? "border-success/30" :
              !doc.uploadedAt ? "border-warning/30 bg-warning/5" :
              "border-border"
            }`}
          >
            {/* Icon + type */}
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                doc.status === "approved" ? "bg-success/20 text-green-400" :
                doc.status === "rejected" ? "bg-destructive/20 text-red-400" :
                doc.status === "pending" ? "bg-primary/20 text-primary" :
                "bg-muted text-muted-foreground"
              }`}>
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className={typeColors[doc.type] || "badge-info"}>{doc.type}</span>
                {doc.isRequired && <span className="badge-danger">Required</span>}
              </div>
            </div>

            {/* Name */}
            <div className="text-sm font-semibold text-foreground mb-1">{doc.name}</div>

            {/* Meta */}
            <div className="space-y-1 mb-3">
              {doc.uploadedAt && (
                <div className="text-xs text-muted-foreground">
                  Uploaded: {doc.uploadedAt} {doc.fileSize && `· ${doc.fileSize}`}
                </div>
              )}
              {doc.reviewedBy && (
                <div className="text-xs text-muted-foreground">
                  Reviewed by: {doc.reviewedBy}
                </div>
              )}
              {!doc.uploadedAt && (
                <div className="text-xs text-yellow-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Not uploaded yet
                </div>
              )}
            </div>

            {/* Rejection reason */}
            {doc.rejectionReason && (
              <div className="mb-3 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="text-xs font-semibold text-red-400 mb-1">Rejection Reason:</div>
                <div className="text-xs text-muted-foreground">{doc.rejectionReason}</div>
              </div>
            )}

            {/* Status + actions */}
            <div className="flex items-center justify-between">
              <StatusBadge status={doc.status} />
              <div className="flex gap-1.5">
                {doc.uploadedAt && doc.status !== "rejected" && (
                  <button className="p-1.5 rounded-lg bg-muted hover:bg-accent transition-colors" title="Preview">
                    <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                )}
                {(!doc.uploadedAt || doc.status === "rejected") && (
                  <button
                    onClick={() => handleUpload(doc.id)}
                    disabled={uploadingId === doc.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-brand text-white btn-glow disabled:opacity-60"
                  >
                    {uploadingId === doc.id ? (
                      <><RefreshCw className="w-3 h-3 animate-spin" /> Uploading...</>
                    ) : (
                      <><Upload className="w-3 h-3" /> {doc.status === "rejected" ? "Re-upload" : "Upload"}</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Upload area */}
      <motion.div variants={itemVariants}>
        <Card>
          <SectionHeader title="Upload New Document" subtitle="Drag & drop or click to upload" />
          <div
            className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <input ref={fileInputRef} type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" />
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <Upload className="w-7 h-7 text-primary" />
            </div>
            <div className="text-sm font-semibold text-foreground mb-1">Drop files here or click to browse</div>
            <div className="text-xs text-muted-foreground">Supports PDF, JPG, PNG • Max 5MB per file</div>
            <button className="mt-4 px-5 py-2 rounded-lg text-xs font-semibold bg-gradient-brand text-white btn-glow">
              Select Files
            </button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
