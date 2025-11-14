import { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, Calendar, Clock, Navigation, Award, Download, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data
const dailyEarningsData = [
  { date: 'Nov 8', earnings: 245.50, rides: 12, hours: 8 },
  { date: 'Nov 9', earnings: 289.75, rides: 15, hours: 9 },
  { date: 'Nov 10', earnings: 312.00, rides: 16, hours: 8.5 },
  { date: 'Nov 11', earnings: 278.25, rides: 14, hours: 7.5 },
  { date: 'Nov 12', earnings: 301.50, rides: 15, hours: 8 },
  { date: 'Nov 13', earnings: 334.75, rides: 17, hours: 9.5 },
  { date: 'Nov 14', earnings: 356.50, rides: 18, hours: 10 }
];

const weeklyEarningsData = [
  { week: 'Week 1', earnings: 1823.50, rides: 89 },
  { week: 'Week 2', earnings: 2104.25, rides: 102 },
  { week: 'Week 3', earnings: 1967.75, rides: 95 },
  { week: 'Week 4', earnings: 2118.25, rides: 104 }
];

const monthlyEarningsData = [
  { month: 'Jul', earnings: 7234.50 },
  { month: 'Aug', earnings: 8156.75 },
  { month: 'Sep', earnings: 7892.25 },
  { month: 'Oct', earnings: 8543.00 },
  { month: 'Nov', earnings: 8013.75 }
];

const earningsBreakdownData = [
  { category: 'Base Fare', amount: 4567.80, percentage: 57, color: '#688D67' },
  { category: 'Distance', amount: 2134.50, percentage: 27, color: '#3b82f6' },
  { category: 'Time', amount: 1311.45, percentage: 16, color: '#f59e0b' }
];

const peakHoursData = [
  { hour: '6 AM', earnings: 45.50 },
  { hour: '9 AM', earnings: 78.25 },
  { hour: '12 PM', earnings: 92.50 },
  { hour: '3 PM', earnings: 85.75 },
  { hour: '6 PM', earnings: 125.00 },
  { hour: '9 PM', earnings: 98.75 }
];

const recentRidesData = [
  {
    id: 'RD145',
    date: '2024-11-14T18:30:00',
    rider: 'Alice Johnson',
    pickup: '123 Main Street',
    destination: '456 Oak Avenue',
    distance: 8.5,
    duration: 22,
    fare: 25.50,
    tip: 5.00,
    status: 'completed'
  },
  {
    id: 'RD144',
    date: '2024-11-14T17:15:00',
    rider: 'Bob Smith',
    pickup: '789 Elm Street',
    destination: '321 Pine Road',
    distance: 12.3,
    duration: 28,
    fare: 35.75,
    tip: 0,
    status: 'completed'
  },
  {
    id: 'RD143',
    date: '2024-11-14T15:45:00',
    rider: 'Carol Williams',
    pickup: '555 Broadway',
    destination: '888 Park Lane',
    distance: 6.2,
    duration: 18,
    fare: 18.75,
    tip: 2.50,
    status: 'completed'
  },
  {
    id: 'RD142',
    date: '2024-11-14T14:20:00',
    rider: 'David Brown',
    pickup: '234 Commerce Street',
    destination: '567 Tech Park',
    distance: 15.8,
    duration: 35,
    fare: 42.00,
    tip: 8.00,
    status: 'completed'
  },
  {
    id: 'RD141',
    date: '2024-11-14T12:30:00',
    rider: 'Emma Davis',
    pickup: '999 Station Road',
    destination: '111 Airport Avenue',
    distance: 28.7,
    duration: 52,
    fare: 68.00,
    tip: 10.00,
    status: 'completed'
  }
];

const DriverEarningsDashboard = () => {
  const [timeRange, setTimeRange] = useState('daily');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRide, setSelectedRide] = useState(null);
  const itemsPerPage = 5;

  // Calculate statistics
  const stats = useMemo(() => {
    const todayEarnings = dailyEarningsData[dailyEarningsData.length - 1].earnings;
    const weekEarnings = dailyEarningsData.reduce((sum, day) => sum + day.earnings, 0);
    const monthEarnings = 8013.75;
    const totalRides = dailyEarningsData.reduce((sum, day) => sum + day.rides, 0);
    const totalHours = dailyEarningsData.reduce((sum, day) => sum + day.hours, 0);
    const avgEarningsPerRide = weekEarnings / totalRides;
    const avgEarningsPerHour = weekEarnings / totalHours;
    const totalTips = recentRidesData.reduce((sum, ride) => sum + ride.tip, 0);
    
    return {
      todayEarnings,
      weekEarnings,
      monthEarnings,
      totalRides,
      totalHours,
      avgEarningsPerRide,
      avgEarningsPerHour,
      totalTips
    };
  }, []);

  // Pagination
  const totalPages = Math.ceil(recentRidesData.length / itemsPerPage);
  const paginatedRides = recentRidesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getChartData = () => {
    switch (timeRange) {
      case 'weekly':
        return weeklyEarningsData;
      case 'monthly':
        return monthlyEarningsData;
      default:
        return dailyEarningsData;
    }
  };

  const exportEarnings = () => {
    console.log('Exporting earnings report...');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Earnings</h1>
            <p className="text-gray-600">Track your income and performance</p>
          </div>
          <button
            onClick={exportEarnings}
            className="flex items-center gap-2 px-4 py-2 bg-[#688D67] text-white rounded-lg hover:bg-[#5a7a59] transition-colors"
          >
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>

        {/* Earnings Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Today's Earnings */}
          <div className="bg-gradient-to-br from-[#688D67] to-[#5a7a59] rounded-lg shadow-sm p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="flex items-center gap-1 text-sm font-medium bg-white bg-opacity-20 px-2 py-1 rounded">
                <TrendingUp className="w-4 h-4" />
                +12%
              </span>
            </div>
            <p className="text-sm opacity-90 mb-1">Today's Earnings</p>
            <p className="text-3xl font-bold">${stats.todayEarnings.toFixed(2)}</p>
            <p className="text-xs opacity-75 mt-2">
              {dailyEarningsData[dailyEarningsData.length - 1].rides} rides completed
            </p>
          </div>

          {/* Week Earnings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                8.5%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">This Week</p>
            <p className="text-3xl font-bold text-gray-900">${stats.weekEarnings.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">{stats.totalRides} rides • {stats.totalHours.toFixed(1)} hours</p>
          </div>

          {/* Month Earnings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                5.2%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">This Month</p>
            <p className="text-3xl font-bold text-gray-900">${stats.monthEarnings.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">November 2024</p>
          </div>

          {/* Total Tips */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                15%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Tips (Today)</p>
            <p className="text-3xl font-bold text-gray-900">${stats.totalTips.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">From {recentRidesData.length} completed rides</p>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Per Ride</p>
                <p className="text-2xl font-bold text-gray-900">${stats.avgEarningsPerRide.toFixed(2)}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Above platform average</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Per Hour</p>
                <p className="text-2xl font-bold text-gray-900">${stats.avgEarningsPerHour.toFixed(2)}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '82%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Excellent hourly rate</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Navigation className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Rides</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRides}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">This week's performance</p>
          </div>
        </div>

        {/* Time Range Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {['daily', 'weekly', 'monthly'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range
                  ? 'bg-[#688D67] text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Earnings Trend */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Earnings Trend</h3>
              <p className="text-sm text-gray-500">
                {timeRange === 'daily' ? 'Last 7 days' : 
                 timeRange === 'weekly' ? 'Last 4 weeks' : 
                 'Last 5 months'}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={getChartData()}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#688D67" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#688D67" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey={timeRange === 'monthly' ? 'month' : timeRange === 'weekly' ? 'week' : 'date'} 
                  stroke="#6b7280" 
                  style={{ fontSize: '12px' }} 
                />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Earnings']}
                />
                <Area 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#688D67" 
                  fillOpacity={1} 
                  fill="url(#colorEarnings)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Peak Hours */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Peak Hours Performance</h3>
              <p className="text-sm text-gray-500">Average earnings by time of day</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Earnings']}
                />
                <Bar dataKey="earnings" fill="#688D67" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Earnings Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Earnings Breakdown</h3>
              <p className="text-sm text-gray-500">Revenue by category</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={earningsBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {earningsBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
              {earningsBreakdownData.map((item) => (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-700">{item.category}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">${item.amount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Summary</h3>
              <p className="text-sm text-gray-500">This week's overview</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-[#688D67] bg-opacity-10 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                  <p className="text-2xl font-bold text-[#688D67]">${stats.weekEarnings.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-[#688D67] rounded-lg">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Completed Rides</p>
                  <p className="text-xl font-bold text-gray-900">{stats.totalRides}</p>
                  <p className="text-xs text-green-600 mt-1">+12 from last week</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Hours Online</p>
                  <p className="text-xl font-bold text-gray-900">{stats.totalHours.toFixed(1)}</p>
                  <p className="text-xs text-green-600 mt-1">+2.5 hours</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Avg Rating</p>
                  <p className="text-xl font-bold text-gray-900 flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    4.9
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Excellent</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Tips Earned</p>
                  <p className="text-xl font-bold text-gray-900">${stats.totalTips.toFixed(2)}</p>
                  <p className="text-xs text-green-600 mt-1">+$8.50</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Rides */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Rides</h3>
            <p className="text-sm text-gray-500">Your latest completed trips</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ride ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Distance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fare</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tip</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedRides.map((ride) => (
                  <tr key={ride.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">#{ride.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(ride.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-[#688D67] rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {ride.rider.charAt(0)}
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-900">{ride.rider}</span>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {ride.distance} km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-900">${ride.fare.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${ride.tip > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                        {ride.tip > 0 ? `+$${ride.tip.toFixed(2)}` : '$0.00'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-[#688D67]">${(ride.fare + ride.tip).toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedRide(ride)}
                        className="p-2 text-[#688D67] hover:bg-[#688D67] hover:bg-opacity-10 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      </div>

      {/* Ride Details Modal */}
      {selectedRide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Ride Earnings Details</h2>
                <p className="text-sm text-gray-500 mt-1">#{selectedRide.id}</p>
              </div>
              <button
                onClick={() => setSelectedRide(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Rider Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Rider Information</h3>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-[#688D67] rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {selectedRide.rider.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedRide.rider}</p>
                    <p className="text-sm text-gray-500">Completed at {formatDate(selectedRide.date)}</p>
                  </div>
                </div>
              </div>

              {/* Route Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Route Details</h3>
                <div className="space-y-4">
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
              </div>

              {/* Trip Statistics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#688D67] bg-opacity-10 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Distance</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedRide.distance} km</p>
                </div>
                <div className="bg-[#688D67] bg-opacity-10 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedRide.duration} min</p>
                </div>
              </div>

              {/* Earnings Breakdown */}
              <div className="bg-[#688D67] bg-opacity-10 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Earnings Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Base Fare</span>
                    <span className="font-medium text-gray-900">${(selectedRide.fare * 0.6).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Distance Charge ({selectedRide.distance} km)</span>
                    <span className="font-medium text-gray-900">${(selectedRide.fare * 0.25).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Time Charge ({selectedRide.duration} min)</span>
                    <span className="font-medium text-gray-900">${(selectedRide.fare * 0.15).toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Subtotal</span>
                      <span className="font-bold text-gray-900">${selectedRide.fare.toFixed(2)}</span>
                    </div>
                  </div>
                  {selectedRide.tip > 0 && (
                    <div className="flex justify-between items-center bg-green-50 -mx-4 px-4 py-2 rounded">
                      <span className="text-green-700 font-medium flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Tip from Rider
                      </span>
                      <span className="font-bold text-green-700">+${selectedRide.tip.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t-2 border-[#688D67]">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total Earnings</span>
                      <span className="text-2xl font-bold text-[#688D67]">${(selectedRide.fare + selectedRide.tip).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-900">Payment Status</p>
                  <p className="text-sm text-blue-700 mt-1">
                    This amount has been credited to your account and will be included in your next payout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverEarningsDashboard;