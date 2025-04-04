"use client";

import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductImage from "../../components/ProductImage";

// Sample product data (in a real app, this would come from an API/database)
export const products = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 40,
    unit: "kg",
    description:
      "Premium quality, vine-ripened red tomatoes. Fresh, juicy, and perfect for daily cooking.",
    stock: 100,
  },
  {
    id: 2,
    name: "Premium Basmati Rice",
    image: "https://images.pexels.com/photos/2686809/pexels-photo-2686809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 75,
    unit: "kg",
    description:
      "High-quality basmati rice with long grains, aromatic flavor, and perfect texture when cooked.",
    stock: 500,
  },
  {
    id: 3,
    name: "Fresh Green Chilies",
    image: "https://images.pexels.com/photos/4110456/pexels-photo-4110456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 30,
    unit: "250g",
    description:
      "Farm-fresh green chilies with the perfect balance of heat and flavor. Ideal for all Indian dishes.",
    stock: 50,
  },
  {
    id: 4,
    name: "Farm-Fresh Potatoes",
    image: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 25,
    unit: "kg",
    description:
      "Premium quality potatoes, freshly harvested. Clean, uniform size, and perfect for all cooking needs.",
    stock: 200,
  },
  {
    id: 5,
    name: "Fresh Red Onions",
    image: "https://images.pexels.com/photos/135529/pexels-photo-135529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 35,
    unit: "kg",
    description:
      "Crisp red onions, essential for salads, curries, and various culinary uses.",
    stock: 150,
  },
  {
    id: 6,
    name: "Ripe Bananas",
    image: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 50,
    unit: "dozen",
    description:
      "Naturally ripened bananas, perfect for a quick energy boost or adding to smoothies.",
    stock: 80,
  },
  {
    id: 7,
    name: "Crisp Apples",
    image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 120,
    unit: "kg",
    description:
      "Sweet and crunchy apples, great for snacking or baking.",
    stock: 90,
  },
];

export default function ProductsPage() {
  const router = useRouter();
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [notification, setNotification] = useState<{
    message: string;
    visible: boolean;
  }>({
    message: "",
    visible: false,
  });

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (productId: number, quantity: number) => {
    const newCart = {
      ...cart,
      [productId]: (cart[productId] || 0) + quantity,
    };
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));

    // Show notification
    const product = products.find((p) => p.id === productId);
    if (product) {
      setNotification({
        message: `Added ${quantity} ${product.unit} of ${product.name}`,
        visible: true,
      });
      // Hide notification after 2 seconds
      setTimeout(() => {
        setNotification({ message: "", visible: false });
      }, 2000);
    }
  };

  const goToCart = () => {
    router.push("/consumer/cart");
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Welcome Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary/90 to-primary">
        {/* <Image
          src="/store-banner.jpg"
          alt="Fresh Agricultural Products"
          fill
          className="object-cover mix-blend-overlay"
          priority
        /> */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to KrishiMitra Store
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Fresh from Farm to Your Table - Quality Agricultural Products at
              Your Doorstep
            </p>
            <div className="grid grid-cols-3 gap-8 text-white">
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold">Quality Assured</h3>
                <p className="text-sm text-white/80">Premium Products</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-white/80">Within 24 Hours</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold">Best Prices</h3>
                <p className="text-sm text-white/80">Direct from Farmers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Notification */}
          {notification.visible && (
            <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg transition-all duration-300 z-50">
              {notification.message}
            </div>
          )}

          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Our Products</h2>
              <p className="text-gray-600 mt-2">
                Fresh agricultural products sourced directly from farmers
              </p>
            </div>
            <button
              onClick={goToCart}
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span>
                Cart ({Object.values(cart).reduce((a, b) => a + b, 0)} items)
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 bg-gray-100">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority={product.id <= 4}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <span className="text-primary font-bold">
                      ₹{product.price}/{product.unit}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <select
                      className="block w-24 px-3 py-2 bg-background border border-gray-300 rounded-md text-sm"
                      onChange={(e) =>
                        addToCart(product.id, parseInt(e.target.value))
                      }
                      defaultValue="1"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} {product.unit}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => addToCart(product.id, 1)}
                      className="flex-1 bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
