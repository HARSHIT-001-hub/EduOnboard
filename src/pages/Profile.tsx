import { motion } from "framer-motion";
import { User, Mail, Phone, BookOpen, Hash, Building, Calendar, Shield, Edit3, Lock } from "lucide-react";
import { currentStudent } from "@/models/mockData";
import { ProgressBar, Card, SectionHeader } from "@/components/ui/custom";

export default function Profile() {
  const fields = [
    { label: "Full Name", value: currentStudent.name, icon: User },
    { label: "Email Address", value: currentStudent.email, icon: Mail },
    { label: "Phone Number", value: currentStudent.phone, icon: Phone },
    { label: "Roll Number", value: currentStudent.rollNumber, icon: Hash },
    { label: "Department", value: currentStudent.department, icon: Building },
    { label: "Year", value: `Year ${currentStudent.year}`, icon: BookOpen },
    { label: "Joined On", value: currentStudent.joinedAt, icon: Calendar },
    { label: "Status", value: "Active", icon: Shield },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl">
      {/* Profile header */}
      <Card>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-brand flex items-center justify-center text-white text-3xl font-bold shadow-glow">
              AS
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-success flex items-center justify-center border-2 border-background">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gradient">{currentStudent.name}</h2>
            <p className="text-muted-foreground text-sm mt-1">{currentStudent.email}</p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              <span className="badge-primary">{currentStudent.department}</span>
              <span className="badge-success">Active Student</span>
              <span className="badge-info">Year {currentStudent.year}</span>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-brand text-white btn-glow">
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">Onboarding Progress</span>
            <span className="text-sm font-bold text-gradient">{currentStudent.completionPercentage}%</span>
          </div>
          <ProgressBar value={currentStudent.completionPercentage} />
        </div>
      </Card>

      {/* Personal info */}
      <Card>
        <SectionHeader title="Personal Information" subtitle="Your account details" />
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map(({ label, value, icon: Icon }) => (
            <div key={label} className="p-3 rounded-xl bg-muted/40 border border-border">
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{label}</span>
              </div>
              <div className="text-sm font-medium text-foreground pl-5">{value}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Security */}
      <Card>
        <SectionHeader title="Security & Privacy" subtitle="Manage your account security" />
        <div className="space-y-3">
          {[
            { label: "Change Password", desc: "Last changed 30 days ago", icon: Lock },
            { label: "Two-Factor Authentication", desc: "Add an extra layer of security", icon: Shield },
            { label: "Privacy Settings", desc: "Control your data visibility", icon: User },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border hover:bg-muted/60 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
