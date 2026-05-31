import { Routes, Route } from "react-router-dom"

import { SidebarProvider, MobileSidebarToggle } from "./components/sidebar"
import { AppSidebar } from "./components/sidebar"

import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Customers from "./pages/Customers"
import Orders from "./pages/Orders"

function App() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-gray-100">
        <AppSidebar />

        <main className="flex-1 p-6 lg:ml-64 transition-all duration-300">
          <div className="lg:hidden mb-4">
            <MobileSidebarToggle />
          </div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App
