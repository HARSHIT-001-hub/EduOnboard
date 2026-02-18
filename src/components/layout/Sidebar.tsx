import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, CheckSquare, FileText, Bot, Bell, User,
  ChevronLeft, ChevronRight, Shield, Users, BarChart3,
  AlertTriangle, LogOut, GraduationCap, Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const studentNavItems: NavItem[] = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "My Tasks", path: "/tasks", icon: CheckSquare },
  { label: "Documents", path: "/documents", icon: FileText },
  { label: "AI Assistant", path: "/ai-assistant", icon: Bot },
  { label: "Notifications", path: "/notifications", icon: Bell },
];

const adminNavItems: NavItem[] = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard },
  { label: "Student Tracker", path: "/admin/students", icon: Users },
  { label: "Documents", path: "/admin/documents", icon: FileText },
  { label: "Escalations", path: "/admin/escalations", icon: AlertTriangle },
  { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
];

interface SidebarProps {
  isAdmin?: boolean;
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const navItems = isAdmin ? adminNavItems : studentNavItems;

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email || "User";
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
  const subtitle = isAdmin ? "Admin" : user?.email || "";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 py-5 border-b border-sidebar-border", collapsed && "px-3 justify-center")}>
        <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0 shadow-glow">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="text-sm font-bold text-gradient whitespace-nowrap">EduOnboard</div>
              <div className="text-[10px] text-muted-foreground whitespace-nowrap">
                {isAdmin ? "Admin Portal" : "Student Portal"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-3 pt-3">
          <div className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium",
            isAdmin
              ? "bg-secondary/20 text-secondary border border-secondary/30"
              : "bg-primary/10 text-primary border border-primary/20"
          )}>
            <Shield className="w-3.5 h-3.5" />
            {isAdmin ? "Admin" : "Student"} View
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        <div className={cn("text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2", collapsed ? "hidden" : "px-2")}>
          {isAdmin ? "Admin Controls" : "Navigation"}
        </div>
        {navItems.map((item) => {
          const isActive = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
          return (
            <NavLink key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
              <motion.div
                whileHover={{ x: collapsed ? 0 : 2 }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  collapsed ? "justify-center" : "",
                  isActive
                    ? "bg-gradient-brand text-white shadow-glow"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className={cn("w-4.5 h-4.5 flex-shrink-0", isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground")} style={{ width: 18, height: 18 }} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* User + collapse */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg bg-sidebar-accent">
            <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="overflow-hidden flex-1">
              <div className="text-xs font-semibold text-foreground truncate">{displayName}</div>
              <div className="text-[10px] text-muted-foreground truncate">{subtitle}</div>
            </div>
            <LogOut
              className="w-3.5 h-3.5 text-muted-foreground ml-auto flex-shrink-0 cursor-pointer hover:text-destructive"
              onClick={signOut}
            />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors text-xs"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-card"
      >
        <Menu className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25 }}
            className="lg:hidden fixed left-0 top-0 h-full w-64 z-40 bg-gradient-sidebar border-r border-sidebar-border"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col h-screen sticky top-0 flex-shrink-0 bg-gradient-sidebar border-r border-sidebar-border overflow-hidden"
      >
        <SidebarContent />
      </motion.aside>
    </>
  );
}
