import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { api } from "@/lib/api";
import Link from "next/link";

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || "";
  const page = params?.page || "1";

  let data;
  try {
    data = await api.products({ ...(category && { category }), page });
  } catch (e) {
    return <><Header /><p style={{ padding: 80, textAlign: "center", color: "red" }}>{e.message}</p><Footer /></>;
  }

  const { data: products, categories, current_page, last_page } = data;

  return (
    <>
      <Header />
      <main className="container" style={{ padding: "48px 16px" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 32 }}>جميع المنتجات</h1>

        {/* category filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          <Link href="/products" style={{
            padding: "6px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
            background: !category ? "var(--maroon)" : "var(--sand)",
            color: !category ? "#fff" : "var(--ink)",
          }}>الكل</Link>
          {categories?.map(cat => (
            <Link key={cat.id} href={`/products?category=${cat.slug}`} style={{
              padding: "6px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
              background: category === cat.slug ? "var(--maroon)" : "var(--sand)",
              color: category === cat.slug ? "#fff" : "var(--ink)",
            }}>{cat.name}</Link>
          ))}
        </div>

        {products?.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px,1fr))", gap: 24 }}>
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "var(--muted)", padding: "60px 0" }}>
            لا توجد منتجات في هذه الفئة.
          </p>
        )}

        {/* pagination */}
        {last_page > 1 && (
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 48 }}>
            {Array.from({ length: last_page }, (_, i) => i + 1).map(p => (
              <Link key={p} href={`/products?${category ? `category=${category}&` : ""}page=${p}`} style={{
                width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                background: p === Number(current_page) ? "var(--maroon)" : "var(--sand)",
                color: p === Number(current_page) ? "#fff" : "var(--ink)",
                fontSize: 13, fontWeight: 600,
              }}>{p}</Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
