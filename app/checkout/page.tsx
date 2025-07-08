'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Smartphone, 
  Banknote,
  MapPin,
  Plus,
  Edit,
  Truck,
  Shield
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { products } from '@/lib/data';

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showAddAddress, setShowAddAddress] = useState(false);

  // Mock cart items
  const cartItems = [
    { ...products[0], quantity: 1 },
    { ...products[3], quantity: 1 }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const addresses = [
    {
      id: '1',
      name: 'John Doe',
      phone: '+91 9876543210',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true
    },
    {
      id: '2',
      name: 'John Doe',
      phone: '+91 9876543210',
      address: '456 Office Complex, Floor 3',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      isDefault: false
    }
  ];

  const handlePlaceOrder = () => {
    console.log('Placing order...');
    // Handle order placement
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                  {addresses.map((address) => (
                    <div key={address.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Label htmlFor={address.id} className="font-semibold">
                              {address.name}
                            </Label>
                            {address.isDefault && (
                              <Badge variant="secondary">Default</Badge>
                            )}
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                        <p className="text-sm text-gray-600">
                          {address.address}, {address.city}, {address.state} - {address.pincode}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowAddAddress(!showAddAddress)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Address
                </Button>

                {showAddAddress && (
                  <Card className="p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Enter full name" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter phone number" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="House no, Building, Street" />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Enter city" />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="Enter state" />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input id="pincode" placeholder="Enter pincode" />
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm">Save Address</Button>
                      <Button variant="outline" size="sm" onClick={() => setShowAddAddress(false)}>
                        Cancel
                      </Button>
                    </div>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <Label htmlFor="card" className="font-semibold">Credit/Debit Card</Label>
                      <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="upi" id="upi" />
                    <Smartphone className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <Label htmlFor="upi" className="font-semibold">UPI</Label>
                      <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Banknote className="h-5 w-5 text-orange-600" />
                    <div className="flex-1">
                      <Label htmlFor="cod" className="font-semibold">Cash on Delivery</Label>
                      <p className="text-sm text-gray-600">Pay when you receive</p>
                    </div>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input id="upiId" placeholder="yourname@paytm" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (GST 18%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
                  Place Order
                </Button>

                {/* Security Info */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>100% Secure Payments</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Truck className="h-4 w-4" />
                    <span>Free delivery on orders above ₹500</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;