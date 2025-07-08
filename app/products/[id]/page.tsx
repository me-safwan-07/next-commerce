'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/product-card';
import { products, Product } from '@/lib/data';

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find(p => p.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Related products (same category, different product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of product ${product.id} to cart`);
  };

  const handleBuyNow = () => {
    console.log(`Buying ${quantity} of product ${product.id}`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg border">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-md border-2 overflow-hidden ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-lg font-semibold">{product.rating}</span>
                  <span className="ml-2 text-gray-500">({product.reviews} reviews)</span>
                </div>
                <Badge variant="secondary">{product.brand}</Badge>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="destructive">
                      {product.discount}% OFF
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="font-semibold mb-2">Key Features</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWishlist}
                  className={isWishlisted ? 'text-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">Free Delivery</p>
                      <p className="text-sm text-gray-600">
                        {product.fastDelivery ? 'Get it by tomorrow' : 'Usually delivered in 3-5 days'}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">30 Days Return Policy</p>
                      <p className="text-sm text-gray-600">Easy returns and exchanges</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">Warranty</p>
                      <p className="text-sm text-gray-600">1 year manufacturer warranty</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="font-semibold">{key}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold">{product.rating}</div>
                    <div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{product.reviews} reviews</p>
                    </div>
                  </div>
                  
                  {/* Sample Reviews */}
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-semibold">Excellent Product!</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Great quality and fast delivery. Highly recommended!
                      </p>
                      <p className="text-xs text-gray-500">By John D. on March 15, 2024</p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                        <span className="font-semibold">Good value for money</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Product is good but packaging could be better.
                      </p>
                      <p className="text-xs text-gray-500">By Sarah M. on March 10, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={(id) => console.log('Added to cart:', id)}
                  onAddToWishlist={(id) => console.log('Added to wishlist:', id)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;