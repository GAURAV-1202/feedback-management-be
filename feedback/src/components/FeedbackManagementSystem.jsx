import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Eye, Trash2, Edit3, Star, Calendar, User, Mail, MessageSquare, ChevronDown, X } from 'lucide-react';

// Mock data for demonstration
const mockFeedbacks = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Great Service',
    message: 'I had an amazing experience with your product. The customer service was exceptional and the delivery was fast.',
    rating: 5,
    status: 'new',
    category: 'service',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    subject: 'Product Issue',
    message: 'I encountered some problems with the product functionality. It would be great if this could be fixed.',
    rating: 2,
    status: 'in-progress',
    category: 'product',
    createdAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    subject: 'Feature Request',
    message: 'Could you please add dark mode to the application? It would really improve the user experience.',
    rating: 4,
    status: 'resolved',
    category: 'feature',
    createdAt: '2024-01-13T09:15:00Z'
  }
];

const FeedbackManagementSystem = () => {
  const [feedbacks, setFeedbacks] = useState(mockFeedbacks);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState(mockFeedbacks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter feedbacks based on search and filters
  useEffect(() => {
    let filtered = feedbacks.filter(feedback => {
      const matchesSearch = feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           feedback.subject.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || feedback.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || feedback.category === filterCategory;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
    
    setFilteredFeedbacks(filtered);
  }, [searchTerm, filterStatus, filterCategory, feedbacks]);

  const handleStatusChange = (id, newStatus) => {
    setFeedbacks(prev => prev.map(feedback => 
      feedback.id === id ? { ...feedback, status: newStatus } : feedback
    ));
  };

  const handleDeleteFeedback = (id) => {
    setFeedbacks(prev => prev.filter(feedback => feedback.id !== id));
    if (selectedFeedback && selectedFeedback.id === id) {
      setIsModalOpen(false);
      setSelectedFeedback(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  // Stats calculation
  const stats = {
    total: feedbacks.length,
    new: feedbacks.filter(f => f.status === 'new').length,
    inProgress: feedbacks.filter(f => f.status === 'in-progress').length,
    resolved: feedbacks.filter(f => f.status === 'resolved').length,
    avgRating: feedbacks.length > 0 ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1) : 0
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback Management</h1>
          <p className="text-gray-600">Manage and respond to customer feedback efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-gray-600">Total Feedback</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-500">{stats.new}</div>
            <div className="text-gray-600">New</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-yellow-500">{stats.inProgress}</div>
            <div className="text-gray-600">In Progress</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-500">{stats.resolved}</div>
            <div className="text-gray-600">Resolved</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-500">{stats.avgRating}</div>
            <div className="text-gray-600">Avg Rating</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search feedback..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>

              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="service">Service</option>
                <option value="product">Product</option>
                <option value="feature">Feature</option>
              </select>

              <button 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus size={20} />
                Add Feedback
              </button>
            </div>
          </div>
        </div>

        {/* Feedback Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFeedbacks.map((feedback) => (
                  <tr key={feedback.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{feedback.name}</div>
                        <div className="text-sm text-gray-500">{feedback.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{feedback.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {getRatingStars(feedback.rating)}
                        <span className="ml-1 text-sm text-gray-600">({feedback.rating})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(feedback.status)}`}
                        value={feedback.status}
                        onChange={(e) => handleStatusChange(feedback.id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full capitalize">
                        {feedback.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(feedback.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => {
                            setSelectedFeedback(feedback);
                            setIsModalOpen(true);
                          }}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteFeedback(feedback.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Feedback Modal */}
        {isModalOpen && selectedFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Feedback Details</h2>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="text-gray-400" size={20} />
                      <div>
                        <div className="font-medium">{selectedFeedback.name}</div>
                        <div className="text-sm text-gray-500">Customer</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="text-gray-400" size={20} />
                      <div>
                        <div className="font-medium">{selectedFeedback.email}</div>
                        <div className="text-sm text-gray-500">Email</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Subject</h3>
                    <p className="text-gray-700">{selectedFeedback.subject}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Message</h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedFeedback.message}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Rating</h3>
                      <div className="flex items-center gap-1">
                        {getRatingStars(selectedFeedback.rating)}
                        <span className="ml-1 text-sm text-gray-600">({selectedFeedback.rating}/5)</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Status</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedFeedback.status)}`}>
                        {selectedFeedback.status}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Category</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full capitalize">
                        {selectedFeedback.category}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Date Submitted</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="text-gray-400" size={16} />
                      <span className="text-gray-700">{formatDate(selectedFeedback.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                  <button
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Reply to Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackManagementSystem;