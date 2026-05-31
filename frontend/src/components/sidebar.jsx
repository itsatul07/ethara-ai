import { NavLink } from "react-router-dom";

function Sidebar() {
  const navClass = ({ isActive }) =>
    `block p-3 rounded-lg transition ${
      isActive
        ? "bg-blue-500 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md p-5">
      <h1 className="text-2xl font-bold mb-8">
        Inventory System
      </h1>

      <nav className="space-y-2">
        <NavLink to="/" className={navClass}>
          Dashboard
        </NavLink>

        <NavLink to="/products" className={navClass}>
          Products
        </NavLink>

        <NavLink to="/customers" className={navClass}>
          Customers
        </NavLink>

        <NavLink to="/orders" className={navClass}>
          Orders
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;