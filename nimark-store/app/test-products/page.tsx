const STORE_ID = process.env.STORE_ID || "146d5c54-75b9-4197-8c94-78be27c89075";
const ADMIN_API_URL = process.env.ADMIN_API_URL || "http://localhost:3000";

async function getProducts() {
  try {
    const res = await fetch(`${ADMIN_API_URL}/api/${STORE_ID}/products`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

async function getProduct(productId: string) {
  try {
    const res = await fetch(`${ADMIN_API_URL}/api/${STORE_ID}/products/${productId}`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function TestProductsPage({
  searchParams,
}: {
  searchParams: { productId?: string };
}) {
  const productId = searchParams.productId;
  
  let products = null;
  let singleProduct = null;

  if (productId) {
    singleProduct = await getProduct(productId);
  } else {
    products = await getProducts();
  }

  return (
    <div className="p-5 font-mono">
      <h1>Product API Test</h1>
      
      <div className="mb-5">
        <p><strong>Store ID:</strong> {STORE_ID}</p>
        <p><strong>Admin API URL:</strong> {ADMIN_API_URL}</p>
      </div>

      {productId ? (
        <div>
          <h2>Single Product (ID: {productId})</h2>
          <pre className="bg-gray-100 p-2.5 rounded-md overflow-auto max-h-[80vh]">
            {JSON.stringify(singleProduct, null, 2)}
          </pre>
          <a href="/test-products" className="text-blue-600 underline">
            ← Back to all products
          </a>
        </div>
      ) : (
        <div>
          <h2>All Products</h2>
          {products && Array.isArray(products) && (
            <p><strong>Total Products:</strong> {products.length}</p>
          )}
          <pre className="bg-gray-100 p-2.5 rounded-md overflow-auto max-h-[80vh]">
            {JSON.stringify(products, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-5 p-2.5 bg-cyan-50">
        <h3>Test URLs:</h3>
        <ul>
          <li>All products: <code>/test-products</code></li>
          <li>Single product: <code>/test-products?productId=YOUR_PRODUCT_ID</code></li>
        </ul>
      </div>
    </div>
  );
}
