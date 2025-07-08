'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { products } from '@/lib/data';

interface CartItem {
  id: string;
  quantity: number;
}

const CartPage = () => {
  // Mock cart items (in real app, this would come from context/state management)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', quantity: 1 },
    { id: '2', quantity: 2 },
    { id: '4', quantity: 1 },
  ]);

  const cartProducts = cartItems.map(item => ({
    ...products.find(p => p.id === item.id)!,
    quantity: item.quantity
  }));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartProducts.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalDiscount = () => {
    return cartProducts.reduce((total, item) => 
      total + ((item.originalPrice - item.price) * item.quantity), 0
    );
  };

  const getOriginalTotal = () => {
    return cartProducts.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some items to get started!</p>
            <Link href="/products">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                        {item.discount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {item.discount}% OFF
                          </Badge>
                        )}
                      </div>
                      
                      {item.fastDelivery && (
                        <Badge variant="secondary" className="mt-2">
                          Fast Delivery
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>{formatPrice(getOriginalTotal())}</span>
                </div>
                
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(getTotalDiscount())}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">FREE</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                
                <div className="text-sm text-green-600">
                  You will save {formatPrice(getTotalDiscount())} on this order
                </div>
                
                <Link href="/payment">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Delivery Info */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm">Free delivery on orders above ₹500</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-sm">Easy returns within 30 days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-sm">Secure payment options</span>
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

export default CartPage;