const BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function apiFetch(path, options = {}) {
  const url = `${BASE}/api/store${path}`;
  const res = await fetch(url, { cache: "no-store", ...options });
  if (!res.ok) throw new Error(`API ${res.status}: ${url}`);
  return res.json();
}

export const api = {
  home: () => apiFetch("/home"),
  products: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/products${qs ? "?" + qs : ""}`);
  },
  product: (slug) => apiFetch(`/products/${slug}`),
  order: (orderNumber) => apiFetch(`/order/${orderNumber}`),
  checkout: (body) =>
    apiFetch("/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    }),
};
