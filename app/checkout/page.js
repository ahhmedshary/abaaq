"use client";
import { useCart } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const input = {
  width: "100%", padding: "10px 14px", borderRadius: 8,
  border: "1px solid var(--line)", background: "var(--sand)",
  fontSize: 14, fontFamily: "inherit",
};

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const shipping = 25;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    customer_name: "", customer_email: "", customer_phone: "",
    shipping_address: "", city: "", payment_method: "stripe",
  });

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.checkout({
        ...form,
        items: items.map(i => ({ id: i.id, quantity: i.quantity })),
      });

      if (res.status === "stripe" && res.redirect) {
        window.location.href = res.redirect;
        return;
      }

      if (res.status === "success") {
        clear();
        router.push(`/success/${res.order_number}`);
        return;
      }

      setError(res.message || "حدث خطأ غير متوقع.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <p style={{ padding: 80, textAlign: "center", color: "var(--muted)" }}>
          سلتك فارغة. <a href="/products" style={{ color: "var(--maroon)" }}>تسوق الآن</a>
        </p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container" style={{ padding: "48px 16px" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 32 }}>إتمام الطلب</h1>

        {error && (
          <div style={{ background: "#fee2e2", border: "1px solid #f87171", borderRadius: 8, padding: "12px 16px", marginBottom: 24, color: "#b91c1c", fontSize: 14 }}>
            {error}
          </div>
        )}

        <form onSubmit={submit} style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "start" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ fontSize: 13, color: "var(--muted)", display: "block", marginBottom: 6 }}>الاسم الكامل</label>
                <input style={input} required value={form.customer_name} onChange={e => set("customer_name", e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: "var(--muted)", display: "block", marginBottom: 6 }}>رقم الجوال</label>
                <input style={input} required value={form.customer_phone} onChange={e => set("customer_phone", e.target.value)} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, color: "var(--muted)", display: "block", marginBottom: 6 }}>البريد الإلكتروني</label>
              <input type="email" style={input} required value={form.customer_email} onChange={e => set("customer_email", e.target.value)} />
            </div>

            <div>
              <label style={{ fontSize: 13, color: "var(--muted)", display: "block", marginBottom: 6 }}>العنوان</label>
              <textarea rows="3" style={{ ...input, resize: "none" }} required value={form.shipping_address} onChange={e => set("shipping_address", e.target.value)} />
            </div>

            <div>
              <label style={{ fontSize: 13, color: "var(--muted)", display: "block", marginBottom: 6 }}>المدينة</label>
              <input style={input} value={form.city} onChange={e => set("city", e.target.value)} />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 10 }}>طريقة الدفع</label>
              {[["stripe", "دفع إلكتروني (Stripe)"], ["cod", "الدفع عند الاستلام"]].map(([val, label]) => (
                <label key={val} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  border: "1px solid var(--line)", borderRadius: 8, padding: "12px 16px",
                  marginBottom: 8, cursor: "pointer",
                  borderColor: form.payment_method === val ? "var(--maroon)" : "var(--line)",
                }}>
                  <input type="radio" name="pm" value={val} checked={form.payment_method === val} onChange={() => set("payment_method", val)} />
                  <span style={{ fontSize: 14 }}>{label}</span>
                </label>
              ))}
            </div>

            <button type="submit" className="btn-primary" disabled={loading}
              style={{ padding: "14px 24px", fontSize: 15, opacity: loading ? .7 : 1 }}>
              {loading ? "جاري المعالجة..." : "تأكيد الطلب"}
            </button>
          </div>

          {/* summary */}
          <div style={{ border: "1px solid var(--line)", borderRadius: 16, padding: 24 }}>
            <h2 style={{ fontWeight: 700, marginBottom: 16 }}>ملخص الطلب</h2>
            {items.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 10 }}>
                <span style={{ color: "var(--muted)" }}>{item.name} × {item.quantity}</span>
                <span>{(item.price * item.quantity).toLocaleString()} ر.س</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--line)", marginTop: 12, paddingTop: 12, display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--muted)" }}>الشحن</span><span>{shipping} ر.س</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16 }}>
                <span>الإجمالي</span><span>{(subtotal + shipping).toLocaleString()} ر.س</span>
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
