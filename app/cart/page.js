"use client";
import { useCart } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CartPage() {
  const { items, update, remove, subtotal, ready } = useCart();
  const shipping = 25;

  if (!ready) return <><Header /><p style={{ padding: 80, textAlign: "center" }}>...</p><Footer /></>;

  return (
    <>
      <Header />
      <main className="container" style={{ padding: "48px 16px" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 32 }}>سلة المشتريات</h1>

        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ color: "var(--muted)", marginBottom: 24 }}>سلتك فارغة حاليًا.</p>
            <Link href="/products" className="btn-primary">تسوق الآن</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "start" }}>

            {/* items */}
            <div style={{ border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden" }}>
              {items.map((item, i) => (
                <div key={item.id} style={{
                  display: "flex", alignItems: "center", gap: 16, padding: 16,
                  borderTop: i > 0 ? "1px solid var(--line)" : "none",
                }}>
                  <div style={{ width: 64, height: 64, borderRadius: 8, background: "var(--sand)", overflow: "hidden", flexShrink: 0 }}>
                    {item.image && <img src={item.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</p>
                    <p style={{ color: "var(--maroon)", fontWeight: 700, fontSize: 14, marginTop: 4 }}>
                      {item.price.toLocaleString()} ر.س
                    </p>
                  </div>
                  <input type="number" min="1" value={item.quantity}
                    onChange={e => update(item.id, +e.target.value)}
                    style={{ width: 56, padding: "6px 8px", borderRadius: 8, border: "1px solid var(--line)", background: "var(--sand)", textAlign: "center" }}
                  />
                  <span style={{ fontWeight: 700, width: 80, textAlign: "left" }}>
                    {(item.price * item.quantity).toLocaleString()} ر.س
                  </span>
                  <button onClick={() => remove(item.id)} style={{ color: "var(--muted)", fontSize: 13 }}>حذف</button>
                </div>
              ))}
            </div>

            {/* summary */}
            <div style={{ border: "1px solid var(--line)", borderRadius: 16, padding: 24 }}>
              <h2 style={{ fontWeight: 700, marginBottom: 20 }}>ملخص الطلب</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--muted)" }}>الإجمالي الفرعي</span>
                  <span>{subtotal.toLocaleString()} ر.س</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--muted)" }}>الشحن</span>
                  <span>{shipping} ر.س</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, borderTop: "1px solid var(--line)", paddingTop: 12, marginTop: 4 }}>
                  <span>الإجمالي</span>
                  <span>{(subtotal + shipping).toLocaleString()} ر.س</span>
                </div>
              </div>
              <Link href="/checkout" className="btn-primary" style={{ display: "flex", marginTop: 24, justifyContent: "center" }}>
                إتمام الطلب
              </Link>
              <Link href="/products" style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 13, color: "var(--maroon)" }}>
                متابعة التسوق
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
