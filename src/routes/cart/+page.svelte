<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Header from '$lib/components/Header.svelte';

  let cartItems = [];
  let isLoading = true;

  onMount(() => {
    const storedCart = localStorage.getItem('cart');
    cartItems = storedCart ? JSON.parse(storedCart) : [];
    isLoading = false;
  });

  function removeFromCart(index) {
    cartItems = cartItems.filter((_, i) => i !== index); // Immutable update
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  function updateQuantity(index, quantity) {
    if (quantity < 1) return; // Ensure quantity is at least 1
    cartItems = cartItems.map((item, i) => // Immutable update
      i === index ? { ...item, quantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  function proceedToCheckout() {
    const cartData = JSON.stringify(cartItems);
    goto(`/checkout?cart=${encodeURIComponent(cartData)}`);
  }
</script>

<Header />

<main class="flex-1 p-6">
  <h2 class="text-2xl font-bold mb-4">Your Cart</h2>

  {#if isLoading}
    <p>Loading cart...</p>
  {:else if cartItems.length === 0}
    <p>Your cart is empty.</p>
  {:else}
    <div class="space-y-4">
      {#each cartItems as item, index}
        <div class="flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <div>
            <h3 class="text-lg font-semibold">{item.name}</h3>
            <p class="text-gray-600">{item.Description}</p>
            <p class="text-sm text-gray-500">Type: {item.Freshwater}</p>
            <p class="text-gray-600">Rs {item.price?.toFixed(2) || '0.00'}</p> <!-- Updated to Rs -->
          </div>
          <div class="flex items-center gap-4">
            <button
              on:click={() => updateQuantity(index, item.quantity - 1)}
              class="bg-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-400"
            >
              -
            </button>
            <input
              type="number"
              bind:value={item.quantity}
              on:input={(e) => updateQuantity(index, parseInt(e.target.value))}
              class="w-16 px-2 py-1 border rounded-lg text-center"
              min="1"
            />
            <button
              on:click={() => updateQuantity(index, item.quantity + 1)}
              class="bg-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-400"
            >
              +
            </button>
            <button
              on:click={() => removeFromCart(index)}
              class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      {/each}
    </div>

    <div class="mt-6 flex justify-between items-center">
      <p class="text-lg font-semibold">
        Subtotal: Rs {cartItems.reduce((total, item) => {
          const price = parseFloat(item.price) || 0; // Ensure price is a number
          const quantity = parseInt(item.quantity) || 1; // Ensure quantity is a number
          return total + price * quantity;
        }, 0).toFixed(2)} <!-- Updated to Rs -->
      </p>
      <button
        on:click={proceedToCheckout}
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Proceed to Checkout
      </button>
    </div>
  {/if}
</main>