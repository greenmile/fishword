<script>
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header.svelte';
  
    let orderId = null; // Store the order ID if needed
    let isLoading = true; // Loading state
  
    // Fetch order details if needed (optional)
    onMount(() => {
      const urlParams = new URLSearchParams(window.location.search);
      orderId = urlParams.get('orderId'); // Example: Fetch order ID from URL
  
      // Simulate loading (you can fetch order details here if needed)
      setTimeout(() => {
        isLoading = false;
      }, 1000);
    });
  </script>
  
  <Header />
  
  <main class="flex-1 p-6">
    <div class="max-w-2xl mx-auto text-center">
      {#if isLoading}
        <p>Loading...</p>
      {:else}
        <h1 class="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p class="text-lg text-gray-600 mb-6">
          Your order has been successfully placed. We appreciate your business!
        </p>
  
        {#if orderId}
          <p class="text-gray-600 mb-6">
            Your order ID is: <span class="font-semibold">{orderId}</span>.
          </p>
        {/if}
  
        <div class="space-y-4">
          <p class="text-gray-600">
            You will receive a confirmation email shortly. If you have any questions, feel free to
          </p>
          <a
            href="/products"
            class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
             Thank You, Order Again    </a>
        </div>
      {/if}
    </div>
  </main>