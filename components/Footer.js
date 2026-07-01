import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "var(--maroon)", color: "#fff", marginTop: 80 }}>
      <div className="container" style={{ padding: "56px 16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 40 }}>
        <div>
          <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>عبق الشرق</h3>
          <p style={{ fontSize: 13, opacity: .7, lineHeight: 1.8 }}>متجر البخور والعود الفاخر — أصالة الشرق في كل قطرة.</p>
        </div>
        <div>
          <h4 style={{ fontWeight: 700, marginBottom: 14 }}>روابط سريعة</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontSize: 13, opacity: .7 }}>
            <li><Link href="/">الرئيسية</Link></li>
            <li><Link href="/products">المنتجات</Link></li>
            <li><Link href="/cart">السلة</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontWeight: 700, marginBottom: 14 }}>تواصل معنا</h4>
          <p style={{ fontSize: 13, opacity: .7 }}>hello@store.com</p>
          <p style={{ fontSize: 13, opacity: .7, marginTop: 6 }}>+966 275 2641</p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", textAlign: "center", padding: "16px 0", fontSize: 12, opacity: .5 }}>
        جميع الحقوق محفوظة © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
