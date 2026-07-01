import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CountdownClient from "@/components/CountdownClient";
import { api } from "@/lib/api";
import Link from "next/link";

// ── Section renderers ──────────────────────────────────────────────

function Hero({ settings }) {
  return (
    <section style={{ background: "linear-gradient(135deg, var(--sand) 0%, var(--cream) 60%)", padding: "80px 16px" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, color: "var(--maroon)", lineHeight: 1.3 }}>
            {settings.title}
          </h1>
          <p style={{ color: "var(--muted)", marginTop: 20, maxWidth: 420, lineHeight: 1.9 }}>{settings.subtitle}</p>
          <Link href={settings.cta_url || "/products"} className="btn-primary" style={{ marginTop: 28, display: "inline-flex" }}>
            {settings.cta_text || "تسوق الآن"}
          </Link>
        </div>
        <div style={{
          aspectRatio: "4/5", borderRadius: 20, overflow: "hidden",
          background: "linear-gradient(160deg, var(--maroon2), var(--maroon))",
        }}>
          {settings.image
            ? <img src={settings.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.2)", fontSize: 14 }}>صورة المنتج</div>
          }
        </div>
      </div>
    </section>
  );
}

function Categories({ settings, categories }) {
  if (!categories?.length) return null;
  return (
    <section style={{ padding: "64px 16px" }}>
      <div className="container">
        <h2 style={{ textAlign: "center", fontSize: 24, fontWeight: 800, marginBottom: 40 }}>{settings.title}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
          {categories.map(cat => (
            <Link key={cat.id} href={`/products?category=${cat.slug}`} style={{ textAlign: "center" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--sand)", overflow: "hidden", border: "2px solid var(--line)", margin: "0 auto 8px" }}>
                {cat.image && <img src={cat.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductGrid({ settings, products }) {
  if (!products?.length) return null;
  const limit = parseInt(settings.limit || 6);
  const items = products.slice(0, limit);
  return (
    <section style={{ padding: "0 16px 64px" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>{settings.title}</h2>
          <Link href="/products" style={{ color: "var(--maroon)", fontSize: 13, fontWeight: 600 }}>عرض الكل</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: 20 }}>
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

function Banner({ settings }) {
  return (
    <section style={{ padding: "0 16px 64px" }}>
      <div className="container">
        <div style={{
          borderRadius: 20, padding: "48px 40px",
          background: settings.image
            ? `linear-gradient(rgba(43,32,24,.7),rgba(43,32,24,.7)), url(${settings.image}) center/cover`
            : "linear-gradient(135deg, var(--ink), var(--maroon))",
          color: "#fff",
        }}>
          <h2 style={{ fontSize: "clamp(20px,3vw,32px)", fontWeight: 800, maxWidth: 480 }}>{settings.title}</h2>
          <p style={{ opacity: .7, marginTop: 10, maxWidth: 400 }}>{settings.subtitle}</p>
          <Link href={settings.cta_url || "/products"} className="btn-primary btn-gold" style={{ marginTop: 24, display: "inline-flex" }}>
            {settings.cta_text || "تسوق الآن"}
          </Link>
        </div>
      </div>
    </section>
  );
}

function Countdown({ settings }) {
  const endsAt = settings.ends_at || new Date(Date.now() + 4 * 86400000).toISOString();
  return (
    <section style={{ padding: "0 16px 64px" }}>
      <div className="container">
        <div style={{ borderRadius: 20, padding: "48px 40px", background: "linear-gradient(135deg, var(--maroon2), var(--maroon))", color: "#fff", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 800, maxWidth: 500, margin: "0 auto" }}>{settings.title}</h2>
          <CountdownClient endsAt={endsAt} />
          <Link href={settings.cta_url || "/products"} className="btn-primary btn-gold" style={{ marginTop: 28, display: "inline-flex" }}>
            {settings.cta_text || "تسوق الآن"}
          </Link>
        </div>
      </div>
    </section>
  );
}

function Instagram({ settings }) {
  const count = parseInt(settings.count || 5);
  return (
    <section style={{ padding: "0 16px 64px" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{settings.title}</h2>
        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 28 }}>{settings.handle}</p>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${count}, 1fr)`, gap: 12 }}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} style={{ aspectRatio: "1", borderRadius: 12, background: "var(--sand)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section dispatcher ─────────────────────────────────────────────

function Section({ section, data }) {
  const s = section.settings;
  switch (section.type) {
    case "hero":        return <Hero settings={s} />;
    case "categories":  return <Categories settings={s} categories={data.categories} />;
    case "latest":      return <ProductGrid settings={s} products={data.latest} />;
    case "featured":    return <ProductGrid settings={s} products={data.featured} />;
    case "on_offer":    return <ProductGrid settings={s} products={data.on_offer} />;
    case "banner":      return <Banner settings={s} />;
    case "countdown":   return <Countdown settings={s} />;
    case "instagram":   return <Instagram settings={s} />;
    default:            return null;
  }
}

// ── Page ──────────────────────────────────────────────────────────

export default async function Home() {
  let data;
  try {
    data = await api.home();
  } catch (e) {
    return (
      <>
        <Header />
        <p style={{ padding: 80, textAlign: "center", color: "red" }}>
          تعذر الاتصال بالـ API: {e.message}
        </p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        {data.sections?.map((section, i) => (
          <Section key={section.type + i} section={section} data={data} />
        ))}
      </main>
      <Footer />
    </>
  );
}