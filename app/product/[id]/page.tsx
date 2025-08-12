// app/product/[id]/page.tsx
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { PRODUCTS } from "@/lib/catalog";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Product niet gevonden</h1>
        <p className="mt-2 text-zinc-600">
          Controleer de URL of ga terug naar de collectie.
        </p>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
