import React, { useState } from 'react';
import { FaBell, FaShoppingBag, FaTag, FaPercent, FaInfoCircle, FaTrash, FaCheck } from 'react-icons/fa';

const NotificationsPage = () => {
  // Mock notifications data
  const initialNotifications = [
    {
      id: 1,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #ORD-12345 has been shipped and is on its way.',
      date: '2023-06-18T14:30:00',
      isRead: false,
      icon: <FaShoppingBag className="text-indigo-600" />
    },
    {
      id: 2,
      type: 'promo',
      title: 'Flash Sale: 24 Hours Only!',
      message: 'Enjoy up to 50% off on selected electronics. Limited time offer!',
      date: '2023-06-17T09:15:00',
      isRead: true,
      icon: <FaPercent className="text-red-600" />
    },
    {
      id: 3,
      type: 'info',
      title: 'New Feature Available',
      message: 'Try our new wishlist sharing feature. Share your favorite products with friends and family.',
      date: '2023-06-15T11:45:00',
      isRead: false,
      icon: <FaInfoCircle className="text-blue-600" />
    },
    {
      id: 4,
      type: 'promo',
      title: 'Special Offer for You',
      message: 'Use code WELCOME15 to get 15% off on your first purchase.',
      date: '2023-06-14T16:20:00',
      isRead: true,
      icon: <FaTag className="text-green-600" />
    },
    {
      id: 5,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #ORD-10987 has been delivered. Enjoy your purchase!',
      date: '2023-06-12T13:10:00',
      isRead: true,
      icon: <FaShoppingBag className="text-indigo-600" />
    }
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter notifications based on selected filter
  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.isRead;
    return notification.type === activeFilter;
  });
  
  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  };
  
  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };
  
  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  // Show delete confirmation modal
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  
  const confirmNotificationDelete = (notification) => {
    setNotificationToDelete(notification);
    setShowDeleteConfirmation(true);
  };
  
  const handleConfirmNotificationDelete = () => {
    if (notificationToDelete) {
      deleteNotification(notificationToDelete.id);
      setShowDeleteConfirmation(false);
      setNotificationToDelete(null);
    }
  };
  
  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'No new notifications'}
            </p>
          </div>
          
          <div className="flex space-x-2">
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                <FaCheck className="mr-1" /> Mark all as read
              </button>
            )}
            
            {notifications.length > 0 && (
              <button 
                onClick={clearAllNotifications}
                className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
              >
                <FaTrash className="mr-1" /> Clear all
              </button>
            )}
          </div>
        </div>
        
        {/* Filter tabs */}
        <div className="flex overflow-x-auto mb-6 border-b border-gray-200">
          <button 
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeFilter === 'all' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeFilter === 'unread' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setActiveFilter('unread')}
          >
            Unread
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeFilter === 'order' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setActiveFilter('order')}
          >
            Orders
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeFilter === 'promo' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setActiveFilter('promo')}
          >
            Promotions
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeFilter === 'info' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setActiveFilter('info')}
          >
            Info
          </button>
        </div>
        
        {/* Notifications list */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <FaBell className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
            <p className="text-gray-600">
              {activeFilter === 'all' 
                ? "You don't have any notifications yet." 
                : `You don't have any ${activeFilter === 'unread' ? 'unread' : activeFilter} notifications.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`bg-white rounded-lg shadow-sm border ${!notification.isRead ? 'border-l-4 border-l-indigo-600' : 'border-gray-200'} p-4 transition-all hover:shadow-md`}
              >
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {notification.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatRelativeTime(notification.date)}
                      </span>
                    </div>
                    <p className={`mt-1 ${!notification.isRead ? 'text-gray-800' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
                    <div className="mt-2 flex justify-end space-x-2">
                      {!notification.isRead && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-indigo-600 hover:text-indigo-800"
                        >
                          Mark as read
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;