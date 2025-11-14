import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Car, Navigation, Download, RefreshCw } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for charts
const rideVolumeData = [
  { date: 'Nov 1', rides: 245, revenue: 5430 },
  { date: 'Nov 2', rides: 289, revenue: 6120 },
  { date: 'Nov 3', rides: 312, revenue: 6890 },
  { date: 'Nov 4', rides: 278, revenue: 5980 },
  { date: 'Nov 5', rides: 301, revenue: 6450 },
  { date: 'Nov 6', rides: 334, revenue: 7230 },
  { date: 'Nov 7', rides: 356, revenue: 7650 },
  { date: 'Nov 8', rides: 298, revenue: 6340 },
  { date: 'Nov 9', rides: 287, revenue: 6120 },
  { date: 'Nov 10', rides: 323, revenue: 6980 },
  { date: 'Nov 11', rides: 345, revenue: 7430 },
  { date: 'Nov 12', rides: 367, revenue: 7890 },
  { date: 'Nov 13', rides: 389, revenue: 8340 },
  { date: 'Nov 14', rides: 412, revenue: 8920 }
];

const hourlyDistributionData = [
  { hour: '12 AM', rides: 12 },
  { hour: '3 AM', rides: 8 },
  { hour: '6 AM', rides: 45 },
  { hour: '9 AM', rides: 78 },
  { hour: '12 PM', rides: 92 },
  { hour: '3 PM', rides: 85 },
  { hour: '6 PM', rides: 112 },
  { hour: '9 PM', rides: 98 }
];

const rideStatusData = [
  { name: 'Completed', value: 2845, color: '#22c55e' },
  { name: 'Cancelled', value: 234, color: '#ef4444' },
  { name: 'In Progress', value: 45, color: '#3b82f6' }
];

const topDriversData = [
  { name: 'Frank Wilson', rides: 203, earnings: 8950.25, rating: 5.0 },
  { name: 'Bob Smith', rides: 156, earnings: 5430.50, rating: 4.9 },
  { name: 'Jennifer Martinez', rides: 142, earnings: 6120.75, rating: 4.9 },
  { name: 'David Brown', rides: 89, earnings: 3210.75, rating: 4.1 },
  { name: 'Emily Davis', rides: 87, earnings: 4560.00, rating: 5.0 }
];

const revenueBreakdownData = [
  { category: 'Base Fare', amount: 45320, percentage: 58 },
  { category: 'Distance Charge', amount: 21450, percentage: 27 },
  { category: 'Time Charge', amount: 11680, percentage: 15 }
];

const paymentMethodData = [
  { name: 'Credit Card', value: 1456, color: '#688D67' },
  { name: 'Cash', value: 892, color: '#8B4513' },
  { name: 'Debit Card', value: 567, color: '#4169E1' },
  { name: 'Wallet', value: 209, color: '#FF8C00' }
];

const weeklyComparisonData = [
  { week: 'Week 1', rides: 2134, revenue: 45230 },
  { week: 'Week 2', rides: 2456, revenue: 52340 },
  { week: 'Week 3', rides: 2298, revenue: 48920 },
  { week: 'Week 4', rides: 2567, revenue: 54780 }
];

const AdminAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('daily');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const exportData = () => {
    console.log('Exporting analytics data...');
  };

  // Calculate summary statistics
  const stats = useMemo(() => {
    const totalRides = rideStatusData.reduce((sum, item) => sum + item.value, 0);
    const totalRevenue = revenueBreakdownData.reduce((sum, item) => sum + item.amount, 0);
    const activeDrivers = 156;
    const activeRiders = 892;
    const avgRideValue = totalRevenue / totalRides;
    const completionRate = (rideStatusData[0].value / totalRides) * 100;
    
    return {
      totalRides,
      totalRevenue,
      activeDrivers,
      activeRiders,
      avgRideValue,
      completionRate
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Real-time insights and performance metrics</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors ${
                refreshing ? 'opacity-50' : ''
              }`}
              disabled={refreshing}
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-[#688D67] text-white rounded-lg hover:bg-[#5a7a59] transition-colors"
            >
              <Download className="w-5 h-5" />
              Export
            </button>
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

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Rides */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Navigation className="w-6 h-6 text-blue-600" />
              </div>
              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                12.5%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Total Rides</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalRides.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">+156 from last period</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                8.3%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">+$6,420 from last period</p>
          </div>

          {/* Active Drivers */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Car className="w-6 h-6 text-purple-600" />
              </div>
              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                5.2%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Active Drivers</p>
            <p className="text-3xl font-bold text-gray-900">{stats.activeDrivers}</p>
            <p className="text-xs text-gray-500 mt-2">+8 new drivers this week</p>
          </div>

          {/* Active Riders */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <span className="flex items-center gap-1 text-red-600 text-sm font-medium">
                <TrendingDown className="w-4 h-4" />
                2.1%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Active Riders</p>
            <p className="text-3xl font-bold text-gray-900">{stats.activeRiders}</p>
            <p className="text-xs text-gray-500 mt-2">-19 from last period</p>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#688D67] to-[#5a7a59] rounded-lg shadow-sm p-6 text-white">
            <p className="text-sm opacity-90 mb-1">Average Ride Value</p>
            <p className="text-3xl font-bold">${stats.avgRideValue.toFixed(2)}</p>
            <p className="text-xs opacity-75 mt-2">Per completed ride</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm p-6 text-white">
            <p className="text-sm opacity-90 mb-1">Completion Rate</p>
            <p className="text-3xl font-bold">{stats.completionRate.toFixed(1)}%</p>
            <p className="text-xs opacity-75 mt-2">Of all requested rides</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-sm p-6 text-white">
            <p className="text-sm opacity-90 mb-1">Peak Hour</p>
            <p className="text-3xl font-bold">6 PM</p>
            <p className="text-xs opacity-75 mt-2">112 rides on average</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Ride Volume & Revenue Trend */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Ride Volume & Revenue</h3>
                <p className="text-sm text-gray-500">Daily trends over the last 2 weeks</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={rideVolumeData}>
                <defs>
                  <linearGradient id="colorRides" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#688D67" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#688D67" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis yAxisId="left" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="rides" 
                  stroke="#688D67" 
                  fillOpacity={1} 
                  fill="url(#colorRides)"
                  name="Rides"
                />
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)"
                  name="Revenue ($)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Hourly Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Hourly Distribution</h3>
                <p className="text-sm text-gray-500">Average rides per time slot</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="rides" fill="#688D67" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Ride Status Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Ride Status</h3>
              <p className="text-sm text-gray-500">Distribution by status</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={rideStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {rideStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {rideStatusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
              <p className="text-sm text-gray-500">Distribution by payment type</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {paymentMethodData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Breakdown</h3>
              <p className="text-sm text-gray-500">By charge type</p>
            </div>
            <div className="space-y-4">
              {revenueBreakdownData.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    <span className="text-sm font-bold text-gray-900">${item.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#688D67] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.percentage}% of total revenue</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Drivers */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Top Performing Drivers</h3>
                <p className="text-sm text-gray-500">Based on rides completed</p>
              </div>
            </div>
            <div className="space-y-4">
              {topDriversData.map((driver, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#688D67] text-white rounded-full font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{driver.name}</p>
                      <p className="text-sm text-gray-500">{driver.rides} rides completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#688D67]">${driver.earnings.toFixed(2)}</p>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium">{driver.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Comparison */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Weekly Comparison</h3>
                <p className="text-sm text-gray-500">Monthly performance overview</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="week" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis yAxisId="left" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="rides" fill="#688D67" radius={[8, 8, 0, 0]} name="Rides" />
                <Bar yAxisId="right" dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsDashboard;