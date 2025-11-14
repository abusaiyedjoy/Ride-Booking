import { useState, useMemo } from 'react';
import { Search, Filter, MoreVertical, Eye, Ban, CheckCircle, XCircle, User, Car, Shield, ChevronLeft, ChevronRight, X, Mail, Phone, MapPin, Calendar, AlertCircle } from 'lucide-react';

// Mock data for demonstration
const mockUsers = [
  {
    id: 'U001',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1 (555) 123-4567',
    role: 'rider',
    status: 'active',
    registeredDate: '2024-01-15T10:30:00',
    location: 'New York, NY',
    totalRides: 45,
    rating: 4.8,
    lastActive: '2024-11-14T09:30:00'
  },
  {
    id: 'U002',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    phone: '+1 (555) 234-5678',
    role: 'driver',
    status: 'active',
    registeredDate: '2024-02-20T14:15:00',
    location: 'Los Angeles, CA',
    totalRides: 156,
    rating: 4.9,
    vehicleInfo: { model: 'Toyota Camry', plate: 'ABC 123', year: 2022 },
    earnings: 5430.50,
    lastActive: '2024-11-14T08:45:00'
  },
  {
    id: 'U003',
    name: 'Carol Williams',
    email: 'carol.w@email.com',
    phone: '+1 (555) 345-6789',
    role: 'rider',
    status: 'blocked',
    registeredDate: '2024-03-10T09:20:00',
    location: 'Chicago, IL',
    totalRides: 12,
    rating: 3.2,
    lastActive: '2024-11-10T15:20:00',
    blockReason: 'Multiple payment disputes'
  },
  {
    id: 'U004',
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+1 (555) 456-7890',
    role: 'driver',
    status: 'suspended',
    registeredDate: '2024-04-05T11:45:00',
    location: 'Houston, TX',
    totalRides: 89,
    rating: 4.1,
    vehicleInfo: { model: 'Honda Accord', plate: 'XYZ 789', year: 2021 },
    earnings: 3210.75,
    lastActive: '2024-11-08T12:30:00',
    suspendReason: 'Pending document verification'
  },
  {
    id: 'U005',
    name: 'Emma Davis',
    email: 'emma.davis@email.com',
    phone: '+1 (555) 567-8901',
    role: 'rider',
    status: 'active',
    registeredDate: '2024-05-12T16:00:00',
    location: 'Phoenix, AZ',
    totalRides: 78,
    rating: 4.7,
    lastActive: '2024-11-13T18:15:00'
  },
  {
    id: 'U006',
    name: 'Frank Wilson',
    email: 'frank.w@email.com',
    phone: '+1 (555) 678-9012',
    role: 'driver',
    status: 'active',
    registeredDate: '2024-06-08T08:30:00',
    location: 'Philadelphia, PA',
    totalRides: 203,
    rating: 5.0,
    vehicleInfo: { model: 'Tesla Model 3', plate: 'TES 001', year: 2023 },
    earnings: 8950.25,
    lastActive: '2024-11-14T10:00:00'
  },
  {
    id: 'U007',
    name: 'Grace Martinez',
    email: 'grace.m@email.com',
    phone: '+1 (555) 789-0123',
    role: 'rider',
    status: 'active',
    registeredDate: '2024-07-22T13:45:00',
    location: 'San Antonio, TX',
    totalRides: 23,
    rating: 4.5,
    lastActive: '2024-11-12T14:30:00'
  },
  {
    id: 'U008',
    name: 'Henry Taylor',
    email: 'henry.taylor@email.com',
    phone: '+1 (555) 890-1234',
    role: 'driver',
    status: 'blocked',
    registeredDate: '2024-08-15T10:00:00',
    location: 'San Diego, CA',
    totalRides: 34,
    rating: 3.8,
    vehicleInfo: { model: 'Ford Fusion', plate: 'DEF 456', year: 2020 },
    earnings: 1245.00,
    lastActive: '2024-11-05T09:15:00',
    blockReason: 'Safety violations reported'
  }
];

const AdminUserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(null);
  const itemsPerPage = 6;

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        user.id.toLowerCase().includes(searchLower) ||
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone.includes(searchQuery);

      // Role filter
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;

      // Status filter
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchQuery, roleFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setRoleFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'blocked':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'rider':
        return <User className="w-4 h-4" />;
      case 'driver':
        return <Car className="w-4 h-4" />;
      case 'admin':
        return <Shield className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    });
  };

  const handleAction = (action: string, user: { id: string; name: string; email: string; phone: string; role: string; status: string; registeredDate: string; location: string; totalRides: number; rating: number; lastActive: string; vehicleInfo?: undefined; earnings?: undefined; blockReason?: undefined; suspendReason?: undefined; } | { id: string; name: string; email: string; phone: string; role: string; status: string; registeredDate: string; location: string; totalRides: number; rating: number; vehicleInfo: { model: string; plate: string; year: number; }; earnings: number; lastActive: string; blockReason?: undefined; suspendReason?: undefined; } | { id: string; name: string; email: string; phone: string; role: string; status: string; registeredDate: string; location: string; totalRides: number; rating: number; lastActive: string; blockReason: string; vehicleInfo?: undefined; earnings?: undefined; suspendReason?: undefined; } | { id: string; name: string; email: string; phone: string; role: string; status: string; registeredDate: string; location: string; totalRides: number; rating: number; vehicleInfo: { model: string; plate: string; year: number; }; earnings: number; lastActive: string; suspendReason: string; blockReason?: undefined; } | { id: string; name: string; email: string; phone: string; role: string; status: string; registeredDate: string; location: string; totalRides: number; rating: number; vehicleInfo: { model: string; plate: string; year: number; }; earnings: number; lastActive: string; blockReason: string; suspendReason?: undefined; }) => {
    setShowConfirmModal({ action, user });
    setShowActionMenu(null);
  };

  const confirmAction = () => {
    // Here you would make an API call to perform the action
    console.log(`Action: ${showConfirmModal.action} for user ${showConfirmModal.user.id}`);
    setShowConfirmModal(null);
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = mockUsers.length;
    const riders = mockUsers.filter(u => u.role === 'rider').length;
    const drivers = mockUsers.filter(u => u.role === 'driver').length;
    const active = mockUsers.filter(u => u.status === 'active').length;
    const blocked = mockUsers.filter(u => u.status === 'blocked').length;
    const suspended = mockUsers.filter(u => u.status === 'suspended').length;
    return { total, riders, drivers, active, blocked, suspended };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage riders, drivers, and their accounts</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Riders</p>
            <p className="text-2xl font-bold text-[#688D67]">{stats.riders}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Drivers</p>
            <p className="text-2xl font-bold text-[#688D67]">{stats.drivers}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Active</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Blocked</p>
            <p className="text-2xl font-bold text-red-600">{stats.blocked}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Suspended</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.suspended}</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#688D67] focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-[#688D67] text-white rounded-lg hover:bg-[#5a7a59] transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Role Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#688D67] focus:border-transparent"
                  >
                    <option value="all">All Roles</option>
                    <option value="rider">Riders</option>
                    <option value="driver">Drivers</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#688D67] focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={resetFilters}
                className="mt-4 text-sm text-[#688D67] hover:text-[#5a7a59] font-medium"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {paginatedUsers.length} of {filteredUsers.length} users
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Rides</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <User className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-600">No users found</p>
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-[#688D67] rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-[#688D67]">{getRoleIcon(user.role)}</span>
                          <span className="text-sm font-medium text-gray-900 capitalize">{user.role}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.totalRides}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-medium text-gray-900">{user.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.registeredDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="p-2 text-[#688D67] hover:bg-[#688D67] hover:bg-opacity-10 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <button
                              onClick={() => setShowActionMenu(showActionMenu === user.id ? null : user.id)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            
                            {showActionMenu === user.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                {user.status === 'active' && (
                                  <>
                                    <button
                                      onClick={() => handleAction('block', user)}
                                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                    >
                                      <Ban className="w-4 h-4" />
                                      Block User
                                    </button>
                                    {user.role === 'driver' && (
                                      <button
                                        onClick={() => handleAction('suspend', user)}
                                        className="w-full px-4 py-2 text-left text-sm text-yellow-600 hover:bg-yellow-50 flex items-center gap-2"
                                      >
                                        <AlertCircle className="w-4 h-4" />
                                        Suspend Driver
                                      </button>
                                    )}
                                  </>
                                )}
                                {user.status === 'blocked' && (
                                  <button
                                    onClick={() => handleAction('unblock', user)}
                                    className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-green-50 flex items-center gap-2"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                    Unblock User
                                  </button>
                                )}
                                {user.status === 'suspended' && (
                                  <button
                                    onClick={() => handleAction('approve', user)}
                                    className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-green-50 flex items-center gap-2"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                    Approve Driver
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === i + 1
                    ? 'bg-[#688D67] text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-[#688D67] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser?.status?.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500 capitalize flex items-center gap-1">
                      {getRoleIcon(selectedUser.role)}
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Warning for blocked/suspended users */}
              {(selectedUser.status === 'blocked' || selectedUser.status === 'suspended') && (
                <div className={`rounded-lg p-4 flex items-start gap-3 ${
                  selectedUser.status === 'blocked' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    selectedUser.status === 'blocked' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                  <div>
                    <p className={`font-semibold ${
                      selectedUser.status === 'blocked' ? 'text-red-900' : 'text-yellow-900'
                    }`}>
                      {selectedUser.status === 'blocked' ? 'Account Blocked' : 'Account Suspended'}
                    </p>
                    <p className={`text-sm mt-1 ${
                      selectedUser.status === 'blocked' ? 'text-red-700' : 'text-yellow-700'
                    }`}>
                      Reason: {selectedUser.blockReason || selectedUser.suspendReason || 'No reason provided'}
                    </p>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{selectedUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">{selectedUser.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900">{selectedUser.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Information (for drivers) */}
              {selectedUser.role === 'driver' && selectedUser.vehicleInfo && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Vehicle Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Model</p>
                      <p className="text-gray-900 font-medium">{selectedUser.vehicleInfo.model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">License Plate</p>
                      <p className="text-gray-900 font-medium">{selectedUser.vehicleInfo.plate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Year</p>
                      <p className="text-gray-900 font-medium">{selectedUser.vehicleInfo.year}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-[#688D67] bg-opacity-10 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Rides</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedUser.totalRides}</p>
                </div>
                <div className="bg-[#688D67] bg-opacity-10 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Rating</p>
                  <p className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    {selectedUser.rating}
                  </p>
                </div>
                {selectedUser.role === 'driver' && selectedUser.earnings && (
                  <div className="bg-[#688D67] bg-opacity-10 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                    <p className="text-2xl font-bold text-[#688D67]">${selectedUser.earnings.toFixed(2)}</p>
                  </div>
                )}
              </div>

              {/* Account Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Account Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="text-gray-900 font-medium">{selectedUser.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Registration Date</p>
                    <p className="text-gray-900 font-medium">{formatDate(selectedUser.registeredDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Active</p>
                    <p className="text-gray-900 font-medium">{formatDate(selectedUser.lastActive)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Status</p>
                    <p className="text-gray-900 font-medium capitalize">{selectedUser.status}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                {selectedUser.status === 'active' && (
                  <>
                    <button
                      onClick={() => {
                        handleAction('block', selectedUser);
                        setSelectedUser(null);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Ban className="w-4 h-4" />
                      Block User
                    </button>
                    {selectedUser.role === 'driver' && (
                      <button
                        onClick={() => {
                          handleAction('suspend', selectedUser);
                          setSelectedUser(null);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        <AlertCircle className="w-4 h-4" />
                        Suspend Driver
                      </button>
                    )}
                  </>
                )}
                {selectedUser.status === 'blocked' && (
                  <button
                    onClick={() => {
                      handleAction('unblock', selectedUser);
                      setSelectedUser(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Unblock User
                  </button>
                )}
                {selectedUser.status === 'suspended' && selectedUser.role === 'driver' && (
                  <button
                    onClick={() => {
                      handleAction('approve', selectedUser);
                      setSelectedUser(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Driver
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                showConfirmModal.action === 'block' ? 'bg-red-100' :
                showConfirmModal.action === 'suspend' ? 'bg-yellow-100' :
                'bg-green-100'
              }`}>
                {showConfirmModal.action === 'block' && <Ban className="w-6 h-6 text-red-600" />}
                {showConfirmModal.action === 'suspend' && <AlertCircle className="w-6 h-6 text-yellow-600" />}
                {(showConfirmModal.action === 'unblock' || showConfirmModal.action === 'approve') && 
                  <CheckCircle className="w-6 h-6 text-green-600" />}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {showConfirmModal.action === 'block' && 'Block User'}
                  {showConfirmModal.action === 'unblock' && 'Unblock User'}
                  {showConfirmModal.action === 'suspend' && 'Suspend Driver'}
                  {showConfirmModal.action === 'approve' && 'Approve Driver'}
                </h3>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to {showConfirmModal.action} <strong>{showConfirmModal.user.name}</strong>?
              {showConfirmModal.action === 'block' && ' This user will not be able to access their account.'}
              {showConfirmModal.action === 'suspend' && ' This driver will not be able to accept new rides.'}
              {showConfirmModal.action === 'unblock' && ' This user will regain access to their account.'}
              {showConfirmModal.action === 'approve' && ' This driver will be able to accept rides again.'}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                  showConfirmModal.action === 'block' ? 'bg-red-600 hover:bg-red-700' :
                  showConfirmModal.action === 'suspend' ? 'bg-yellow-600 hover:bg-yellow-700' :
                  'bg-green-600 hover:bg-green-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;