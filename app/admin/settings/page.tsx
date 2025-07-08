'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Store, 
  CreditCard, 
  Truck, 
  Bell, 
  Shield,
  Save,
  Upload
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    storeName: 'ShopKart',
    storeDescription: 'Your one-stop destination for all your shopping needs',
    storeEmail: 'support@shopkart.com',
    storePhone: '+91 1234567890',
    currency: 'INR',
    taxRate: '18',
    enableNotifications: true,
    enableEmailMarketing: true,
    enableSMS: false,
    freeShippingThreshold: '500',
    standardShipping: '50',
    expressShipping: '150',
    paymentGateway: 'razorpay',
    razorpayKey: '',
    stripeKey: '',
    enableCOD: true,
    enableUPI: true,
    enableCards: true
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Handle save logic here
  };

  const handleInputChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-600">Manage your store configuration</p>
        </div>
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Store className="mr-2 h-5 w-5" />
                Store Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={settings.storeName}
                    onChange={(e) => handleInputChange('storeName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => handleInputChange('storeEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Store Phone</Label>
                  <Input
                    id="storePhone"
                    value={settings.storePhone}
                    onChange={(e) => handleInputChange('storePhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    value={settings.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea
                  id="storeDescription"
                  value={settings.storeDescription}
                  onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) => handleInputChange('taxRate', e.target.value)}
                  className="w-32"
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Store Logo</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Store className="h-8 w-8 text-gray-400" />
                  </div>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Credit/Debit Cards</p>
                      <p className="text-sm text-gray-600">Accept Visa, Mastercard, etc.</p>
                    </div>
                    <Switch
                      checked={settings.enableCards}
                      onCheckedChange={(checked) => handleInputChange('enableCards', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">UPI Payments</p>
                      <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</p>
                    </div>
                    <Switch
                      checked={settings.enableUPI}
                      onCheckedChange={(checked) => handleInputChange('enableUPI', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive</p>
                    </div>
                    <Switch
                      checked={settings.enableCOD}
                      onCheckedChange={(checked) => handleInputChange('enableCOD', checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment Gateway</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Payment Gateway</Label>
                    <select
                      value={settings.paymentGateway}
                      onChange={(e) => handleInputChange('paymentGateway', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="razorpay">Razorpay</option>
                      <option value="stripe">Stripe</option>
                    </select>
                  </div>

                  {settings.paymentGateway === 'razorpay' && (
                    <div className="space-y-2">
                      <Label htmlFor="razorpayKey">Razorpay API Key</Label>
                      <Input
                        id="razorpayKey"
                        type="password"
                        value={settings.razorpayKey}
                        onChange={(e) => handleInputChange('razorpayKey', e.target.value)}
                        placeholder="Enter your Razorpay API key"
                      />
                    </div>
                  )}

                  {settings.paymentGateway === 'stripe' && (
                    <div className="space-y-2">
                      <Label htmlFor="stripeKey">Stripe API Key</Label>
                      <Input
                        id="stripeKey"
                        type="password"
                        value={settings.stripeKey}
                        onChange={(e) => handleInputChange('stripeKey', e.target.value)}
                        placeholder="Enter your Stripe API key"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Shipping Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="freeShippingThreshold">Free Shipping Threshold (₹)</Label>
                  <Input
                    id="freeShippingThreshold"
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => handleInputChange('freeShippingThreshold', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="standardShipping">Standard Shipping (₹)</Label>
                  <Input
                    id="standardShipping"
                    type="number"
                    value={settings.standardShipping}
                    onChange={(e) => handleInputChange('standardShipping', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expressShipping">Express Shipping (₹)</Label>
                  <Input
                    id="expressShipping"
                    type="number"
                    value={settings.expressShipping}
                    onChange={(e) => handleInputChange('expressShipping', e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Delivery Zones</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Local Delivery</p>
                      <p className="text-sm text-gray-600">Within city limits</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹30</p>
                      <p className="text-sm text-gray-600">1-2 days</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Regional Delivery</p>
                      <p className="text-sm text-gray-600">Within state</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹50</p>
                      <p className="text-sm text-gray-600">3-5 days</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">National Delivery</p>
                      <p className="text-sm text-gray-600">Across India</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹100</p>
                      <p className="text-sm text-gray-600">5-7 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive order and system notifications</p>
                  </div>
                  <Switch
                    checked={settings.enableNotifications}
                    onCheckedChange={(checked) => handleInputChange('enableNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Marketing</p>
                    <p className="text-sm text-gray-600">Send promotional emails to customers</p>
                  </div>
                  <Switch
                    checked={settings.enableEmailMarketing}
                    onCheckedChange={(checked) => handleInputChange('enableEmailMarketing', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Send SMS updates to customers</p>
                  </div>
                  <Switch
                    checked={settings.enableSMS}
                    onCheckedChange={(checked) => handleInputChange('enableSMS', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Password Policy</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="minLength" defaultChecked />
                    <Label htmlFor="minLength">Minimum 8 characters</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="uppercase" defaultChecked />
                    <Label htmlFor="uppercase">At least one uppercase letter</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="numbers" defaultChecked />
                    <Label htmlFor="numbers">At least one number</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="special" />
                    <Label htmlFor="special">At least one special character</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Session Management</h3>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    defaultValue="30"
                    className="w-32"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;