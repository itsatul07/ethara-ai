import { useEffect, useState } from "react";
import api from "../api/axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Trash2, Check, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products,setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: 1,
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [viewModal, setViewModal] = useState(false);
  const [viewOrder, setViewOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchProducts = async ()=>{
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    }catch (error){
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
    fetchProducts();
  }, []);

  const resetForm = () => {
    setFormData({ customer_id: "", product_id: "", quantity: 1 });
    setTotalPrice(0);
    setEditingId(null);
  };

  const calculateTotal = (productId, quantity) => {
    const product = products.find((p) => p.id === Number(productId));
    if (product) {
      return parseFloat(product.price || 0) * quantity;
    }
    return 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "product_id" || name === "quantity") {
        setTotalPrice(calculateTotal(updated.product_id, parseInt(updated.quantity) || 1));
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingId) {
        await api.put(`/orders/${editingId}`, formData);
      } else {
        await api.post("/orders", formData);
      }
      resetForm();
      fetchOrders();
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.detail || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await api.delete(`/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.detail || "Failed to delete order");
    }
  };

  const handleView = async (id) => {
    try {
      const res = await api.get(`/orders/${id}`);
      setViewOrder(res.data);
      setViewModal(true);
    } catch (error) {
      console.error(error);
      alert("Failed to load order details");
    }
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.name : `Customer #${customerId}`;
  };
  const getProductName = (productId) =>{
    const product = products.find((c)=> c.id === productId);
    return product ? product.name : `Product #${productId}`;
  };
  const getProductSku = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.sku : "-";
  };
  const getProductPrice = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.price : 0;
  };
  const getCustomerEmail = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.email : "-";
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-neutral-900 rounded-lg">
            <ShoppingCart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-neutral-500 text-sm">Manage your orders</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1 w-fit">
          {orders.length} Orders
        </Badge>
      </div>

      {/* Form Card */}
      <Card className="border-neutral-200 ">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Add New Order</CardTitle>
              <CardDescription className="mt-2">
                Fill in the details to create a new order
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <select
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <select
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              required
              min="1"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div className="flex flex-col sm:flex-row gap-3 sm:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <span>Total:</span>
                <span className="text-neutral-900">${totalPrice.toFixed(2)}</span>
              </div>
              <Button type="submit" disabled={isLoading} className="gap-2">
                {editingId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {editingId ? "Update Order" : "Add Order"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-neutral-200">
        <CardHeader className="pb-4">
          <CardTitle>Order List</CardTitle>
          <CardDescription>View and manage all orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="6" className="text-center py-8 text-neutral-500">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-neutral-300" />
                    <p>No orders found</p>
                    <p className="text-sm">Add your first order using the form above</p>
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{getCustomerName(order.customer_id)}</TableCell>
                    <TableCell>{getProductName(order.product_id)}</TableCell>
                    <TableCell>{order.quantity || 1}</TableCell>
                    <TableCell>${parseFloat(order.total_amount || 0).toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleView(order.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(order.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Order Modal */}
      <Dialog open={viewModal} onOpenChange={setViewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogClose onClose={() => setViewModal(false)} />
          </DialogHeader>
          {viewOrder && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral-500">Order ID</p>
                  <p className="font-medium">#{viewOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Customer</p>
                  <p className="font-medium">{getCustomerName(viewOrder.customer_id)}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Customer Email</p>
                  <p className="font-medium">{getCustomerEmail(viewOrder.customer_id)}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Product</p>
                  <p className="font-medium">{getProductName(viewOrder.product_id)}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Product SKU</p>
                  <p className="font-medium">{getProductSku(viewOrder.product_id)}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Quantity</p>
                  <p className="font-medium">{viewOrder.quantity || 1}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Unit Price</p>
                  <p className="font-medium">${parseFloat(getProductPrice(viewOrder.product_id) || 0).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Total Amount</p>
                  <p className="font-medium">${parseFloat(viewOrder.total_amount || 0).toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}