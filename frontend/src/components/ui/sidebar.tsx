import * as React from "react"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"

interface SidebarContextValue {
  state: { isOpen: boolean; isCollapsed: boolean }
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isCollapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar(): SidebarContextValue {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

function SidebarProvider({ children, defaultCollapsed = false }: { children: React.ReactNode; defaultCollapsed?: boolean }) {
  const [open, setOpen] = React.useState(true)
  const [openMobile, setOpenMobile] = React.useState(false)
  const [isCollapsed, setCollapsed] = React.useState(defaultCollapsed)

  const value: SidebarContextValue = {
    state: { isOpen: open, isCollapsed },
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isCollapsed,
    setCollapsed,
  }

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}

function Sidebar({ children, className, ...props }: { children?: React.ReactNode; className?: string }) {
  const { isCollapsed, openMobile, setOpenMobile } = useSidebar()

  return (
    <>
      {openMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpenMobile(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-0 z-50 bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          openMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:inset-auto lg:top-0 lg:bottom-0 lg:h-screen",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    </>
  )
}

function SidebarHeader({ children, className, ...props }: { children?: React.ReactNode; className?: string }) {
  const { isCollapsed, setCollapsed, setOpenMobile, openMobile } = useSidebar()

  const handleCollapseToggle = () => {
    if (openMobile) {
      setOpenMobile(false)
    } else {
      setCollapsed(!isCollapsed)
    }
  }

  return (
    <div className={cn("flex items-center justify-between h-16 px-4 border-b border-gray-200", className)} {...props}>
      <div className={cn("flex flex-col gap-1 overflow-hidden", isCollapsed && "hidden")}>
        {children}
      </div>

      <button
        onClick={handleCollapseToggle}
        className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-gray-500" />
        )}
      </button>
    </div>
  )
}

function SidebarContent({ children, className, ...props }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex-1 overflow-y-auto py-4", className)} {...props}>
      {children}
    </div>
  )
}

function SidebarFooter({ children, className, ...props }: { children?: React.ReactNode; className?: string }) {
  const { isCollapsed } = useSidebar()

  return (
    <div className={cn("py-4 px-3 border-t border-gray-200", isCollapsed && "hidden", className)} {...props}>
      {children}
    </div>
  )
}

function SidebarGroup({ children, className, ...props }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-3 py-2", className)} {...props}>
      {children}
    </div>
  )
}

function SidebarGroupLabel({ children, className, ...props }: { children?: React.ReactNode; className?: string }) {
  const { isCollapsed } = useSidebar()

  return (
    <div
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider",
        isCollapsed && "hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarGroupContent({ children, className, ...props }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {children}
    </div>
  )
}

function SidebarMenu({ children, className, ...props }: { children?: React.ReactNode; className?: string }) {
  return (
<ul className={cn("flex flex-col gap-1 list-none m-0 p-0", className)} {...props}>
      {children}
    </ul>
  )
}

function SidebarMenuItem({ children, className, ...props }: { children?: React.ReactNode; className?: string }) {
  return (
    <li className={cn("", className)} {...props}>
      {children}
    </li>
  )
}

function SidebarMenuButton({ children, className, isActive, ...props }: {
  children?: React.ReactNode
  className?: string
  isActive?: boolean
}) {
  const { isCollapsed } = useSidebar()
  const classes = cn(
    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors w-full",
    isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
    isCollapsed && "justify-center",
    className
  )

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

function SidebarInset({ children, className, ...props }: { children?: React.ReactNode; className?: string }) {
  const { isCollapsed } = useSidebar()

  return (
    <main
      className={cn(
        "flex flex-1 flex-col bg-gray-50 transition-all duration-300",
        isCollapsed ? "lg:ml-16" : "lg:ml-64",
        className
      )}
      {...props}
    >
      {children}
    </main>
  )
}

function SidebarRail({ children, className, ...props }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("hidden", className)} {...props}>
      {children}
    </div>
  )
}

function MobileSidebarToggle({ className, ...props }: { className?: string }) {
  const { setOpenMobile } = useSidebar()

  return (
    <button
      onClick={() => setOpenMobile(true)}
      className={cn("p-2 rounded-md hover:bg-gray-100 transition-colors lg:hidden", className)}
      {...props}
    >
      <Menu className="h-5 w-5 text-gray-600" />
    </button>
  )
}

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarRail,
  SidebarProvider,
  useSidebar,
  MobileSidebarToggle,
}
