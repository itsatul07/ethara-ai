import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    total_products: 0,
    total_customers: 0,
    total_orders: 0,
    low_stock_products: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-lg shadow">
          <h2>Total Products</h2>
          <p className="text-3xl font-bold">
            {stats.total_products}
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h2>Total Customers</h2>
          <p className="text-3xl font-bold">
            {stats.total_customers}
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h2>Total Orders</h2>
          <p className="text-3xl font-bold">
            {stats.total_orders}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-xl font-semibold mb-4">
          Low Stock Products
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Stock</th>
            </tr>
          </thead>

          <tbody>
            {stats.low_stock_products?.map((product) => (
              <tr key={product.id}>
                <td className="py-2">{product.name}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;