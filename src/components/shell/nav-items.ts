import {
  LayoutDashboard,
  Swords,
  Radar,
  Workflow,
  Bell,
  BarChart3,
  CreditCard,
  Settings,
} from "lucide-react";
import { alerts } from "@/lib/mock-data";

export const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaigns", icon: Swords },
  { href: "/competitors", label: "Competitors", icon: Radar },
  { href: "/workflows", label: "Workflows", icon: Workflow },
  { href: "/alerts", label: "Alerts", icon: Bell, badge: alerts.filter((a) => !a.read).length },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
];
