'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Truck, Shield, Headphones, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BannerCarousel from '@/components/ui/banner-carousel';
import ProductCard from '@/components/ui/product-card';
import { products, categories, brands } from '@/lib/data';

const HomePage = () => {
  const featuredProducts = products.slice(0, 4);
  const dealProducts = products.filter(p => p.discount > 20);
  const trendingProducts = products.filter(p => p.rating >= 4.5);

  const handleAddToCart = (productId: string) => {
    // Implement add to cart functionality
    console.log('Added to cart:', productId);
  };

  const handleAddToWishlist = (productId: string) => {
    // Implement add to wishlist functionality
    console.log('Added to wishlist:', productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section with Carousel */}
        <section className="container mx-auto px-4 py-6">
          <BannerCarousel />
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group"
              >
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <span className="text-2xl">📱</span>
                    </div>
                    <h3 className="font-semibold text-sm group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link href="/products">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
        </section>

        {/* Today's Deals */}
        <section className="bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Today's Deals</h2>
              <Badge variant="destructive" className="text-sm">
                Limited Time
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dealProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Trending Now */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Trending Now</h2>
            <Link href="/products">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
        </section>

        {/* Top Brands */}
        <section className="bg-white py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Top Brands</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {brands.map((brand) => (
                <Card key={brand.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-4 text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold">{brand.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-semibold text-sm">{brand.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over ₹500</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">Secure Payment</h3>
                <p className="text-sm text-gray-600">100% secure transactions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Headphones className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-gray-600">Customer support anytime</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CreditCard className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;