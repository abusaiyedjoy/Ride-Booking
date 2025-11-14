import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, MapPin, Clock, ChevronLeft, ChevronRight, Eye, X } from 'lucide-react';

// Mock data for demonstration
const mockRides = [
  {
    id: 'RD001',
    date: '2024-11-14T09:30:00',
    pickup: '123 Main Street, Downtown',
    destination: '456 Oak Avenue, Uptown',
    driver: { name: 'John Smith', rating: 4.8, vehicle: 'Toyota Camry - ABC 123' },
    fare: 25.50,
    distance: 8.5,
    duration: 22,
    status: 'completed',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'RD002',
    date: '2024-11-13T14:15:00',
    pickup: '789 Elm Street, Midtown',
    destination: '321 Pine Road, Suburbs',
    driver: { name: 'Sarah Johnson', rating: 4.9, vehicle: 'Honda Accord - XYZ 789' },
    fare: 42.00,
    distance: 15.3,
    duration: 35,
    status: 'completed',
    paymentMethod: 'Cash'
  },
  {
    id: 'RD003',
    date: '2024-11-12T18:45:00',
    pickup: '555 Broadway, Theater District',
    destination: '888 Park Lane, Residential',
    driver: { name: 'Michael Brown', rating: 4.7, vehicle: 'Hyundai Elantra - LMN 456' },
    fare: 18.75,
    distance: 6.2,
    duration: 18,
    status: 'cancelled',
    paymentMethod: 'Wallet'
  },
  {
    id: 'RD004',
    date: '2024-11-11T07:20:00',
    pickup: '234 Commerce Street, Business District',
    destination: '567 Tech Park, Innovation Hub',
    driver: { name: 'Emily Davis', rating: 5.0, vehicle: 'Tesla Model 3 - TES 001' },
    fare: 55.25,
    distance: 20.1,
    duration: 45,
    status: 'completed',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'RD005',
    date: '2024-11-10T16:30:00',
    pickup: '999 Station Road, Transit Hub',
    destination: '111 Airport Avenue, International Airport',
    driver: { name: 'David Wilson', rating: 4.6, vehicle: 'Ford Fusion - DEF 222' },
    fare: 68.00,
    distance: 28.7,
    duration: 52,
    status: 'completed',
    paymentMethod: 'Debit Card'
  },
  {
    id: 'RD006',
    date: '2024-11-09T11:00:00',
    pickup: '777 Shopping Mall, Retail District',
    destination: '222 Home Street, Residential Area',
    driver: { name: 'Lisa Anderson', rating: 4.8, vehicle: 'Nissan Altima - GHI 333' },
    fare: 15.50,
    distance: 5.0,
    duration: 15,
    status: 'completed',
    paymentMethod: 'Cash'
  },
  {
    id: 'RD007',
    date: '2024-11-08T20:15:00',
    pickup: '333 Restaurant Row, Food District',
    destination: '444 Apartment Complex, City Center',
    driver: { name: 'Robert Taylor', rating: 4.5, vehicle: 'Chevrolet Malibu - JKL 444' },
    fare: 12.25,
    distance: 3.8,
    duration: 12,
    status: 'completed',
    paymentMethod: 'Wallet'
  },
  {
    id: 'RD008',
    date: '2024-11-07T13:40:00',
    pickup: '666 University Campus, Education District',
    destination: '999 Library Street, Academic Area',
    driver: { name: 'Jennifer Martinez', rating: 4.9, vehicle: 'Mazda 6 - MNO 555' },
    fare: 8.00,
    distance: 2.5,
    duration: 8,
    status: 'completed',
    paymentMethod: 'Credit Card'
  }
];

const RideHistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [fareRange, setFareRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRide, setSelectedRide] = useState(null);
  const itemsPerPage = 5;

  // Filter and search logic
  const filteredRides = useMemo(() => {
    return mockRides.filter(ride => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        ride.id.toLowerCase().includes(searchLower) ||
        ride.pickup.toLowerCase().includes(searchLower) ||
        ride.destination.toLowerCase().includes(searchLower) ||
        ride.driver.name.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = statusFilter === 'all' || ride.status === statusFilter;

      // Date range filter
      const rideDate = new Date(ride.date);
      const matchesDateStart = !dateRange.start || rideDate >= new Date(dateRange.start);
      const matchesDateEnd = !dateRange.end || rideDate <= new Date(dateRange.end);

      // Fare range filter
      const matchesFareMin = !fareRange.min || ride.fare >= parseFloat(fareRange.min);
      const matchesFareMax = !fareRange.max || ride.fare <= parseFloat(fareRange.max);

      return matchesSearch && matchesStatus && matchesDateStart && matchesDateEnd && matchesFareMin && matchesFareMax;
    });
  }, [searchQuery, statusFilter, dateRange, fareRange]);

  // Pagination
  const totalPages = Math.ceil(filteredRides.length / itemsPerPage);
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setStatusFilter('all');
    setDateRange({ start: '', end: '' });
    setFareRange({ min: '', max: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ride History</h1>
          <p className="text-gray-600">View and manage your past rides</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by ride ID, location, or driver..."
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#688D67] focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
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

        {/* Rides List */}
        <div className="space-y-4">
          {paginatedRides.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-gray-400 mb-4">
                <MapPin className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No rides found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </div>
          ) : (
            paginatedRides.map((ride) => (
              <div
                key={ride.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-semibold text-gray-900">#{ride.id}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(ride.status)}`}>
                        {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {/* Pickup */}
                      <div className="flex items-start gap-2">
                        <div className="w-3 h-3 bg-[#688D67] rounded-full mt-1 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm text-gray-500">Pickup</p>
                          <p className="text-gray-900 font-medium">{ride.pickup}</p>
                        </div>
                      </div>

                      {/* Destination */}
                      <div className="flex items-start gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm text-gray-500">Destination</p>
                          <p className="text-gray-900 font-medium">{ride.destination}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Section - Driver Info */}
                  <div className="flex-shrink-0">
                    <p className="text-sm text-gray-500 mb-1">Driver</p>
                    <p className="font-medium text-gray-900">{ride.driver.name}</p>
                    <p className="text-sm text-gray-600">{ride.driver.vehicle}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium">{ride.driver.rating}</span>
                    </div>
                  </div>

                  {/* Right Section - Details */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#688D67]">${ride.fare.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{ride.paymentMethod}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{ride.distance} km</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{ride.duration} min</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(ride.date)}</span>
                    </div>

                    <button
                      onClick={() => setSelectedRide(ride)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#688D67] text-white rounded-lg hover:bg-[#5a7a59] transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Ride Details</h2>
              <button
                onClick={() => setSelectedRide(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Ride ID and Status */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Ride ID</p>
                  <p className="text-xl font-semibold text-gray-900">#{selectedRide.id}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedRide.status)}`}>
                  {selectedRide.status.charAt(0).toUpperCase() + selectedRide.status.slice(1)}
                </span>
              </div>

              {/* Route Information */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 mb-3">Route Information</h3>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-[#688D67] rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-500">Pickup Location</p>
                    <p className="text-gray-900 font-medium">{selectedRide.pickup}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-500">Drop-off Location</p>
                    <p className="text-gray-900 font-medium">{selectedRide.destination}</p>
                  </div>
                </div>
              </div>

              {/* Driver Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Driver Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name</span>
                    <span className="font-medium text-gray-900">{selectedRide.driver.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle</span>
                    <span className="font-medium text-gray-900">{selectedRide.driver.vehicle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating</span>
                    <span className="font-medium text-gray-900 flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      {selectedRide.driver.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ride Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Distance</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedRide.distance} km</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Duration</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedRide.duration} min</p>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-[#688D67] bg-opacity-10 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Payment Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium text-gray-900">{selectedRide.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                    <span className="text-lg font-semibold text-gray-900">Total Fare</span>
                    <span className="text-3xl font-bold text-[#688D67]">${selectedRide.fare.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Date and Time */}
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(selectedRide.date)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideHistoryPage;