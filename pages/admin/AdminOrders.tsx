import React, { useState, useEffect } from 'react';
import { supabase } from '@/src/integrations/supabase/client';

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  user_id: string | null;
  total: number;
  status: string;
  shipping_address: string | null;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  customer_city: string | null;
  created_at: string;
  order_items: OrderItem[];
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const statusOptions = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_name,
          quantity,
          price
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();

    // Real-time subscription for orders
    const ordersChannel = supabase
      .channel('admin-orders-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ordersChannel);
    };
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(true);
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    } else {
      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
      }
    }
    setUpdatingStatus(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'delivered') return 'bg-green-100 text-green-800';
    if (statusLower === 'pending') return 'bg-yellow-100 text-yellow-800';
    if (statusLower === 'confirmed') return 'bg-blue-100 text-blue-800';
    if (statusLower === 'processing') return 'bg-purple-100 text-purple-800';
    if (statusLower === 'shipped') return 'bg-indigo-100 text-indigo-800';
    if (statusLower === 'cancelled') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Management</h2>
          <p className="text-sm text-gray-500">View and manage customer orders</p>
        </div>
        <div className="text-sm text-gray-500">
          {orders.length} total orders
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
          <span className="material-icons text-6xl text-gray-300 mb-4">receipt_long</span>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders yet</h3>
          <p className="text-gray-500">Orders will appear here when customers place them.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.customer_name || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500">{order.customer_email || 'No email'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer_phone || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer_city || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.order_items?.length || 0} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                      Rs. {Number(order.total).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        disabled={updatingStatus}
                        className={`text-xs font-medium rounded-full px-3 py-1 border-0 cursor-pointer ${getStatusColor(order.status)}`}
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => openOrderDetails(order)}
                        className="text-primary hover:text-primary/80 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity z-0" 
              style={{ backgroundColor: 'rgba(107, 114, 128, 0.75)' }}
              aria-hidden="true" 
              onClick={() => setIsModalOpen(false)}
            ></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div 
              className="relative z-10 inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full"
              style={{ backgroundColor: '#ffffff' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 pt-5 pb-4" style={{ backgroundColor: '#ffffff' }}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: '#111827' }}>
                      Order #{selectedOrder.id.slice(0, 8)}
                    </h3>
                    <p className="text-sm text-gray-500">{formatDate(selectedOrder.created_at)}</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>

                {/* Customer Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Customer Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <p className="font-medium text-gray-900">{selectedOrder.customer_name || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <p className="font-medium text-gray-900">{selectedOrder.customer_email || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <p className="font-medium text-gray-900">{selectedOrder.customer_phone || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">City:</span>
                      <p className="font-medium text-gray-900">{selectedOrder.customer_city || 'N/A'}</p>
                    </div>
                    {selectedOrder.shipping_address && (
                      <div className="col-span-2">
                        <span className="text-gray-500">Shipping Address:</span>
                        <p className="font-medium text-gray-900">{selectedOrder.shipping_address}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Order Items</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Product</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">Qty</th>
                          <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Price</th>
                          <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedOrder.order_items?.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.product_name}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 text-center">{item.quantity}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 text-right">Rs. {Number(item.price).toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                              Rs. {(Number(item.price) * item.quantity).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Order Total */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-700">Order Total</span>
                    <span className="text-2xl font-bold text-primary">Rs. {Number(selectedOrder.total).toLocaleString()}</span>
                  </div>
                </div>

                {/* Update Status */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                    disabled={updatingStatus}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-primary focus:border-primary"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;