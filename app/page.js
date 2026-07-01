import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { api } from "@/lib/api";
import Link from "next/link";
import CountdownClient from "@/components/CountdownClient";

export default async function Home() {
  let data;
  try {
    data = await api.home();
  } catch (e) {
    return (
      <main style={{ padding: 80, textAlign: "center" }}>
        <Header />
        <p style={{ color: "red", marginTop: 40 }}>تعذر الاتصال بالـ API: {e.message}</p>
      </main>
    );
  }

  const { settings, categories, featured, on_offer, latest } = data;

  return (
    <>
      <Header />
      <main>

        {/* HERO */}
        <section style={{
          background: `linear-gradient(135deg, var(--sand) 0%, var(--cream) 60%)`,
          padding: "80px 16px",
        }}>
          <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "var(--maroon)", lineHeight: 1.3 }}>
                {settings.hero_title}
              </h1>
              <p style={{ color: "var(--muted)", marginTop: 20, maxWidth: 420, lineHeight: 1.9 }}>
                {settings.hero_subtitle}
              </p>
              <Link href="/products" className="btn-primary" style={{ marginTop: 28, display: "inline-flex" }}>
                تسوق الآن
              </Link>
            </div>
            <div style={{
              aspectRatio: "4/5", borderRadius: 20,
              background: "linear-gradient(160deg, var(--maroon2), var(--maroon))",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,.2)", fontSize: 14,
            }}>
              {settings.hero_image
                ? <img src={settings.hero_image} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 20 }} />
                : "صورة المنتج الرئيسية"}
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        {categories?.length > 0 && (
          <section style={{ padding: "64px 16px" }}>
            <div className="container">
              <h2 style={{ textAlign: "center", fontSize: 24, fontWeight: 800, marginBottom: 40 }}>تسوق حسب الفئة</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
                {categories.map(cat => (
                  <Link key={cat.id} href={`/products?category=${cat.slug}`} style={{ textAlign: "center" }}>
                    <div style={{
                      width: 80, height: 80, borderRadius: "50%",
                      background: "var(--sand)", overflow: "hidden",
                      border: "2px solid transparent", margin: "0 auto 8px",
                      transition: "border-color .2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--gold)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
                    >
                      {cat.image && <img src={cat.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* LATEST */}
        {latest?.length > 0 && (
          <section style={{ padding: "0 16px 64px" }}>
            <div className="container">
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 32 }}>كل اللي يعبّر عن عطرك اليومي</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: 20 }}>
                {latest.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </section>
        )}

        {/* PROMO BANNER */}
        <section style={{ padding: "0 16px 64px" }}>
          <div className="container">
            <div style={{
              borderRadius: 20, padding: "48px 40px",
              background: "linear-gradient(135deg, var(--ink), var(--maroon))",
              color: "#fff",
            }}>
              <h2 style={{ fontSize: "clamp(20px,3vw,32px)", fontWeight: 800, maxWidth: 480 }}>
                {settings.banner_title}
              </h2>
              <p style={{ opacity: .7, marginTop: 10, maxWidth: 400 }}>{settings.banner_subtitle}</p>
              <Link href="/products" className="btn-primary btn-gold" style={{ marginTop: 24, display: "inline-flex" }}>
                تسوق الآن
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURED */}
        {featured?.length > 0 && (
          <section style={{ padding: "0 16px 64px" }}>
            <div className="container">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800 }}>منتجات مختارة بعناية</h2>
                <Link href="/products" style={{ color: "var(--maroon)", fontSize: 13, fontWeight: 600 }}>عرض الكل</Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: 20 }}>
                {featured.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </section>
        )}

        {/* COUNTDOWN OFFER */}
        <section style={{ padding: "0 16px 64px" }}>
          <div className="container">
            <div style={{
              borderRadius: 20, padding: "48px 40px",
              background: "linear-gradient(135deg, var(--maroon2), var(--maroon))",
              color: "#fff", textAlign: "center",
            }}>
              <h2 style={{ fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 800, maxWidth: 500, margin: "0 auto" }}>
                {settings.offer_title}
              </h2>
              <CountdownClient endsAt={settings.offer_ends_at} />
              <Link href="/products" className="btn-primary btn-gold" style={{ marginTop: 28, display: "inline-flex" }}>
                تسوق الآن
              </Link>
            </div>
          </div>
        </section>

        {/* ON OFFER */}
        {on_offer?.length > 0 && (
          <section style={{ padding: "0 16px 64px" }}>
            <div className="container">
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 32 }}>منتجات العروض</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: 20 }}>
                {on_offer.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
