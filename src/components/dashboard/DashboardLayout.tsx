import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import {useNavigate} from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  User,
  LogOut,
  Menu,
  MapPin,
  History,
  Car,
  DollarSign,
  Settings,
  Users,
  BarChart3,
  Bell,
  CreditCard,
  Star,
  Route,
  UserCheck,
  Activity,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Outlet } from "react-router";
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '@/redux/features/auth/auth.api';
import { authApi } from './../../redux/features/auth/auth.api';
import { toast } from 'sonner';
import  Logo  from '@/assets/icons/Logo';

export default function DashboardLayout({
  role,
}: {
  role: "RIDER" | "DRIVER" | "SUPER-ADMIN";
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout(undefined).unwrap();
    dispatch(authApi.util.resetApiState());
    toast.error("Logout successfully")
    navigate('/')
  };

  // Role-based menu items
  const getMenuItems = () => {
    switch (role) {
      case "RIDER":
        return [
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            href: "/rider/dashboard",
            description: "Overview",
          },
          {
            title: "Book Ride",
            icon: MapPin,
            href: "/rider/book-ride",
            description: "Request new ride",
          },
          {
            title: "Active Rides",
            icon: Route,
            href: "/rider/active-rides",
            description: "Current trips",
          },
          {
            title: "Ride History",
            icon: History,
            href: "/rider/history",
            description: "Past rides",
          },
          {
            title: "Payments",
            icon: CreditCard,
            href: "/rider/payments",
            description: "Payment methods",
          },
          {
            title: "Profile",
            icon: User,
            href: "/rider/profile",
            description: "Account settings",
          },
        ];

      case "DRIVER":
        return [
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            href: "/driver/dashboard",
            description: "Overview",
          },
          {
            title: "Ride Requests",
            icon: Bell,
            href: "/driver/requests",
            description: "Incoming requests",
          },
          {
            title: "Active Rides",
            icon: Route,
            href: "/driver/active-rides",
            description: "Current trips",
          },
          {
            title: "Ride History",
            icon: History,
            href: "/driver/history",
            description: "Completed rides",
          },
          {
            title: "Earnings",
            icon: DollarSign,
            href: "/driver/earnings",
            description: "Income tracking",
          },
          {
            title: "Vehicle",
            icon: Car,
            href: "/driver/vehicle",
            description: "Vehicle management",
          },
          {
            title: "Profile",
            icon: User,
            href: "/driver/profile",
            description: "Account settings",
          },
        ];

      case "SUPER-ADMIN":
        return [
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            href: "/super-admin/dashboard",
            description: "System overview",
          },
          {
            title: "User Management",
            icon: Users,
            href: "/super-admin/users",
            description: "Manage riders",
          },
          {
            title: "Driver Management",
            icon: UserCheck,
            href: "/super-admin/drivers",
            description: "Approve drivers",
          },
          {
            title: "Ride Oversight",
            icon: Route,
            href: "/super-admin/rides",
            description: "All ride records",
          },
          {
            title: "Analytics",
            icon: BarChart3,
            href: "/super-admin/analytics",
            description: "Reports & insights",
          },
          {
            title: "System Settings",
            icon: Settings,
            href: "/super-admin/settings",
            description: "Configuration",
          },
          {
            title: "Profile",
            icon: User,
            href: "/super-admin/profile",
            description: "Admin settings",
          },
        ];

      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  // Role-based theme colors using CSS variables
  const getRoleHeaderClasses = () => {
    switch (role) {
      case "RIDER":
        return "bg-sidebar-primary";
      case "DRIVER":
        return "bg-sidebar-primary";
      case "SUPER-ADMIN":
        return "bg-sidebar-primary";
      default:
        return "bg-chart-4";
    }
  };

  const getRoleBadgeClasses = () => {
    switch (role) {
      case "RIDER":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200";
      case "DRIVER":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200";
      case "SUPER-ADMIN":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Mobile overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Sidebar
          className={`w-64 border-sidebar-border bg-sidebar h-full transition-transform duration-300 ease-in-out z-50
    ${
      isOpen ? "fixed left-0 top-0" : "fixed -left-64 top-0"
    } md:relative md:left-0 md:translate-x-0`}
        >
          <SidebarContent>
            {/* Header */}
            <div className={`p-4 ${getRoleHeaderClasses()} text-white`}>
              <div className="flex flex-col items-start">
                <Link to="/">
                <Logo/>
                </Link>
                <div>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-white bg-opacity-20 text-white border-white border-opacity-30"
                  >
                    {role.replace("-", " ")}
                  </Badge>
                </div>
              </div>
            </div>

            <SidebarGroup className="px-2 py-4">
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {menuItems.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors group"
                        >
                          <item.icon className="w-5 h-5 text-sidebar-foreground/70 group-hover:text-sidebar-foreground" />
                          <div className="flex-1">
                            <div className="font-medium text-sidebar-foreground">
                              {item.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.description}
                            </div>
                          </div>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Quick Stats (Role-specific) */}
            {role === "DRIVER" && (
              <SidebarGroup className="px-2 py-4 border-t border-sidebar-border">
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-2">
                  Quick Stats
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm text-sidebar-foreground">
                          Status
                        </span>
                      </div>
                      <Badge
                        variant="default"
                        className="bg-green-600 dark:bg-green-700 text-white"
                      >
                        Online
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                        <span className="text-sm text-sidebar-foreground">
                          Rating
                        </span>
                      </div>
                      <span className="text-sm font-medium text-sidebar-foreground">
                        4.9
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm text-sidebar-foreground">
                          Today
                        </span>
                      </div>
                      <span className="text-sm font-medium text-sidebar-foreground">
                        $127
                      </span>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {role === "RIDER" && (
              <SidebarGroup className="px-2 py-4 border-t border-sidebar-border">
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-2">
                  Quick Info
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                        <span className="text-sm text-sidebar-foreground">
                          Rating
                        </span>
                      </div>
                      <span className="text-sm font-medium text-sidebar-foreground">
                        4.8
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Route className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm text-sidebar-foreground">
                          Total Rides
                        </span>
                      </div>
                      <span className="text-sm font-medium text-sidebar-foreground">
                        156
                      </span>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {role === "SUPER-ADMIN" && (
              <SidebarGroup className="px-2 py-4 border-t border-sidebar-border">
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-2">
                  System Status
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm text-sidebar-foreground">
                          System
                        </span>
                      </div>
                      <Badge
                        variant="default"
                        className="bg-green-600 dark:bg-green-700 text-white"
                      >
                        Online
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm text-sidebar-foreground">
                          Active Users
                        </span>
                      </div>
                      <span className="text-sm font-medium text-sidebar-foreground">
                        1,247
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm text-sidebar-foreground">
                          Online Drivers
                        </span>
                      </div>
                      <span className="text-sm font-medium text-sidebar-foreground">
                        89
                      </span>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {/* Logout Section */}
            <div className="mt-auto p-2 border-t border-sidebar-border">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    variant="button"
                    onClick={handleLogout}
                    className="w-full justify-start cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar for mobile */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold capitalize text-foreground">
                {role.replace("-", " ").toLowerCase()} Dashboard
              </h1>
              <Badge
                variant="secondary"
                className={`text-xs ${getRoleBadgeClasses()}`}
              >
                {role.replace("-", " ")}
              </Badge>
            </div>
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="z-50 relative"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>

          {/* Page Content */}
          <div className="flex-1 p-6 overflow-y-auto bg-background">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
