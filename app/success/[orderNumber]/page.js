import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import Link from "next/link";

export default async function SuccessPage({ params }) {
  const { orderNumber } = await params;

  let order;
  try {
    order = await api.order(orderNumber);
  } catch {
    return (
      <>
        <Header />
        <p style={{ padding: 80, textAlign: "center", color: "red" }}>الطلب غير موجود.</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container" style={{ padding: "80px 16px", maxWidth: 580, textAlign: "center" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", background: "#dcfce7",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, margin: "0 auto",
        }}>✓</div>

        <h1 style={{ fontSize: 26, fontWeight: 800, marginTop: 20 }}>شكرًا لك، تم استلام طلبك!</h1>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>
          رقم الطلب: <strong style={{ color: "var(--ink)" }}>{order.order_number}</strong>
        </p>

        <div style={{ border: "1px solid var(--line)", borderRadius: 16, padding: 24, marginTop: 32, textAlign: "right" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 10 }}>
            <span style={{ color: "var(--muted)" }}>حالة الدفع</span>
            <span style={{ fontWeight: 700 }}>
              {order.payment_status === "paid" ? "✓ تم الدفع" :
               order.payment_method === "cod" ? "الدفع عند الاستلام" : "قيد المعالجة"}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 10 }}>
            <span style={{ color: "var(--muted)" }}>الإجمالي</span>
            <span style={{ fontWeight: 700 }}>{order.total?.toLocaleString()} ر.س</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
            <span style={{ color: "var(--muted)" }}>سيتم التواصل على</span>
            <span>{order.customer_phone}</span>
          </div>
        </div>

        <Link href="/products" className="btn-primary" style={{ display: "inline-flex", marginTop: 32 }}>
          متابعة التسوق
        </Link>
      </main>
      <Footer />
    </>
  );
}
