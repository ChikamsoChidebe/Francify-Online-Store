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
    image: "https://tse2.mm.bing.net/th/id/OIP.Dc54pk2DQ55ZnMLAS_v4dQHaI0?rs=1&pid=ImgDetMain",
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
  },
  {
  id: 9,
  name: "Yoga Mat with Alignment Lines",
  price: 39.99,
  originalPrice: 49.99,
  description: "Eco-friendly yoga mat with alignment lines for improved posture. Non-slip surface and 6mm cushioning.",
  category: "Sports & Outdoors",
  image: "https://tse2.mm.bing.net/th/id/OIP.8ntmtEaGR_LPby84rghRPwHaHT?rs=1&pid=ImgDetMain",
  images: [
    "https://images.unsplash.com/photo-1599058917212-d750089bc9b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1600673081143-bfbb9c1d63ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ],
  rating: 4.5,
  reviews: 92,
  inStock: true,
  stockCount: 30,
  isNew: true,
  freeShipping: true
},
{
  id: 10,
  name: "Organic Skincare Set",
  price: 59.99,
  originalPrice: 74.99,
  description: "Natural and cruelty-free skincare set including cleanser, toner, and moisturizer. Suitable for all skin types.",
  category: "Beauty & Health",
  image: "https://i.pinimg.com/736x/49/7d/0e/497d0ec25d12c40255b746b1b6c09ee3.jpg",
  images: [
    "https://images.unsplash.com/photo-1600180758890-6e1d119d9b5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1611078489935-07d2fa6f53db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ],
  rating: 4.6,
  reviews: 47,
  inStock: true,
  stockCount: 14,
  tag: "Eco-Friendly"
},
{
  id: 11,
  name: "Modern Floor Lamp",
  price: 149.99,
  originalPrice: 189.99,
  description: "Sleek modern floor lamp with adjustable brightness and smart control. Perfect for living rooms and offices.",
  category: "Home & Living",
  image: "https://tse4.mm.bing.net/th/id/OIP.R7u4-h1yruGbsWEYIujDYAHaHa?rs=1&pid=ImgDetMain",
  images: [
    "https://images.unsplash.com/photo-1616627982872-f5a9a451bde3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1616627169119-421c680965a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ],
  rating: 4.4,
  reviews: 22,
  inStock: true,
  stockCount: 9
},
{
  id: 12,
  name: "Women's Winter Coat",
  price: 119.99,
  originalPrice: 159.99,
  description: "Stylish and warm winter coat with faux fur hood and water-resistant fabric. Perfect for cold weather.",
  category: "Fashion",
  image: "https://tse1.mm.bing.net/th/id/OIP.HfyAupt4iHlUi_tqYldVOgHaJ4?rs=1&pid=ImgDetMain",
  images: [
    "https://images.unsplash.com/photo-1602810316496-c2da5ee65a5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1604022603433-264fda998016?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ],
  rating: 4.7,
  reviews: 38,
  inStock: true,
  stockCount: 11,
  isHot: true
},
{
  id: 13,
  name: "Pet Bed for Small Dogs",
  price: 34.99,
  originalPrice: 44.99,
  description: "Cozy and washable pet bed designed for small dogs and cats. Soft fleece material and non-slip bottom.",
  category: "Home & Living",
  image: "https://tse2.mm.bing.net/th/id/OIP.nFJyBMs_H4egflqMW6MLYAHaGW?rs=1&pid=ImgDetMain",
  images: [
    "https://images.unsplash.com/photo-1601758064222-6c8c7c273496?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1583337130417-3346a1d3c24c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ],
  rating: 4.8,
  reviews: 51,
  inStock: true,
  stockCount: 17,
  tag: "Pet Friendly"
},
{
  id: 14,
  name: "Minimalist Wooden Desk",
  price: 229.99,
  originalPrice: 279.99,
  description: "A minimalist oak desk perfect for home offices, featuring cable management and a sleek matte finish.",
  category: "Home & Living",
  image: "https://tse2.mm.bing.net/th/id/OIP.c5ZdDf4J8F6aC3JsFyBjQQHaHa?rs=1&pid=ImgDetMain",
  images: [
    "https://images.unsplash.com/photo-1587502536263-9298e8b9893c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  ],
  rating: 4.5,
  reviews: 64,
  inStock: true,
  stockCount: 8
},
{
  id: 15,
  name: "Vintage Polaroid Camera",
  price: 129.99,
  originalPrice: 149.99,
  description: "Capture retro-style instant photos with this refurbished Polaroid camera. Great for hobbyists and collectors.",
  category: "Electronics",
  image: "https://i.pinimg.com/474x/1c/ab/ac/1cabacc92eed79a75da8531706bb4f18--vintage-polaroid-camera-polaroid-cameras.jpg",
  images: [
    "https://images.unsplash.com/photo-1590642915559-0c3d50f2f31d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1584098999266-f0b38c56b545?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  ],
  rating: 4.2,
  reviews: 35,
  inStock: true,
  stockCount: 12
},
{
  id: 16,
  name: "Premium Chef's Knife",
  price: 79.99,
  originalPrice: 99.99,
  description: "Forged steel chef's knife with ergonomic handle. Razor-sharp and durable—ideal for professional kitchens.",
  category: "Home & Living",
  image: "https://tse4.mm.bing.net/th/id/OIP.PdBmq7P9FP3qXugYlz3ZxwHaHa?rs=1&pid=ImgDetMain",
  images: [
    "https://images.unsplash.com/photo-1574502075818-296b0a5d1b03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  ],
  rating: 4.9,
  reviews: 110,
  inStock: true,
  stockCount: 22,
  tag: "Best Seller"
},
{
  id: 17,
  name: "Wireless Noise-Cancelling Headphones",
  price: 199.99,
  originalPrice: 249.99,
  description: "High-fidelity over-ear headphones with active noise canceling, 30-hour battery, and quick charge.",
  category: "Electronics",
  image: "https://tse1.mm.bing.net/th/id/OIP.q4SaBhExMj8OILSnCWSMeQHaHa?rs=1&pid=ImgDetMain",
  images: [
    "https://images.unsplash.com/photo-1610440042759-91f55eb9c3d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1610440202055-59b4c5a5efb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  ],
  rating: 4.7,
  reviews: 98,
  inStock: true,
  stockCount: 18
},
{
  id: 18,
  name: "Men's Leather Watch",
  price: 149.00,
  originalPrice: 189.00,
  description: "Elegant analog leather watch with sapphire glass and water resistance. Classic design for daily wear.",
  category: "Fashion",
  image: "https://tse2.mm.bing.net/th/id/OIP.VN9YjFSrnrBozQGPobA0YAHaLH?rs=1&pid=ImgDetMain",
  images: [
    "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1600180758437-0cf2d66f7ee3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  ],
  rating: 4.6,
  reviews: 76,
  inStock: true,
  stockCount: 14,
  tag: "Luxury"
},
{
  id: 19,
  name: "Hardcover Journal Notebook",
  price: 17.99,
  originalPrice: 21.99,
  description: "A premium leather-bound notebook with thick, lined pages. Ideal for journaling, note-taking, or sketching.",
  category: "Books",
  image: "https://tse4.mm.bing.net/th/id/OIP.5AuXY3lz00Ibnz-JVMg1ZAHaJ3?rs=1&pid=ImgDetMain",
  images: [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  ],
  rating: 4.8,
  reviews: 48,
  inStock: true,
  stockCount: 25,
  tag: "Stationery"
},
{
  id: 20,
  name: "Wooden Stacking Toy Set",
  price: 24.99,
  originalPrice: 29.99,
  description: "Colorful handmade stacking toy made from non-toxic wood. Helps toddlers develop coordination and motor skills.",
  category: "Toys",
  image: "https://tse1.explicit.bing.net/th/id/OIP.J1ADfraif70nJ_-2SbHVpwHaGD?rs=1&pid=ImgDetMain",
  images: [
    "https://images.unsplash.com/photo-1615484477641-61b09a370b97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1576698484254-2cc12d3f90b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  ],
  rating: 4.9,
  reviews: 33,
  inStock: true,
  stockCount: 16,
  tag: "Eco Friendly"
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