"use client";
import { useCart } from "@/lib/cart";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* top bar */}
      <div style={{ background: "var(--maroon)", color: "#fff", fontSize: 12, padding: "6px 16px", textAlign: "center" }}>
        عروض جديدة ومخفضات تصل الى 40% — توصيل سريع لجميع المناطق
      </div>

      {/* main header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(250,246,240,0.95)" : "var(--cream)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: "1px solid var(--line)",
        transition: "all .3s",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link href="/" style={{ fontSize: 22, fontWeight: 800, color: "var(--maroon)" }}>
            عبق الشرق
          </Link>

          <nav style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 500 }}>
            <Link href="/" style={{ color: "var(--ink)" }}>الرئيسية</Link>
            <Link href="/products" style={{ color: "var(--ink)" }}>المنتجات</Link>
            <Link href="/products?category=عروض" style={{ color: "var(--ink)" }}>العروض</Link>
          </nav>

          <Link href="/cart" style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6c-.4.8.2 1.4 1 1.4H17M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            {count > 0 && (
              <span style={{
                position: "absolute", top: -8, left: -8,
                background: "var(--maroon)", color: "#fff",
                fontSize: 10, width: 18, height: 18, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{count}</span>
            )}
          </Link>
        </div>
      </header>
    </>
  );
}
