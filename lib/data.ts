export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  images: string[];
  description: string;
  rating: number;
  reviews: number;
  brand: string;
  category: string;
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  stock: number;
  fastDelivery: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  productCount: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  joinedDate: string;
  avatar?: string;
  phone?: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: 'card' | 'upi' | 'cod';
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'smartphone',
    subcategories: ['Smartphones', 'Laptops', 'Headphones', 'Cameras', 'Tablets'],
    productCount: 156
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: 'shirt',
    subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Accessories'],
    productCount: 234
  },
  {
    id: 'home',
    name: 'Home & Kitchen',
    icon: 'home',
    subcategories: ['Furniture', 'Kitchen Appliances', 'Home Decor', 'Bedding'],
    productCount: 89
  },
  {
    id: 'books',
    name: 'Books',
    icon: 'book',
    subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Comics'],
    productCount: 67
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'dumbbell',
    subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Water Sports'],
    productCount: 45
  }
];

export const brands: Brand[] = [
  { id: 'apple', name: 'Apple', logo: '/brands/apple.png' },
  { id: 'samsung', name: 'Samsung', logo: '/brands/samsung.png' },
  { id: 'nike', name: 'Nike', logo: '/brands/nike.png' },
  { id: 'adidas', name: 'Adidas', logo: '/brands/adidas.png' },
  { id: 'sony', name: 'Sony', logo: '/brands/sony.png' },
  { id: 'lg', name: 'LG', logo: '/brands/lg.png' },
  { id: 'oneplus', name: 'OnePlus', logo: '/brands/oneplus.png' },
  { id: 'xiaomi', name: 'Xiaomi', logo: '/brands/xiaomi.png' }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 134900,
    originalPrice: 159900,
    discount: 16,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
    images: [
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
      'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg'
    ],
    description: 'The most advanced iPhone ever with titanium design, A17 Pro chip, and pro camera system.',
    rating: 4.6,
    reviews: 12453,
    brand: 'Apple',
    category: 'Electronics',
    features: ['A17 Pro Chip', '48MP Camera', '5G Ready', 'Face ID'],
    specifications: {
      'Display': '6.7-inch Super Retina XDR',
      'Storage': '256GB',
      'Battery': 'Up to 29 hours video playback',
      'Camera': '48MP Main, 12MP Ultra Wide, 12MP Telephoto'
    },
    inStock: true,
    stock: 25,
    fastDelivery: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 124999,
    originalPrice: 139999,
    discount: 11,
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
    images: [
      'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
      'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg'
    ],
    description: 'Galaxy AI is here. The most powerful Galaxy S series ever with advanced AI features.',
    rating: 4.5,
    reviews: 8967,
    brand: 'Samsung',
    category: 'Electronics',
    features: ['Galaxy AI', '200MP Camera', 'S Pen', '5G Ready'],
    specifications: {
      'Display': '6.8-inch Dynamic AMOLED 2X',
      'Storage': '256GB',
      'Battery': '5000mAh',
      'Camera': '200MP Main, 50MP Telephoto, 12MP Ultra Wide'
    },
    inStock: true,
    stock: 18,
    fastDelivery: true,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'MacBook Pro 14-inch M3',
    price: 169900,
    originalPrice: 199900,
    discount: 15,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    images: [
      'https://images.pexels.com/photos/18105/pexels-photo.jpg',
      'https://images.pexels.com/photos/56904/pexels-photo-56904.jpeg'
    ],
    description: 'Supercharged by M3 chip. Built for all the ways you work, play, and create.',
    rating: 4.8,
    reviews: 5432,
    brand: 'Apple',
    category: 'Electronics',
    features: ['M3 Chip', 'Liquid Retina XDR Display', 'Pro Camera System', 'All-Day Battery'],
    specifications: {
      'Display': '14.2-inch Liquid Retina XDR',
      'Storage': '512GB SSD',
      'Memory': '18GB Unified Memory',
      'Battery': 'Up to 22 hours'
    },
    inStock: true,
    stock: 12,
    fastDelivery: false,
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5 Headphones',
    price: 24990,
    originalPrice: 29990,
    discount: 17,
    image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg',
    images: [
      'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'
    ],
    description: 'Industry-leading noise cancellation with exceptional sound quality.',
    rating: 4.7,
    reviews: 3421,
    brand: 'Sony',
    category: 'Electronics',
    features: ['Active Noise Cancellation', 'Touch Control', 'Quick Charge', 'Multipoint Connection'],
    specifications: {
      'Battery Life': '30 hours',
      'Charging': 'USB-C Quick Charge',
      'Weight': '250g',
      'Connectivity': 'Bluetooth 5.2, NFC'
    },
    inStock: true,
    stock: 35,
    fastDelivery: true,
    createdAt: '2024-01-25'
  },
  {
    id: '5',
    name: 'Nike Air Max 270',
    price: 8495,
    originalPrice: 12995,
    discount: 35,
    image: 'https://images.pexels.com/photos/1230679/pexels-photo-1230679.jpeg',
    images: [
      'https://images.pexels.com/photos/1230679/pexels-photo-1230679.jpeg',
      'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg'
    ],
    description: 'Nike\'s biggest heel Air unit yet delivers exceptional comfort and style.',
    rating: 4.4,
    reviews: 2156,
    brand: 'Nike',
    category: 'Fashion',
    features: ['Air Max Technology', 'Breathable Mesh', 'Lightweight', 'Durable Outsole'],
    specifications: {
      'Upper': 'Mesh and synthetic leather',
      'Sole': 'Rubber with Air Max cushioning',
      'Weight': '310g (size 9)',
      'Closure': 'Lace-up'
    },
    inStock: true,
    stock: 42,
    fastDelivery: true,
    createdAt: '2024-01-18'
  },
  {
    id: '6',
    name: 'Adidas Ultraboost 22',
    price: 11999,
    originalPrice: 16999,
    discount: 29,
    image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg',
    images: [
      'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg',
      'https://images.pexels.com/photos/1230679/pexels-photo-1230679.jpeg'
    ],
    description: 'Made with Primeknit upper and responsive BOOST midsole for incredible energy return.',
    rating: 4.5,
    reviews: 1876,
    brand: 'Adidas',
    category: 'Fashion',
    features: ['BOOST Technology', 'Primeknit Upper', 'Continental Rubber', 'Torsion System'],
    specifications: {
      'Upper': 'Primeknit textile',
      'Sole': 'BOOST midsole with Continental rubber',
      'Weight': '320g (size 9)',
      'Drop': '10mm'
    },
    inStock: true,
    stock: 28,
    fastDelivery: true,
    createdAt: '2024-01-22'
  },
  {
    id: '7',
    name: 'OnePlus 12',
    price: 64999,
    originalPrice: 69999,
    discount: 7,
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    images: [
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'
    ],
    description: 'Flagship performance with Snapdragon 8 Gen 3 and 100W fast charging.',
    rating: 4.3,
    reviews: 2847,
    brand: 'OnePlus',
    category: 'Electronics',
    features: ['Snapdragon 8 Gen 3', '100W Fast Charging', '50MP Triple Camera', 'OxygenOS 14'],
    specifications: {
      'Display': '6.82-inch LTPO AMOLED',
      'Storage': '256GB',
      'RAM': '12GB',
      'Battery': '5400mAh'
    },
    inStock: true,
    stock: 22,
    fastDelivery: true,
    createdAt: '2024-01-28'
  },
  {
    id: '8',
    name: 'Xiaomi 14 Ultra',
    price: 89999,
    originalPrice: 99999,
    discount: 10,
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
    images: [
      'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
      'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg'
    ],
    description: 'Professional photography smartphone with Leica cameras and flagship performance.',
    rating: 4.6,
    reviews: 1923,
    brand: 'Xiaomi',
    category: 'Electronics',
    features: ['Leica Quad Camera', 'Snapdragon 8 Gen 3', '90W Charging', 'MIUI 15'],
    specifications: {
      'Display': '6.73-inch LTPO AMOLED',
      'Storage': '512GB',
      'RAM': '16GB',
      'Camera': '50MP Leica Quad Setup'
    },
    inStock: true,
    stock: 15,
    fastDelivery: false,
    createdAt: '2024-02-01'
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'user',
    joinedDate: '2023-06-15',
    phone: '+91 9876543210'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    joinedDate: '2023-08-22',
    phone: '+91 9876543211'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@shopkart.com',
    role: 'admin',
    joinedDate: '2023-01-01',
    phone: '+91 9876543212'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'user',
    joinedDate: '2023-09-10',
    phone: '+91 9876543213'
  }
];

export const orders: Order[] = [
  {
    id: 'ORD001',
    userId: '1',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    items: [
      {
        productId: '1',
        productName: 'iPhone 15 Pro Max',
        quantity: 1,
        price: 134900,
        image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'
      }
    ],
    total: 134900,
    status: 'delivered',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-18',
    address: {
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    paymentMethod: 'card'
  },
  {
    id: 'ORD002',
    userId: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    items: [
      {
        productId: '4',
        productName: 'Sony WH-1000XM5 Headphones',
        quantity: 1,
        price: 24990,
        image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg'
      },
      {
        productId: '5',
        productName: 'Nike Air Max 270',
        quantity: 2,
        price: 8495,
        image: 'https://images.pexels.com/photos/1230679/pexels-photo-1230679.jpeg'
      }
    ],
    total: 41980,
    status: 'shipped',
    orderDate: '2024-01-20',
    address: {
      street: '456 Park Avenue',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001'
    },
    paymentMethod: 'upi'
  },
  {
    id: 'ORD003',
    userId: '4',
    customerName: 'Sarah Wilson',
    customerEmail: 'sarah.wilson@example.com',
    items: [
      {
        productId: '3',
        productName: 'MacBook Pro 14-inch M3',
        quantity: 1,
        price: 169900,
        image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg'
      }
    ],
    total: 169900,
    status: 'confirmed',
    orderDate: '2024-01-25',
    address: {
      street: '789 Tech Park',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001'
    },
    paymentMethod: 'cod'
  },
  {
    id: 'ORD004',
    userId: '1',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    items: [
      {
        productId: '6',
        productName: 'Adidas Ultraboost 22',
        quantity: 1,
        price: 11999,
        image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg'
      }
    ],
    total: 11999,
    status: 'pending',
    orderDate: '2024-01-28',
    address: {
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    paymentMethod: 'upi'
  }
];

export const banners = [
  {
    id: 1,
    title: 'Big Billion Days Sale',
    subtitle: 'Up to 80% Off on Electronics',
    image: 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg',
    cta: 'Shop Now'
  },
  {
    id: 2,
    title: 'Fashion Week Special',
    subtitle: 'Trendy Clothing & Accessories',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
    cta: 'Explore'
  },
  {
    id: 3,
    title: 'Home Makeover Sale',
    subtitle: 'Transform Your Space',
    image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg',
    cta: 'Shop Home'
  }
];

// Mock analytics data
export const analyticsData = {
  totalSales: 2456789,
  totalOrders: 1234,
  activeUsers: 5678,
  inventoryCount: 891,
  monthlyRevenue: [
    { month: 'Jan', revenue: 245000 },
    { month: 'Feb', revenue: 289000 },
    { month: 'Mar', revenue: 312000 },
    { month: 'Apr', revenue: 278000 },
    { month: 'May', revenue: 356000 },
    { month: 'Jun', revenue: 398000 }
  ],
  salesByCategory: [
    { category: 'Electronics', sales: 45 },
    { category: 'Fashion', sales: 30 },
    { category: 'Home', sales: 15 },
    { category: 'Books', sales: 6 },
    { category: 'Sports', sales: 4 }
  ],
  topProducts: [
    { name: 'iPhone 15 Pro Max', sales: 234 },
    { name: 'Samsung Galaxy S24', sales: 189 },
    { name: 'MacBook Pro M3', sales: 156 },
    { name: 'Sony Headphones', sales: 134 },
    { name: 'Nike Air Max', sales: 98 }
  ]
};