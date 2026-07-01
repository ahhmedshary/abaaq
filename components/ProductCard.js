"use client";
import { useCart } from "@/lib/cart";
import Link from "next/link";

export default function ProductCard({ product }) {
  const { add } = useCart();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Link href={`/products/${product.slug}`} style={{ position: "relative", display: "block", aspectRatio: "1", borderRadius: 12, overflow: "hidden", background: "var(--sand)" }}>
        {product.image ? (
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", fontSize: 12 }}>
            {product.name}
          </div>
        )}
        {product.discount_percent && (
          <span className="badge-discount" style={{ position: "absolute", top: 8, right: 8 }}>
            خصم {product.discount_percent}%
          </span>
        )}
      </Link>

      <Link href={`/products/${product.slug}`} style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
        {product.name}
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "var(--maroon)", fontWeight: 700, fontSize: 14 }}>
          {product.price_formatted}
        </span>
        {product.compare_price_formatted && (
          <span style={{ color: "var(--muted)", fontSize: 12, textDecoration: "line-through" }}>
            {product.compare_price_formatted}
          </span>
        )}
      </div>

      <button
        className="btn-primary"
        style={{ fontSize: 12, padding: "8px 12px", borderRadius: 8 }}
        onClick={() => add(product)}
      >
        أضف للسلة
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
