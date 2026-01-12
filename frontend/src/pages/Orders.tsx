import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ClipboardList, Filter, Plus, LogIn, ArrowUpDown, Calendar, DollarSign } from 'lucide-react';
import { commandApi, productApi, CommandResponse, CommandStatus, CommandItemRequest } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { OrderCard } from '@/components/orders/OrderCard';
import { DeleteOrderDialog } from '@/components/orders/DeleteOrderDialog';
import { EditOrderDialog } from '@/components/orders/EditOrderDialog';
import { Button } from '@/components/ui/button';
import { PageLoader } from '@/components/ui/loading-spinner';
import { ErrorDisplay } from '@/components/ui/error-display';
import { EmptyState } from '@/components/ui/empty-state';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const statusOptions: (CommandStatus | 'ALL')[] = [
  'ALL',
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
];

const sortOptions = [
  { value: 'newest', label: 'Newest First', icon: Calendar },
  { value: 'oldest', label: 'Oldest First', icon: Calendar },
  { value: 'price-high', label: 'Price: High to Low', icon: DollarSign },
  { value: 'price-low', label: 'Price: Low to High', icon: DollarSign },
];

export default function Orders() {
  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading: authLoading, isAdmin, login } = useAuth();
  const [statusFilter, setStatusFilter] = useState<CommandStatus | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [deleteOrder, setDeleteOrder] = useState<CommandResponse | null>(null);
  const [editOrder, setEditOrder] = useState<CommandResponse | null>(null);

  const { data: orders, isLoading: ordersLoading, error: ordersError, refetch: refetchOrders } = useQuery({
    queryKey: ['orders', statusFilter],
    queryFn: () => commandApi.getAll(statusFilter === 'ALL' ? undefined : statusFilter),
    enabled: isAuthenticated,
  });

  const { data: products, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: productApi.getAll,
    enabled: isAuthenticated,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: CommandStatus }) =>
      commandApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update status');
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ id, items }: { id: number; items: CommandItemRequest[] }) =>
      commandApi.update(id, { items }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order updated successfully');
      setEditOrder(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update order');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: commandApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order deleted successfully');
      setDeleteOrder(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete order');
    },
  });

  const cancelMutation = useMutation({
    mutationFn: commandApi.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order cancelled successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to cancel order');
    },
  });

  const handleStatusChange = (orderId: number, status: CommandStatus) => {
    updateStatusMutation.mutate({ id: orderId, status });
  };

  const handleDelete = async () => {
    if (deleteOrder) {
      await deleteMutation.mutateAsync(deleteOrder.commandId);
    }
  };

  const handleCancel = (order: CommandResponse) => {
    cancelMutation.mutate(order.commandId);
  };

  const handleUpdateOrder = async (items: CommandItemRequest[]) => {
    if (editOrder) {
      await updateOrderMutation.mutateAsync({ id: editOrder.commandId, items });
    }
  };

  // Show loading while checking auth
  if (authLoading) return <PageLoader />;

  // Require authentication for orders page
  if (!isAuthenticated) {
    return (
      <EmptyState
        icon={LogIn}
        title="Login Required"
        description="Please login to view and manage orders"
        action={
          <Button onClick={login} className="gap-2">
            <LogIn className="h-4 w-4" />
            Login
          </Button>
        }
      />
    );
  }

  const isLoading = ordersLoading || productsLoading;
  const error = ordersError || productsError;

  const sortedOrders = useMemo(() => {
    if (!orders) return [];
    const sorted = [...orders];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
      case 'price-high':
        return sorted.sort((a, b) => (b.totalAmount || 0) - (a.totalAmount || 0));
      case 'price-low':
        return sorted.sort((a, b) => (a.totalAmount || 0) - (b.totalAmount || 0));
      default:
        return sorted;
    }
  }, [orders, sortBy]);

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error as Error} onRetry={refetchOrders} />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <ClipboardList className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {isAdmin ? 'All Orders' : 'My Orders'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isAdmin ? 'Manage and track all customer orders' : 'View and manage your orders'}
              </p>
            </div>
          </div>

          {!isAdmin && (
            <Link to="/new-order">
              <Button className="gap-2 bg-gradient-primary hover:opacity-90 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                New Order
              </Button>
            </Link>
          )}
        </div>

        {/* Filters and Sorting Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 bg-muted/30 rounded-lg border">
          <div className="flex items-center gap-4 flex-1 flex-wrap">
            {orders && orders.length > 0 && (
              <Badge variant="secondary" className="gap-1">
                <ClipboardList className="h-3 w-3" />
                {orders.length} {orders.length === 1 ? 'order' : 'orders'}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] h-9">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as CommandStatus | 'ALL')}
              >
                <SelectTrigger className="w-[160px] h-9">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === 'ALL' ? 'All Statuses' : status.charAt(0) + status.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {!orders || orders.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title={statusFilter !== 'ALL' ? 'No orders found' : 'No orders yet'}
          description={
            statusFilter !== 'ALL'
              ? 'Try changing the status filter'
              : isAdmin
                ? 'No orders have been placed yet'
                : 'Create your first order to get started'
          }
          action={
            statusFilter !== 'ALL' ? (
              <Button variant="outline" onClick={() => setStatusFilter('ALL')}>
                View All Orders
              </Button>
            ) : !isAdmin ? (
              <Link to="/new-order">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Order
                </Button>
              </Link>
            ) : null
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
          {sortedOrders.map((order, index) => (
            <div
              key={order.commandId}
              className="animate-slide-up"
              style={{ animationDelay: `${Math.min(index, 10) * 30}ms` }}
            >
              <OrderCard
                order={order}
                products={products || []}
                onStatusChange={isAdmin ? handleStatusChange : undefined}
                onDelete={isAdmin ? setDeleteOrder : undefined}
                onEdit={isAdmin ? setEditOrder : undefined}
                onCancel={handleCancel}
                isUpdating={updateStatusMutation.isPending || cancelMutation.isPending}
                showUsername={isAdmin}
              />
            </div>
          ))}
        </div>
      )}

      <DeleteOrderDialog
        open={!!deleteOrder}
        onClose={() => setDeleteOrder(null)}
        onConfirm={handleDelete}
        order={deleteOrder}
        isLoading={deleteMutation.isPending}
      />

      <EditOrderDialog
        open={!!editOrder}
        onClose={() => setEditOrder(null)}
        onSubmit={handleUpdateOrder}
        order={editOrder}
        products={products || []}
        isLoading={updateOrderMutation.isPending}
      />
    </div>
  );
}
