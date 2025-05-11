// Mock API service for demo purposes
// In a real application, this would be replaced with actual API calls

// Sample product data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    description: "Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation and 30-hour battery life.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    stockCount: 15,
    isNew: true,
    freeShipping: true
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    originalPrice: 349.99,
    description: "Stay connected and track your fitness with our latest smartwatch. Features heart rate monitoring, GPS, and water resistance.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    rating: 4.5,
    reviews: 89,
    inStock: true,
    stockCount: 8,
    isHot: true
  },
  {
    id: 3,
    name: "Designer Leather Handbag",
    price: 129.99,
    originalPrice: 159.99,
    description: "Elevate your style with our designer leather handbag. Spacious interior with multiple compartments and premium craftsmanship.",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    rating: 4.7,
    reviews: 56,
    inStock: true,
    stockCount: 12,
    freeShipping: true,
    tag: "Best Seller"
  },
  {
    id: 4,
    name: "Ultra HD 4K Smart TV",
    price: 799.99,
    originalPrice: 999.99,
    description: "Transform your home entertainment with our Ultra HD 4K Smart TV. Features vibrant colors, smart connectivity, and slim design.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    rating: 4.6,
    reviews: 78,
    inStock: true,
    stockCount: 5,
    discount: "Limited Offer"
  },
  {
    id: 5,
    name: "Premium Coffee Maker",
    price: 89.99,
    originalPrice: 119.99,
    description: "Start your day right with our premium coffee maker. Features programmable settings, thermal carafe, and sleek design.",
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1570286424230-5959d91e1385?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    images: [
      "https://images.unsplash.com/photo-1570286424230-5959d91e1385?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1572119865084-43c285814d63?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    rating: 4.4,
    reviews: 45,
    inStock: true,
    stockCount: 20,
    isNew: true
  },
  {
    id: 6,
    name: "Wireless Bluetooth Speaker",
    price: 79.99,
    originalPrice: 99.99,
    description: "Take your music anywhere with our wireless Bluetooth speaker. Features 360° sound, water resistance, and 12-hour battery life.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    images: [
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1558537348-c0f8e733989d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    rating: 4.3,
    reviews: 67,
    inStock: true,
    stockCount: 18,
    freeShipping: true
  },
  {
    id: 7,
    name: "Men's Casual Sneakers",
    price: 59.99,
    originalPrice: 79.99,
    description: "Step out in style with our men's casual sneakers. Features comfortable cushioning, breathable material, and versatile design.",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    rating: 4.2,
    reviews: 34,
    inStock: true,
    stockCount: 25,
    isHot: true
  },
  {
    id: 8,
    name: "Professional DSLR Camera",
    price: 1299.99,
    originalPrice: 1499.99,
    description: "Capture life's moments with our professional DSLR camera. Features high-resolution sensor, 4K video recording, and versatile lens compatibility.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    rating: 4.9,
    reviews: 112,
    inStock: true,
    stockCount: 3,
    tag: "Premium"
  }
];

// Sample category data
const categories = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Latest gadgets and electronic devices"
  },
  {
    id: "fashion",
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Trendy clothing and accessories"
  },
  {
    id: "home-living",
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Furniture and home decor"
  },
  {
    id: "beauty-health",
    name: "Beauty & Health",
    image: "skincare.png",
    description: "Skincare, makeup, and wellness products"
  },
  {
    id: "sports-outdoors",
    name: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Sports equipment and outdoor gear"
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const fetchProducts = async () => {
  await delay(800); // Simulate network delay
  return products;
};

export const fetchFeaturedProducts = async () => {
  await delay(800); // Simulate network delay
  return products;
};

export const fetchProductById = async (id) => {
  await delay(500);
  const product = products.find(p => p.id === parseInt(id));
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

export const fetchCategories = async () => {
  await delay(600);
  return categories;
};

export const fetchProductsByCategory = async (categoryId) => {
  await delay(700);
  return products.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === categoryId);
};

export const searchProducts = async (query) => {
  await delay(500);
  const lowercaseQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) || 
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Mock user authentication
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  }
];

export const login = async (email, password) => {
  await delay(800);
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const { password: _, ...userWithoutPassword } = user;
  return { ...userWithoutPassword, token: 'mock-jwt-token' };
};

export const register = async (userData) => {
  await delay(1000);
  const existingUser = users.find(u => u.email === userData.email);
  if (existingUser) {
    throw new Error('Email already in use');
  }
  const newUser = {
    id: users.length + 1,
    ...userData,
    avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
  };
  users.push(newUser);
  const { password: _, ...userWithoutPassword } = newUser;
  return { ...userWithoutPassword, token: 'mock-jwt-token' };
};

// Mock order data
const orders = [
  {
    id: 'ORD-12345',
    date: '2023-06-15',
    total: 329.98,
    status: 'Delivered',
    items: [
      { productId: 1, quantity: 1, price: 199.99 },
      { productId: 6, quantity: 1, price: 79.99 },
      { productId: 3, quantity: 1, price: 129.99 }
    ]
  }
];

export const fetchOrders = async (userId) => {
  await delay(700);
  return orders;
};

export const fetchOrderById = async (orderId) => {
  await delay(500);
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    throw new Error('Order not found');
  }
  
  // Enhance order with product details
  const orderWithProducts = {
    ...order,
    items: await Promise.all(order.items.map(async item => {
      const product = await fetchProductById(item.productId);
      return {
        ...item,
        product
      };
    }))
  };
  
  return orderWithProducts;
};

export const createOrder = async (orderData) => {
  await delay(1000);
  const newOrder = {
    id: `ORD-${Math.floor(Math.random() * 90000) + 10000}`,
    date: new Date().toISOString().split('T')[0],
    status: 'Processing',
    ...orderData
  };
  orders.push(newOrder);
  return newOrder;
};