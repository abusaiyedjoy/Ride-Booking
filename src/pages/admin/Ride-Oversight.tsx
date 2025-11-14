import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Calendar, ChevronLeft, ChevronRight, Eye, X, User, Car, Navigation, AlertCircle, CheckCircle, XCircle, Download } from 'lucide-react';

// Mock data for demonstration
const mockRides = [
  {
    id: 'RD001',
    date: '2024-11-14T09:30:00',
    rider: { id: 'U001', name: 'Alice Johnson', phone: '+1 (555) 123-4567' },
    driver: { id: 'U002', name: 'Bob Smith', phone: '+1 (555) 234-5678', vehicle: 'Toyota Camry - ABC 123' },
    pickup: '123 Main Street, Downtown',
    destination: '456 Oak Avenue, Uptown',
    fare: 25.50,
    distance: 8.5,
    duration: 22,
    status: 'completed',
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
    startTime: '2024-11-14T09:30:00',
    endTime: '2024-11-14T09:52:00',
    rating: { rider: 4.5, driver: 5.0 }
  },
  {
    id: 'RD002',
    date: '2024-11-14T10:15:00',
    rider: { id: 'U003', name: 'Carol Williams', phone: '+1 (555) 345-6789' },
    driver: { id: 'U004', name: 'David Brown', phone: '+1 (555) 456-7890', vehicle: 'Honda Accord - XYZ 789' },
    pickup: '789 Elm Street, Midtown',
    destination: '321 Pine Road, Suburbs',
    fare: 42.00,
    distance: 15.3,
    duration: 35,
    status: 'in-progress',
    paymentMethod: 'Cash',
    paymentStatus: 'pending',
    startTime: '2024-11-14T10:15:00',
    endTime: null
  },
  {
    id: 'RD003',
    date: '2024-11-13T18:45:00',
    rider: { id: 'U005', name: 'Emma Davis', phone: '+1 (555) 567-8901' },
    driver: { id: 'U006', name: 'Frank Wilson', phone: '+1 (555) 678-9012', vehicle: 'Tesla Model 3 - TES 001' },
    pickup: '555 Broadway, Theater District',
    destination: '888 Park Lane, Residential',
    fare: 18.75,
    distance: 6.2,
    duration: 18,
    status: 'cancelled',
    paymentMethod: 'Wallet',
    paymentStatus: 'refunded',
    startTime: '2024-11-13T18:45:00',
    endTime: '2024-11-13T18:50:00',
    cancellationReason: 'Rider cancelled - changed plans',
    rating: null
  },
  {
    id: 'RD004',
    date: '2024-11-13T14:20:00',
    rider: { id: 'U007', name: 'Grace Martinez', phone: '+1 (555) 789-0123' },
    driver: { id: 'U008', name: 'Henry Taylor', phone: '+1 (555) 890-1234', vehicle: 'Ford Fusion - DEF 456' },
    pickup: '234 Commerce Street, Business District',
    destination: '567 Tech Park, Innovation Hub',
    fare: 55.25,
    distance: 20.1,
    duration: 45,
    status: 'completed',
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
    startTime: '2024-11-13T14:20:00',
    endTime: '2024-11-13T15:05:00',
    rating: { rider: 5.0, driver: 4.8 }
  },
  {
    id: 'RD005',
    date: '2024-11-13T08:00:00',
    rider: { id: 'U001', name: 'Alice Johnson', phone: '+1 (555) 123-4567' },
    driver: { id: 'U002', name: 'Bob Smith', phone: '+1 (555) 234-5678', vehicle: 'Toyota Camry - ABC 123' },
    pickup: '999 Station Road, Transit Hub',
    destination: '111 Airport Avenue, International Airport',
    fare: 68.00,
    distance: 28.7,
    duration: 52,
    status: 'completed',
    paymentMethod: 'Debit Card',
    paymentStatus: 'paid',
    startTime: '2024-11-13T08:00:00',
    endTime: '2024-11-13T08:52:00',
    rating: { rider: 4.9, driver: 4.9 }
  },
  {
    id: 'RD006',
    date: '2024-11-12T16:30:00',
    rider: { id: 'U003', name: 'Carol Williams', phone: '+1 (555) 345-6789' },
    driver: { id: 'U006', name: 'Frank Wilson', phone: '+1 (555) 678-9012', vehicle: 'Tesla Model 3 - TES 001' },
    pickup: '777 Shopping Mall, Retail District',
    destination: '222 Home Street, Residential Area',
    fare: 15.50,
    distance: 5.0,
    duration: 15,
    status: 'completed',
    paymentMethod: 'Cash',
    paymentStatus: 'paid',
    startTime: '2024-11-12T16:30:00',
    endTime: '2024-11-12T16:45:00',
    rating: { rider: 4.7, driver: 5.0 }
  },
  {
    id: 'RD007',
    date: '2024-11-12T11:00:00',
    rider: { id: 'U005', name: 'Emma Davis', phone: '+1 (555) 567-8901' },
    driver: { id: 'U004', name: 'David Brown', phone: '+1 (555) 456-7890', vehicle: 'Honda Accord - XYZ 789' },
    pickup: '333 Restaurant Row, Food District',
    destination: '444 Apartment Complex, City Center',
    fare: 12.25,
    distance: 3.8,
    duration: 12,
    status: 'cancelled',
    paymentMethod: 'Wallet',
    paymentStatus: 'refunded',
    startTime: '2024-11-12T11:00:00',
    endTime: '2024-11-12T11:05:00',
    cancellationReason: 'Driver cancelled - emergency',
    rating: null
  },
  {
    id: 'RD008',
    date: '2024-11-11T20:15:00',
    rider: { id: 'U007', name: 'Grace Martinez', phone: '+1 (555) 789-0123' },
    driver: { id: 'U008', name: 'Henry Taylor', phone: '+1 (555) 890-1234', vehicle: 'Ford Fusion - DEF 456' },
    pickup: '666 University Campus, Education District',
    destination: '999 Library Street, Academic Area',
    fare: 8.00,
    distance: 2.5,
    duration: 8,
    status: 'completed',
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
    startTime: '2024-11-11T20:15:00',
    endTime: '2024-11-11T20:23:00',
    rating: { rider: 4.3, driver: 4.5 }
  },
  {
    id: 'RD009',
    date: '2024-11-14T11:30:00',
    rider: { id: 'U009', name: 'Ivan Peterson', phone: '+1 (555) 901-2345' },
    driver: { id: 'U010', name: 'Julia Roberts', phone: '+1 (555) 012-3456', vehicle: 'Nissan Altima - GHI 789' },
    pickup: '145 Market Street, Shopping Area',
    destination: '678 Beach Road, Waterfront',
    fare: 35.00,
    distance: 12.4,
    duration: 28,
    status: 'accepted',
    paymentMethod: 'Credit Card',
    paymentStatus: 'pending',
    startTime: null,
    endTime: null
  }
];

const AdminRideOversight = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [fareRange, setFareRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRide, setSelectedRide] = useState(null);
  const itemsPerPage = 8;

  // Filter and search logic
  const filteredRides = useMemo(() => {
    return mockRides.filter(ride => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        ride.id.toLowerCase().includes(searchLower) ||
        ride.rider.name.toLowerCase().includes(searchLower) ||
        ride.driver.name.toLowerCase().includes(searchLower) ||
        ride.pickup.toLowerCase().includes(searchLower) ||
        ride.destination.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = statusFilter === 'all' || ride.status === statusFilter;

      // Payment status filter
      const matchesPaymentStatus = paymentStatusFilter === 'all' || ride.paymentStatus === paymentStatusFilter;

      // Date range filter
      const rideDate = new Date(ride.date);
      const matchesDateStart = !dateRange.start || rideDate >= new Date(dateRange.start);
      const matchesDateEnd = !dateRange.end || rideDate <= new Date(dateRange.end);

      // Fare range filter
      const matchesFareMin = !fareRange.min || ride.fare >= parseFloat(fareRange.min);
      const matchesFareMax = !fareRange.max || ride.fare <= parseFloat(fareRange.max);

      return matchesSearch && matchesStatus && matchesPaymentStatus && matchesDateStart && matchesDateEnd && matchesFareMin && matchesFareMax;
    });
  }, [searchQuery, statusFilter, paymentStatusFilter, dateRange, fareRange]);

  // Pagination
  const totalPages = Math.ceil(filteredRides.length / itemsPerPage);
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setStatusFilter('all');
    setPaymentStatusFilter('all');
    setDateRange({ start: '', end: '' });
    setFareRange({ min: '', max: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'accepted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'refunded':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportData = () => {
    console.log('Exporting ride data...');
    // Here you would implement CSV/Excel export functionality
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = mockRides.length;
    const completed = mockRides.filter(r => r.status === 'completed').length;
    const inProgress = mockRides.filter(r => r.status === 'in-progress').length;
    const cancelled = mockRides.filter(r => r.status === 'cancelled').length;
    const totalRevenue = mockRides
      .filter(r => r.paymentStatus === 'paid')
      .reduce((sum, r) => sum + r.fare, 0);
    const avgFare = mockRides.length > 0 
      ? mockRides.reduce((sum, r) => sum + r.fare, 0) / mockRides.length 
      : 0;
    return { total, completed, inProgress, cancelled, totalRevenue, avgFare };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ride Oversight</h1>
            <p className="text-gray-600">Monitor and manage all rides across the platform</p>
          </div>
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-[#688D67] text-white rounded-lg hover:bg-[#5a7a59] transition-colors"
          >
            <Download className="w-5 h-5" />
            Export Data
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Total Rides</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Cancelled</p>
            <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-[#688D67]">${stats.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Avg Fare</p>
            <p className="text-2xl font-bold text-[#688D67]">${stats.avgFare.toFixed(2)}</p>
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
                placeholder="Search by ride ID, rider, driver, or location..."
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ride Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#688D67] focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="accepted">Accepted</option>
                  </select>
                </div>

                {/* Payment Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  <select
                    value={paymentStatusFilter}
                    onChange={(e) => setPaymentStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#688D67] focus:border-transparent"
                  >
                    <option value="all">All Payments</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="refunded">Refunded</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                {/* Date Range Start */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#688D67] focus:border-transparent"
                  />
                </div>

                {/* Date Range End */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#688D67] focus:border-transparent"
                  />
                </div>

                {/* Fare Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fare Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={fareRange.min}
                      onChange={(e) => setFareRange({ ...fareRange, min: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#688D67] focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={fareRange.max}
                      onChange={(e) => setFareRange({ ...fareRange, max: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#688D67] focus:border-transparent"
                    />
                  </div>
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
          Showing {paginatedRides.length} of {filteredRides.length} rides
        </div>

        {/* Rides Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ride ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fare</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedRides.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-12 text-center">
                      <Navigation className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-600">No rides found</p>
                    </td>
                  </tr>
                ) : (
                  paginatedRides.map((ride) => (
                    <tr key={ride.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">#{ride.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-[#688D67] rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {ride.rider.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{ride.rider.name}</div>
                            <div className="text-xs text-gray-500">{ride.rider.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {ride.driver.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{ride.driver.name}</div>
                            <div className="text-xs text-gray-500">{ride.driver.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">
                          <div className="flex items-start gap-2 mb-1">
                            <div className="w-2 h-2 bg-[#688D67] rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="line-clamp-1">{ride.pickup}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="line-clamp-1">{ride.destination}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-[#688D67]">${ride.fare.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">{ride.distance} km</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ride.status)}`}>
                          {ride.status === 'in-progress' ? 'In Progress' : 
                           ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(ride.paymentStatus)}`}>
                          {ride.paymentStatus.charAt(0).toUpperCase() + ride.paymentStatus.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(ride.date).split(',')[0]}
                        <div className="text-xs text-gray-400">{formatTime(ride.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setSelectedRide(ride)}
                          className="p-2 text-[#688D67] hover:bg-[#688D67] hover:bg-opacity-10 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
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

      {/* Ride Details Modal */}
      {selectedRide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Ride Details</h2>
                <p className="text-sm text-gray-500 mt-1">Complete information for ride #{selectedRide.id}</p>
              </div>
              <button
                onClick={() => setSelectedRide(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[calc(90vh-100px)] overflow-y-auto">
              {/* Ride Status and ID */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Ride ID</p>
                  <p className="text-xl font-semibold text-gray-900">#{selectedRide.id}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedRide.status)}`}>
                    {selectedRide.status === 'in-progress' ? 'In Progress' : 
                     selectedRide.status.charAt(0).toUpperCase() + selectedRide.status.slice(1)}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getPaymentStatusColor(selectedRide.paymentStatus)}`}>
                    {selectedRide.paymentStatus.charAt(0).toUpperCase() + selectedRide.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>

              {/* Cancellation Warning */}
              {selectedRide.status === 'cancelled' && selectedRide.cancellationReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-900">Ride Cancelled</p>
                    <p className="text-sm text-red-700 mt-1">{selectedRide.cancellationReason}</p>
                  </div>
                </div>
              )}

              {/* Rider and Driver Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Rider Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-[#688D67] rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {selectedRide.rider.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Rider Information</h3>
                      <p className="text-sm text-gray-500">Passenger details</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="text-gray-900 font-medium">{selectedRide.rider.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">User ID</p>
                      <p className="text-gray-900 font-medium">{selectedRide.rider.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900 font-medium">{selectedRide.rider.phone}</p>
                    </div>
                    {selectedRide.rating?.rider && (
                      <div>
                        <p className="text-sm text-gray-500">Rating Given</p>
                        <p className="text-gray-900 font-medium flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          {selectedRide.rating.rider} / 5.0
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Driver Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {selectedRide.driver.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Driver Information</h3>
                      <p className="text-sm text-gray-500">Service provider details</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="text-gray-900 font-medium">{selectedRide.driver.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">User ID</p>
                      <p className="text-gray-900 font-medium">{selectedRide.driver.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900 font-medium">{selectedRide.driver.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vehicle</p>
                      <p className="text-gray-900 font-medium">{selectedRide.driver.vehicle}</p>
                    </div>
                    {selectedRide.rating?.driver && (
                      <div>
                        <p className="text-sm text-gray-500">Rating Received</p>
                        <p className="text-gray-900 font-medium flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          {selectedRide.rating.driver} / 5.0
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Route Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#688D67]" />
                  Route Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 bg-[#688D67] rounded-full mt-1 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Pickup Location</p>
                      <p className="text-gray-900 font-medium">{selectedRide.pickup}</p>
                      {selectedRide.startTime && (
                        <p className="text-xs text-gray-500 mt-1">Started at {formatDate(selectedRide.startTime)}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Drop-off Location</p>
                      <p className="text-gray-900 font-medium">{selectedRide.destination}</p>
                      {selectedRide.endTime && (
                        <p className="text-xs text-gray-500 mt-1">Ended at {formatDate(selectedRide.endTime)}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trip Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#688D67] bg-opacity-10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-[#688D67]" />
                    <p className="text-sm text-gray-600">Distance</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{selectedRide.distance} km</p>
                </div>
                <div className="bg-[#688D67] bg-opacity-10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-[#688D67]" />
                    <p className="text-sm text-gray-600">Duration</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{selectedRide.duration} min</p>
                </div>
                <div className="bg-[#688D67] bg-opacity-10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-[#688D67]" />
                    <p className="text-sm text-gray-600">Fare</p>
                  </div>
                  <p className="text-2xl font-bold text-[#688D67]">${selectedRide.fare.toFixed(2)}</p>
                </div>
                <div className="bg-[#688D67] bg-opacity-10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Navigation className="w-5 h-5 text-[#688D67]" />
                    <p className="text-sm text-gray-600">Avg Speed</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedRide.duration > 0 
                      ? ((selectedRide.distance / selectedRide.duration) * 60).toFixed(1) 
                      : 'N/A'} km/h
                  </p>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#688D67]" />
                  Payment Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="text-gray-900 font-medium">{selectedRide.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(selectedRide.paymentStatus)}`}>
                      {selectedRide.paymentStatus.charAt(0).toUpperCase() + selectedRide.paymentStatus.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Base Fare</p>
                    <p className="text-gray-900 font-medium">${(selectedRide.fare * 0.7).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Distance Charge</p>
                    <p className="text-gray-900 font-medium">${(selectedRide.fare * 0.2).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time Charge</p>
                    <p className="text-gray-900 font-medium">${(selectedRide.fare * 0.1).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Total Fare</p>
                    <p className="text-xl font-bold text-[#688D67]">${selectedRide.fare.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#688D67]" />
                  Ride Timeline
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="w-0.5 h-12 bg-gray-300"></div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-medium text-gray-900">Ride Requested</p>
                      <p className="text-sm text-gray-500">{formatDate(selectedRide.date)}</p>
                    </div>
                  </div>

                  {selectedRide.startTime && (
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <Navigation className="w-5 h-5 text-white" />
                        </div>
                        {selectedRide.endTime && <div className="w-0.5 h-12 bg-gray-300"></div>}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="font-medium text-gray-900">Ride Started</p>
                        <p className="text-sm text-gray-500">{formatDate(selectedRide.startTime)}</p>
                      </div>
                    </div>
                  )}

                  {selectedRide.endTime && (
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedRide.status === 'completed' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {selectedRide.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <XCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="font-medium text-gray-900">
                          {selectedRide.status === 'completed' ? 'Ride Completed' : 'Ride Cancelled'}
                        </p>
                        <p className="text-sm text-gray-500">{formatDate(selectedRide.endTime)}</p>
                      </div>
                    </div>
                  )}

                  {!selectedRide.endTime && selectedRide.status === 'in-progress' && (
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                          <Car className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="font-medium text-blue-600">Ride In Progress</p>
                        <p className="text-sm text-gray-500">Currently active</p>
                      </div>
                    </div>
                  )}

                  {selectedRide.status === 'accepted' && (
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="font-medium text-yellow-600">Waiting for Pickup</p>
                        <p className="text-sm text-gray-500">Driver en route</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRideOversight;