import { Routes, Route } from "react-router-dom"
import { useState, useCallback } from "react"
import { SidebarProvider, MobileSidebarToggle } from "./components/sidebar"
import { AppSidebar } from "./components/sidebar"
import { Toast } from "./components/ui/toast"

import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Customers from "./pages/Customers"
import Orders from "./pages/Orders"

function App() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
 }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

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
            <Route path="/products" element={<Products showToast={showToast} />} />
            <Route path="/customers" element={<Customers showToast={showToast} />} />
            <Route path="/orders" element={<Orders showToast={showToast} />} />
          </Routes>
        </main>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </SidebarProvider>
  )
}

export default App