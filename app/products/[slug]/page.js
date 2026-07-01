import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import { api } from "@/lib/api";

export default async function ProductPage({ params }) {
  const { slug } = await params;

  let data;
  try {
    data = await api.product(slug);
  } catch (e) {
    return <><Header /><p style={{ padding: 80, textAlign: "center", color: "red" }}>{e.message}</p><Footer /></>;
  }

  const { product, related } = data;

  return (
    <>
      <Header />
      <main className="container" style={{ padding: "48px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>

          {/* image */}
          <div style={{ aspectRatio: "1", borderRadius: 16, overflow: "hidden", background: "var(--sand)" }}>
            {product.image
              ? <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>لا توجد صورة</div>
            }
          </div>

          {/* info */}
          <div>
            {product.category && (
              <span style={{ fontSize: 13, color: "var(--maroon)", fontWeight: 600 }}>{product.category.name}</span>
            )}
            <h1 style={{ fontSize: 32, fontWeight: 800, marginTop: 8 }}>{product.name}</h1>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: "var(--maroon)" }}>{product.price_formatted}</span>
              {product.compare_price_formatted && (
                <span style={{ fontSize: 16, color: "var(--muted)", textDecoration: "line-through" }}>{product.compare_price_formatted}</span>
              )}
              {product.discount_percent && (
                <span className="badge-discount">خصم {product.discount_percent}%</span>
              )}
            </div>

            <p style={{ color: "var(--muted)", lineHeight: 1.9, marginTop: 20 }}>{product.description}</p>

            <AddToCartButton product={product} />
          </div>
        </div>

        {/* related */}
        {related?.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 28 }}>منتجات ذات صلة</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: 20 }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
