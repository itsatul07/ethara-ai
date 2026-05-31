import { NavLink } from "react-router-dom"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
  useSidebar,
  MobileSidebarToggle,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
} from "lucide-react"

const menuItems = [
  { title: "Dashboard", to: "/", icon: LayoutDashboard },
  { title: "Products", to: "/products", icon: Package },
  { title: "Customers", to: "/customers", icon: Users },
  { title: "Orders", to: "/orders", icon: ShoppingCart },
]

function AppSidebar() {
  const { isCollapsed } = useSidebar()

  return (
   <Sidebar>
      <SidebarHeader>
        <h1 className={isCollapsed ? "text-xl font-bold text-gray-900 text-center" : "text-xl font-bold text-gray-900"}>
          {isCollapsed ? "IS" : "Inventory System"}
        </h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className={isCollapsed ? "hidden" : ""}>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <p className={`text-xs text-gray-500 ${isCollapsed ? "hidden" : ""}`}>v1.0.0</p>
      </SidebarFooter>
    </Sidebar>
  )
}

export { AppSidebar, MobileSidebarToggle, SidebarProvider }
