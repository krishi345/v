"use client";

import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";

// Import the products data
import { products } from "../products/page";

interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "cart" | "address" | "payment"
  >("cart");
  const [deliveryAddress, setDeliveryAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const [isAddressVerified, setIsAddressVerified] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Load customer details from localStorage if available
    const savedCustomerDetails = localStorage.getItem("customerDetails");
    if (savedCustomerDetails) {
      setCustomerDetails(JSON.parse(savedCustomerDetails));
    }

    // Load delivery address from localStorage if available
    const savedAddress = localStorage.getItem("deliveryAddress");
    if (savedAddress) {
      setDeliveryAddress(JSON.parse(savedAddress));
    }
  }, []);

  const updateQuantity = (productId: number, quantity: number) => {
    const newCart = {
      ...cart,
      [productId]: Math.max(0, quantity),
    };
    if (newCart[productId] === 0) {
      delete newCart[productId];
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const calculateSubtotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find((p) => p.id === parseInt(productId));
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const calculateDeliveryCharges = () => {
    const subtotal = calculateSubtotal();
    // Free delivery for orders above ₹500
    return subtotal >= 500 ? 0 : 40;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryCharges();
  };

  const verifyAddress = async () => {
    setIsLoading(true);
    try {
      // Here you would typically make an API call to verify the address
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, we'll do basic validation
      if (
        deliveryAddress.street.length > 0 &&
        deliveryAddress.city.length > 0 &&
        deliveryAddress.state.length > 0 &&
        /^[0-9]{6}$/.test(deliveryAddress.pincode)
      ) {
        setIsAddressVerified(true);
        localStorage.setItem(
          "deliveryAddress",
          JSON.stringify(deliveryAddress)
        );
        setCurrentStep("payment");
      } else {
        alert("Please fill all address fields correctly");
      }
    } catch (error) {
      console.error("Address verification failed:", error);
      alert("Failed to verify address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateBillPDF = () => {
    const doc = new jsPDF();
    const lineHeight = 10;
    let y = 20;

    // Add header
    doc.setFontSize(20);
    doc.text("KrishiMitra - Invoice", 20, y);
    y += lineHeight * 2;

    // Add customer details
    doc.setFontSize(12);
    doc.text(`Bill To:`, 20, y);
    y += lineHeight;
    doc.text(`${customerDetails.firstName} ${customerDetails.lastName}`, 20, y);
    y += lineHeight;
    doc.text(`${deliveryAddress.street}`, 20, y);
    y += lineHeight;
    doc.text(
      `${deliveryAddress.city}, ${deliveryAddress.state} - ${deliveryAddress.pincode}`,
      20,
      y
    );
    y += lineHeight * 2;

    // Add items
    doc.text("Items:", 20, y);
    y += lineHeight;
    Object.entries(cart).forEach(([productId, quantity]) => {
      const product = products.find((p) => p.id === parseInt(productId));
      if (product) {
        doc.text(
          `${product.name} × ${quantity} = ₹${product.price * quantity}`,
          20,
          y
        );
        y += lineHeight;
      }
    });

    // Add totals
    y += lineHeight;
    doc.text(`Subtotal: ₹${calculateSubtotal()}`, 20, y);
    y += lineHeight;
    doc.text(`Delivery Charges: ₹${calculateDeliveryCharges()}`, 20, y);
    y += lineHeight;
    doc.text(`Total: ₹${calculateTotal()}`, 20, y);

    // Save the PDF
    doc.save("KrishiMitra-Invoice.pdf");
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      // Here you would typically make an API call to process the order
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear cart
      setCart({});
      localStorage.removeItem("cart");
      setOrderSuccess(true);

      // Generate bill PDF
      generateBillPDF();

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push("/consumer/products");
      }, 2000);
    } catch (error) {
      console.error("Failed to place order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-green-50 rounded-lg p-8">
                <svg
                  className="w-16 h-16 text-green-500 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  Order Placed Successfully!
                </h2>
                <p className="text-green-700 mb-4">
                  Thank you for your order. Your fresh products will be
                  delivered soon.
                </p>
                <p className="text-green-700 mb-4">
                  Your invoice has been downloaded automatically.
                </p>
                <button
                  onClick={() => router.push("/consumer/products")}
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center ${
                    currentStep === "cart" ? "text-primary" : "text-gray-500"
                  }`}
                >
                  <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2">
                    1
                  </span>
                  Cart
                </div>
                <div className="w-16 h-0.5 bg-gray-300"></div>
                <div
                  className={`flex items-center ${
                    currentStep === "address" ? "text-primary" : "text-gray-500"
                  }`}
                >
                  <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2">
                    2
                  </span>
                  Address
                </div>
                <div className="w-16 h-0.5 bg-gray-300"></div>
                <div
                  className={`flex items-center ${
                    currentStep === "payment" ? "text-primary" : "text-gray-500"
                  }`}
                >
                  <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2">
                    3
                  </span>
                  Payment
                </div>
              </div>
            </div>

            {currentStep === "cart" && (
              <>
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                {Object.keys(cart).length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-600 mb-4">
                      Your cart is empty
                    </p>
                    <button
                      onClick={() => router.push("/consumer/products")}
                      className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      {Object.entries(cart).map(([productId, quantity]) => {
                        const product = products.find(
                          (p) => p.id === parseInt(productId)
                        );
                        if (!product) return null;

                        return (
                          <div
                            key={productId}
                            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm mb-4"
                          >
                            <div className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                onError={(e: any) => {
                                  e.target.style.display = "none";
                                  e.target.parentElement.innerHTML =
                                    '<div class="absolute inset-0 flex items-center justify-center"><span class="text-gray-500 text-sm">Image not available</span></div>';
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{product.name}</h3>
                              <p className="text-sm text-gray-600">
                                ₹{product.price}/{product.unit}
                              </p>
                              <div className="flex items-center mt-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(product.id, quantity - 1)
                                  }
                                  className="px-2 py-1 border rounded-l-md"
                                >
                                  -
                                </button>
                                <span className="px-4 py-1 border-t border-b">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(product.id, quantity + 1)
                                  }
                                  className="px-2 py-1 border rounded-r-md"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                ₹{product.price * quantity}
                              </p>
                              <button
                                onClick={() => updateQuantity(product.id, 0)}
                                className="text-red-500 text-sm mt-2"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="lg:col-span-1">
                      <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4">
                          Order Summary
                        </h2>
                        <div className="space-y-2 mb-4">
                          {Object.entries(cart).map(([productId, quantity]) => {
                            const product = products.find(
                              (p) => p.id === parseInt(productId)
                            );
                            if (!product) return null;

                            return (
                              <div
                                key={productId}
                                className="flex justify-between text-sm"
                              >
                                <span>
                                  {product.name} × {quantity}
                                </span>
                                <span>₹{product.price * quantity}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="border-t pt-4 mb-6">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Subtotal</span>
                            <span>₹{calculateSubtotal()}</span>
                          </div>
                          <div className="flex justify-between text-sm mb-4">
                            <span>Delivery Charges</span>
                            <span>₹{calculateDeliveryCharges()}</span>
                          </div>
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>₹{calculateTotal()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setCurrentStep("address")}
                          className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors"
                        >
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {currentStep === "address" && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={customerDetails.firstName}
                        onChange={(e) =>
                          setCustomerDetails({
                            ...customerDetails,
                            firstName: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={customerDetails.lastName}
                        onChange={(e) =>
                          setCustomerDetails({
                            ...customerDetails,
                            lastName: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={customerDetails.email}
                        onChange={(e) =>
                          setCustomerDetails({
                            ...customerDetails,
                            email: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={customerDetails.phone}
                        onChange={(e) =>
                          setCustomerDetails({
                            ...customerDetails,
                            phone: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.street}
                        onChange={(e) =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            street: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.city}
                        onChange={(e) =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            city: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        State
                      </label>
                      <select
                        value={deliveryAddress.state}
                        onChange={(e) =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            state: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                        required
                      >
                        <option value="">Select State</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        {/* Add more states as needed */}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.pincode}
                        onChange={(e) =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            pincode: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                        required
                        pattern="[0-9]{6}"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => setCurrentStep("cart")}
                      className="px-6 py-2 border rounded-md hover:bg-gray-50"
                    >
                      Back to Cart
                    </button>
                    <button
                      onClick={verifyAddress}
                      disabled={isLoading}
                      className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? "Verifying..." : "Continue to Payment"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === "payment" && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center p-4 border rounded-md">
                      <input
                        type="radio"
                        id="cod"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="mr-3"
                      />
                      <label htmlFor="cod" className="flex-1">
                        <span className="font-medium">Cash on Delivery</span>
                        <p className="text-sm text-gray-500">
                          Pay when your order arrives
                        </p>
                      </label>
                    </div>
                    <div className="flex items-center p-4 border rounded-md">
                      <input
                        type="radio"
                        id="online"
                        name="payment"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod("online")}
                        className="mr-3"
                      />
                      <label htmlFor="online" className="flex-1">
                        <span className="font-medium">Online Payment</span>
                        <p className="text-sm text-gray-500">
                          Pay securely with UPI, Card, or Net Banking
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Subtotal</span>
                      <span>₹{calculateSubtotal()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span>Delivery Charges</span>
                      <span>₹{calculateDeliveryCharges()}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep("address")}
                      className="px-6 py-2 border rounded-md hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isLoading}
                      className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {isLoading
                        ? "Processing..."
                        : `Place Order - ₹${calculateTotal()}`}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
