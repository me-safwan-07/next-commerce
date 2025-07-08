'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { products } from '@/lib/data';

const WishlistPage = () => {
  // Mock wishlist items (in real app, this would come from context/state management)
  const [wishlistItems, setWishlistItems] = useState(products.slice(0, 6));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== productId));
  };

  const addToCart = (productId: string) => {
    console.log('Added to cart:', productId);
    // Handle add to cart functionality
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <Heart className="mx-auto h-24 w-24 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save items you love to your wishlist!</p>
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <div className="text-gray-600">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4">
                {/* Product Image */}
                <div className="aspect-square relative mb-4 overflow-hidden rounded-md">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </Link>
                  
                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute top-2 left-2"
                    >
                      {product.discount}% OFF
                    </Badge>
                  )}
                  
                  {/* Remove from Wishlist */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-sm hover:text-blue-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-xs text-gray-600">{product.brand}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium ml-1">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  {/* Fast Delivery Badge */}
                  {product.fastDelivery && (
                    <Badge variant="secondary" className="text-xs">
                      Fast Delivery
                    </Badge>
                  )}
                  
                  {/* Stock Status */}
                  {!product.inStock && (
                    <Badge variant="destructive" className="text-xs">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 space-y-2">
                  <Button
                    className="w-full"
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  
                  <Link href={`/products/${product.id}`}>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;