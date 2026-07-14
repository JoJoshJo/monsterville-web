"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2, X, ChevronRight, Sparkles } from "lucide-react";
import { EASE } from "@/lib/motion";

interface Product {
  id: string;
  name: string;
  category: "beats" | "kits" | "merch" | "plugins";
  price: number;
  image: string;
  description: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function Shop() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const products: Product[] = [
    {
      id: "beat-lease-leopard",
      name: "Leopard Signature Beat Lease",
      category: "beats",
      price: 299,
      image: "/images/Bobino-Beats-Signature-Leopard.png",
      description: "Unlimited WAV lease with stems. Textured low-end sub-bass with vintage A24 grain soundscapes.",
    },
    {
      id: "drum-kit-tiger",
      name: "Tiger Hardware Drum Kit",
      category: "kits",
      price: 49,
      image: "/images/Bobino-Beats-Signature-Tiger.png",
      description: "60+ recorded analog snaps, heavy kicks, and modular percussion loops processed through high-end outboard compressors.",
    },
    {
      id: "merch-hoodie",
      name: "Town Cinematic Merch Hoodie",
      category: "merch",
      price: 85,
      image: "/images/SHIRT.jpg",
      description: "Heavyweight 450gsm luxury cotton hoodie. Features double-lined hood and minimalist embroidered branding.",
    },
    {
      id: "plugin-limiter",
      name: "Town Analog Limiter Plugin",
      category: "plugins",
      price: 149,
      image: "/images/Bobino-Beats-Signature-OR-PNG.png",
      description: "VST/AU vintage tube saturator. Recreates the exact tube compression harmonics from our main SSL room console.",
    },
  ];

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  return (
    <section className="relative w-full min-h-dvh py-32 px-6 md:px-12 bg-[#0c0c0c] flex items-center justify-center">
      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col gap-16">
        
        {/* Header and Cart Trigger */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-left">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full" />
              <span className="text-[10px] tracking-[0.3em] font-mono text-[#EDEDED]/50 uppercase">
                06 / BOUTIQUE & DIGITAL MERCH
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-[#F5F5F5]">
              TOWN <span className="font-editorial italic font-normal text-[#FF5A1F]">boutique</span>
            </h2>
          </div>

          <div className="flex gap-4 items-center">
            {/* Category Selectors */}
            <div className="flex flex-wrap gap-2">
              {["all", "beats", "kits", "merch", "plugins"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-full border text-[10px] font-mono tracking-widest uppercase transition-all ${
                    activeCategory === cat
                      ? "bg-white text-black border-white"
                      : "bg-white/[0.01] border-white/[0.05] text-[#EDEDED]/50 hover:bg-white/[0.03] hover:border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-5 py-3 glass hover:border-[#FF5A1F] hover:bg-[#FF5A1F]/5 text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all"
            >
              <ShoppingCart className="w-4 h-4 text-[#FF5A1F]" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="bg-[#FF5A1F] text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="glass rounded-xl overflow-hidden flex flex-col group transition-all duration-300 hover:border-white/10"
            >
              {/* Product Visual */}
              <div className="w-full aspect-square bg-[#080808] overflow-hidden relative border-b border-white/5">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Price tag */}
                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-white/5 font-mono text-xs font-bold text-white">
                  ${p.price}
                </div>
              </div>

              {/* Info & Add Action */}
              <div className="p-6 flex flex-col gap-4 flex-1 justify-between bg-white/[0.01]">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-mono tracking-widest text-[#FF5A1F] uppercase">{p.category}</span>
                  <h3 className="text-base font-bold text-white tracking-tight leading-snug">{p.name}</h3>
                  <p className="text-xs text-white/50 leading-relaxed font-sans mt-1">{p.description}</p>
                </div>

                <button
                  onClick={() => addToCart(p)}
                  className="w-full py-3 bg-white/[0.02] border border-white/5 hover:bg-[#FF5A1F] hover:border-[#FF5A1F] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 group-hover:bg-white/[0.04]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add To Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sliding Cart Drawer Overlay */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-[#080808] z-[9999]"
              />

              {/* Cart Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.45, ease: EASE }}
                className="fixed top-0 right-0 h-screen w-full sm:w-[480px] bg-[#0c0c0c] border-l border-white/5 z-[99999] shadow-2xl p-6 md:p-8 flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <div className="flex items-center gap-2.5">
                    <ShoppingCart className="w-4 h-4 text-[#FF5A1F]" />
                    <h3 className="text-lg font-bold tracking-tight text-white font-display uppercase">SHOPPING BAG</h3>
                    <span className="text-[10px] font-mono text-white/30 uppercase">({totalItems} items)</span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    aria-label="Close cart"
                    className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/5 hover:bg-white/[0.1] transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Item List */}
                <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
                      <ShoppingCart className="w-8 h-8 text-white/10" />
                      <p className="text-xs uppercase tracking-wider text-white/40">Your bag is empty.</p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-white uppercase tracking-wider hover:bg-white/10"
                      >
                        Keep Browsing
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex gap-4 items-center justify-between"
                      >
                        {/* Img */}
                        <div className="relative w-16 h-16 rounded overflow-hidden bg-black flex-none border border-white/5">
                          <Image src={item.product.image} alt={item.product.name} fill sizes="64px" className="object-cover" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 text-left">
                          <h4 className="text-xs font-semibold text-white truncate uppercase tracking-wider">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] font-mono text-[#FF5A1F] block mt-0.5">${item.product.price}</span>
                          
                          {/* Qty Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              aria-label={`Decrease quantity of ${item.product.name}`}
                              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white"
                            >
                              <Minus className="w-3 h-3" aria-hidden="true" />
                            </button>
                            <span className="text-xs font-mono font-bold text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              aria-label={`Increase quantity of ${item.product.name}`}
                              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white"
                            >
                              <Plus className="w-3 h-3" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        {/* Trash */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label={`Remove ${item.product.name} from cart`}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Subtotal & Checkout */}
                {cart.length > 0 && (
                  <div className="border-t border-white/5 pt-6 flex flex-col gap-6">
                    <div className="flex justify-between items-end">
                      <div className="text-left">
                        <span className="text-[10px] font-mono text-white/30 uppercase block">Subtotal</span>
                        <span className="text-xs text-white/60">Shipping & taxes calculated at checkout.</span>
                      </div>
                      <span className="text-3xl font-extrabold text-white font-display">${getSubtotal()}</span>
                    </div>

                    <button
                      onClick={() => alert("Checkout integration mockup! Thank you for testing Town Boutique.")}
                      className="w-full py-4 bg-[#FF5A1F] hover:bg-white hover:text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,90,31,0.2)]"
                    >
                      <Sparkles className="w-4 h-4 fill-current" />
                      <span>Proceed to Checkout</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
