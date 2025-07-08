'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Package, 
  Heart, 
  CreditCard, 
  MapPin, 
  Settings,
  LogOut,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  Edit,
  Trash2
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { orders, products } from '@/lib/data';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'confirmed':
        return <Package className="h-4 w-4 text-blue-600" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    joinedDate: 'January 2023'
  };

  // Mock wishlist items
  const wishlistItems = products.slice(0, 4);

  // Mock saved addresses
  const savedAddresses = [
    {
      id: '1',
      name: 'Home',
      address: '123 Main Street, Apartment 4B, Mumbai, Maharashtra - 400001',
      phone: '+91 9876543210',
      isDefault: true
    },
    {
      id: '2',
      name: 'Office',
      address: '456 Business Park, Floor 3, Mumbai, Maharashtra - 400002',
      phone: '+91 9876543210',
      isDefault: false
    }
  ];

  // Mock saved cards
  const savedCards = [
    {
      id: '1',
      type: 'Visa',
      last4: '1234',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'Mastercard',
      last4: '5678',
      expiry: '08/26',
      isDefault: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <CardTitle>{user.name}</CardTitle>
                <p className="text-sm text-gray-600">{user.email}</p>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === 'orders' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('orders')}
                  >
                    <Package className="mr-3 h-4 w-4" />
                    My Orders
                  </Button>
                  <Button
                    variant={activeTab === 'wishlist' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <Heart className="mr-3 h-4 w-4" />
                    Wishlist
                  </Button>
                  <Button
                    variant={activeTab === 'cards' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('cards')}
                  >
                    <CreditCard className="mr-3 h-4 w-4" />
                    Saved Cards
                  </Button>
                  <Button
                    variant={activeTab === 'addresses' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('addresses')}
                  >
                    <MapPin className="mr-3 h-4 w-4" />
                    Addresses
                  </Button>
                  <Button
                    variant={activeTab === 'profile' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('profile')}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* My Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">My Orders</h1>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">Placed on {order.orderDate}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1`}>
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex -space-x-2">
                            {order.items.slice(0, 3).map((item, index) => (
                              <div key={index} className="w-12 h-12 relative border-2 border-white rounded-md overflow-hidden">
                                <Image
                                  src={item.image}
                                  alt={item.productName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                          <div>
                            <p className="font-medium">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                            <p className="text-sm text-gray-600">Total: {formatPrice(order.total)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <p>Delivery to: {order.address.city}, {order.address.state}</p>
                            {order.deliveryDate && (
                              <p>Delivered on: {order.deliveryDate}</p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            {order.status === 'delivered' && (
                              <Button variant="outline" size="sm">
                                Rate & Review
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">My Wishlist</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((product) => (
                    <Card key={product.id}>
                      <CardContent className="p-4">
                        <div className="aspect-square relative mb-4">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <h3 className="font-semibold mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="font-bold">{formatPrice(product.price)}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          {product.discount > 0 && (
                            <Badge variant="destructive">{product.discount}% OFF</Badge>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button className="flex-1" size="sm">
                            Add to Cart
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Cards */}
            {activeTab === 'cards' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">Saved Cards</h1>
                  <Button>Add New Card</Button>
                </div>
                <div className="space-y-4">
                  {savedCards.map((card) => (
                    <Card key={card.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold">{card.type} ending in {card.last4}</p>
                              <p className="text-sm text-gray-600">Expires {card.expiry}</p>
                              {card.isDefault && (
                                <Badge variant="secondary" className="mt-1">Default</Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">Manage Addresses</h1>
                  <Button>Add New Address</Button>
                </div>
                <div className="space-y-4">
                  {savedAddresses.map((address) => (
                    <Card key={address.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">{address.name}</h3>
                              {address.isDefault && (
                                <Badge variant="secondary">Default</Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-1">{address.address}</p>
                            <p className="text-sm text-gray-600">Phone: {address.phone}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Profile */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Profile Information</h1>
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue={user.phone}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4 pt-4">
                      <Button>Save Changes</Button>
                      <Button variant="outline">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <Button>Update Password</Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;