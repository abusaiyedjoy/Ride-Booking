// pages/driver/ProfilePage.tsx
import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
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
  Car, 
  Shield, 
  Camera, 
  Save, 
  Eye,
  EyeOff,
  Star,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react';

export default function DriverProfilePage() {
  const [showPassword, setShowPassword] = useState(false);
  
  // Mock driver data
  const driverData = {
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '+1987654321',
    address: '456 Oak Ave, City, State 54321',
    licenseNumber: 'DL12345678',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    vehicleYear: '2021',
    vehicleColor: 'White',
    licensePlate: 'ABC-123',
    memberSince: '2022-08-10',
    totalRides: 1243,
    rating: 4.9,
    earnings: 45680,
    status: 'approved',
    profileImage: null
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={driverData.profileImage} />
          <AvatarFallback className="text-xl">
            {driverData.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{driverData.name}</h2>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Driver</Badge>
            <Badge 
              variant={driverData.status === 'approved' ? 'default' : 'destructive'}
              className="flex items-center gap-1"
            >
              {driverData.status === 'approved' ? 
                <CheckCircle className="h-3 w-3" /> : 
                <AlertCircle className="h-3 w-3" />
              }
              {driverData.status.charAt(0).toUpperCase() + driverData.status.slice(1)}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{driverData.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="driver-name">Full Name</Label>
                  <Input id="driver-name" defaultValue={driverData.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver-email">Email</Label>
                  <Input id="driver-email" type="email" defaultValue={driverData.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver-phone">Phone Number</Label>
                  <Input id="driver-phone" defaultValue={driverData.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">License Number</Label>
                  <Input id="license" defaultValue={driverData.licenseNumber} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="driver-address">Address</Label>
                <Textarea 
                  id="driver-address" 
                  defaultValue={driverData.address}
                />
              </div>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Driver Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Driver Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{driverData.totalRides}</div>
                  <div className="text-sm text-gray-600">Total Rides</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{driverData.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">${driverData.earnings.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Earnings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {new Date(driverData.memberSince).getFullYear()}
                  </div>
                  <div className="text-sm text-gray-600">Member Since</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Vehicle Information
              </CardTitle>
              <CardDescription>
                Manage your vehicle details and specifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input id="make" defaultValue={driverData.vehicleMake} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" defaultValue={driverData.vehicleModel} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" defaultValue={driverData.vehicleYear} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" defaultValue={driverData.vehicleColor} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plate">License Plate</Label>
                  <Input id="plate" defaultValue={driverData.licensePlate} />
                </div>
                <div className="space-y-2">
                  <Label>Vehicle Type</Label>
                  <Select defaultValue="sedan">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="hatchback">Hatchback</SelectItem>
                      <SelectItem value="coupe">Coupe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full">Update Vehicle Info</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Required Documents
              </CardTitle>
              <CardDescription>Upload and manage your driving documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Camera className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                  <div className="text-sm font-medium mb-1">Driver's License</div>
                  <div className="text-xs text-gray-500 mb-3">Upload front and back</div>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Camera className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                  <div className="text-sm font-medium mb-1">Vehicle Registration</div>
                  <div className="text-xs text-gray-500 mb-3">Current registration</div>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Camera className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                  <div className="text-sm font-medium mb-1">Insurance Certificate</div>
                  <div className="text-xs text-gray-500 mb-3">Valid insurance proof</div>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Camera className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                  <div className="text-sm font-medium mb-1">Profile Photo</div>
                  <div className="text-xs text-gray-500 mb-3">Clear headshot</div>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Upload
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
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="driver-current-password">Current Password</Label>
                <div className="relative">
                  <Input 
                    id="driver-current-password" 
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
                <Label htmlFor="driver-new-password">New Password</Label>
                <Input 
                  id="driver-new-password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="driver-confirm-password">Confirm New Password</Label>
                <Input 
                  id="driver-confirm-password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                />
              </div>
              <Button className="w-full">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}