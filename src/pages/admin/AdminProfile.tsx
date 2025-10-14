import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  User, 
  Phone, 
  Mail, 
  Shield, 
  Save, 
  Eye,
  EyeOff,
  Settings,
  Key,
  Calendar,
  Building,
  Smartphone,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

export default function AdminProfilePage() {
  const [showPassword, setShowPassword] = useState(false);
  
  // Mock admin data
  const adminData = {
    name: 'Michael Johnson',
    email: 'admin@rideapp.com',
    phone: '+1555000123',
    role: 'Super Admin',
    department: 'Operations',
    employeeId: 'EMP001',
    memberSince: '2021-03-01',
    lastLogin: '2024-08-24 09:30 AM',
    profileImage: null,
    managedUsers: 1247,
    resolvedTickets: 342,
    systemUptime: '99.8%'
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={adminData.profileImage ?? undefined} />
          <AvatarFallback className="text-xl bg-red-100 text-red-700">
            {adminData.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{adminData.name}</h2>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="destructive">Admin</Badge>
            <Badge variant="outline">{adminData.role}</Badge>
          </div>
          <div className="text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Last login: {adminData.lastLogin}
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your administrative profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-name">Full Name</Label>
                  <Input id="admin-name" defaultValue={adminData.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="admin-email" 
                      type="email" 
                      defaultValue={adminData.email}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="admin-phone" 
                      defaultValue={adminData.phone}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="department" 
                      defaultValue={adminData.department}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Admin Role Level</Label>
                  <Select defaultValue="super">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super">Super Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="support">Support Admin</SelectItem>
                      <SelectItem value="analyst">Data Analyst</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee-id">Employee ID</Label>
                  <Input 
                    id="employee-id" 
                    defaultValue={adminData.employeeId}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio / Description</Label>
                <textarea 
                  id="bio"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Brief description of your role and responsibilities..."
                />
              </div>
              
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Admin Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Administrative Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{adminData.managedUsers}</div>
                  <div className="text-sm text-gray-600">Managed Users</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{adminData.resolvedTickets}</div>
                  <div className="text-sm text-gray-600">Resolved Tickets</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{adminData.systemUptime}</div>
                  <div className="text-sm text-gray-600">System Uptime</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {new Date(adminData.memberSince).getFullYear()}
                  </div>
                  <div className="text-sm text-gray-600">Member Since</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Access Permissions & System Rights
              </CardTitle>
              <CardDescription>
                Manage system access and administrative permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">User Management</div>
                      <div className="text-sm text-gray-600">Create, edit, block/unblock users and drivers</div>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-600">Full Access</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Ride Oversight</div>
                      <div className="text-sm text-gray-600">View and manage all ride records and disputes</div>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-600">Full Access</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Analytics Dashboard</div>
                      <div className="text-sm text-gray-600">View system analytics and generate reports</div>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-600">Full Access</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Driver Approval</div>
                      <div className="text-sm text-gray-600">Approve or suspend driver applications</div>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-600">Full Access</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <div className="font-medium">Financial Reports</div>
                      <div className="text-sm text-gray-600">Access to financial data and revenue reports</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Limited</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50">
                  <div className="flex items-center gap-3">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <div>
                      <div className="font-medium">System Configuration</div>
                      <div className="text-sm text-gray-600">Modify core system settings and configurations</div>
                    </div>
                  </div>
                  <Badge variant="destructive">Restricted</Badge>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium text-lg">Quick Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Request Permission Change
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Key className="h-4 w-4 mr-2" />
                    Generate API Key
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-current-password">Current Password</Label>
                <div className="relative">
                  <Input 
                    id="admin-current-password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-new-password">New Password</Label>
                <Input 
                  id="admin-new-password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                />
                <div className="text-xs text-gray-500">
                  Password must be at least 8 characters with uppercase, lowercase, and numbers
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-confirm-password">Confirm New Password</Label>
                <Input 
                  id="admin-confirm-password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                />
              </div>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Update Password
              </Button>
              
              <Separator className="my-6" />
              
              {/* Two-Factor Authentication */}
              <div className="space-y-4">
                <h4 className="font-medium text-lg flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Two-Factor Authentication
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">SMS Authentication</div>
                        <div className="text-sm text-gray-600">Receive verification codes via SMS</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-purple-50">
                    <div className="flex items-center gap-3">
                      <Key className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium">Authenticator App</div>
                        <div className="text-sm text-gray-600">Use Google Authenticator or similar apps</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Setup
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">Email Verification</div>
                        <div className="text-sm text-gray-600">Email-based login verification</div>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-green-600">Active</Badge>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              {/* Session Management */}
              <div className="space-y-4">
                <h4 className="font-medium text-lg">Session Management</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Auto-logout timer</div>
                      <div className="text-sm text-gray-600">Automatically logout after inactivity</div>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 min</SelectItem>
                        <SelectItem value="30">30 min</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Login notifications</div>
                      <div className="text-sm text-gray-600">Get notified of new login attempts</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}