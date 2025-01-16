<script>
    import { onMount } from 'svelte';
    import pb from '$lib/pocketbase';
    import Header from '$lib/components/Header.svelte';
  
    let products = [];
    let isLoading = true;
    let error = null;
  
    onMount(async () => {
      try {
        console.log('Fetching products...');
        const result = await pb.collection('products').getList(1, 30); // Fetch first 30 products
        products = result.items; // Use the `items` array from the response
        console.log('Products:', products);
      } catch (err) {
        error = err.message;
        console.error('Failed to fetch products:', err);
      } finally {
        isLoading = false;
      }
    });
  
    function addToCart(product) {
  const cartData = localStorage.getItem('cart');
  let cart = cartData ? JSON.parse(cartData) : [];

  // Check if the product already exists in the cart
  const existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    // If the product exists, increase the quantity
    cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
  } else {
    // If the product doesn't exist, add it with a quantity of 1
    cart.push({
      ...product,
      quantity: 1, // Ensure quantity is added
      price: parseFloat(product.price) || 0, // Ensure price is a valid number
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}
  </script>
  
  <Header />
  
  <main class="flex-1 p-6">
    <h2 class="text-2xl font-bold mb-4">Our Products</h2>
  
    {#if isLoading}
      <p>Loading products...</p>
    {:else if error}
      <p class="text-red-600">Error: {error}</p>
    {:else if products.length === 0}
      <p>No products available.</p>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each products as product}
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-semibold">{product.name}</h3>
            <p class="text-gray-600">{product.Description}</p>
            <p class="text-sm text-gray-500">Type: {product.Freshwater}</p>
            <button
              on:click={() => addToCart(product)}
              class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add to Cart
            </button>
            <div class="bg-blue-500 text-white p-4">
              Test Tailwind CSS
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </main>