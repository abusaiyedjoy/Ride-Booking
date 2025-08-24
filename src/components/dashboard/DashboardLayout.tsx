// components/dashboard/DashboardLayout.tsx
import { Outlet } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { LayoutDashboard, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({ role }: { role: "rider" | "driver" | "admin" }) {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar className="w-64 border-r">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-lg font-bold capitalize">
              {role} Dashboard
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href={`/${role}/dashboard`}>
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href={`/${role}/profile`}>
                      <User className="w-4 h-4" />
                      Profile
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
