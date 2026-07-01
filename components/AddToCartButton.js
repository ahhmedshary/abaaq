"use client";
import { useCart } from "@/lib/cart";
import { useState } from "react";

export default function AddToCartButton({ product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handle() {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div style={{ marginTop: 28, display: "flex", gap: 12, alignItems: "center" }}>
      <input type="number" min="1" value={qty} onChange={e => setQty(Math.max(1, +e.target.value))}
        style={{
          width: 64, padding: "10px 12px", borderRadius: 8, border: "1px solid var(--line)",
          textAlign: "center", background: "var(--sand)", fontSize: 15,
        }}
      />
      <button className="btn-primary" onClick={handle} style={{ flex: 1, padding: "12px 24px" }}>
        {added ? "✓ تمت الإضافة" : "أضف للسلة"}
      </button>
    </div>
  );
}
