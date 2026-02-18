import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle2, AlertTriangle, Info, Star, Zap, CheckCheck } from "lucide-react";
import { notifications as initialNotifications } from "@/models/mockData";
import type { Notification } from "@/models/types";

const typeConfig: Record<string, { icon: React.ElementType; className: string; bg: string }> = {
  alert: { icon: AlertTriangle, className: "text-red-400", bg: "bg-destructive/10 border-destructive/30" },
  warning: { icon: Zap, className: "text-yellow-400", bg: "bg-warning/10 border-warning/30" },
  success: { icon: CheckCircle2, className: "text-green-400", bg: "bg-success/10 border-success/30" },
  reminder: { icon: Bell, className: "text-primary", bg: "bg-primary/10 border-primary/30" },
  info: { icon: Info, className: "text-blue-400", bg: "bg-info/10 border-info/30" },
};

function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor(diff / 60000);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${mins}m ago`;
}

export default function Notifications() {
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState("all");

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, isRead: true })));
  const markRead = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));

  const filtered = filter === "all"
    ? notifs
    : filter === "unread"
    ? notifs.filter(n => !n.isRead)
    : notifs.filter(n => n.type === filter);

  const unreadCount = notifs.filter(n => !n.isRead).length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-foreground">All Notifications</div>
            <div className="text-xs text-muted-foreground">{unreadCount} unread messages</div>
          </div>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-muted hover:bg-accent transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["all", "unread", "alert", "warning", "success", "reminder", "info"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap capitalize transition-all ${
              filter === f ? "bg-gradient-brand text-white shadow-glow" : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {f} {f === "unread" && unreadCount > 0 ? `(${unreadCount})` : ""}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="space-y-2.5">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Star className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <div className="text-sm">No notifications here</div>
          </div>
        )}
        {filtered.map((notif, i) => {
          const config = typeConfig[notif.type] || typeConfig.info;
          const Icon = config.icon;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => markRead(notif.id)}
              className={`relative p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] ${config.bg} ${
                !notif.isRead ? "shadow-card" : "opacity-70"
              }`}
            >
              {!notif.isRead && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-background/50 ${config.className}`}>
                  <Icon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{notif.title}</span>
                    {!notif.isRead && <span className="badge-primary">New</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{notif.message}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] text-muted-foreground">{formatRelative(notif.createdAt)}</span>
                    {notif.actionLabel && (
                      <button className="text-[10px] font-semibold text-primary hover:underline">
                        {notif.actionLabel} →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
