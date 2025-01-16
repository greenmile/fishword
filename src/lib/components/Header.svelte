<script>
    let isOpen = false; // For mobile menu toggle
  </script>
  
  <header class="bg-white shadow">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-blue-600">🐟 Fishworld</h1>
      <button on:click={() => (isOpen = !isOpen)} class="lg:hidden">
        <!-- Hamburger Icon -->
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <nav class="hidden lg:flex space-x-4">
        <a href="/" class="py-2">Home</a>
        <a href="/products" class="py-2">Products</a>
        <a href="/cart" class="py-2">Cart</a>
        <a href="/orders" class="py-2">Orders</a>
      </nav>
    </div>
  
    <!-- Mobile Menu -->
    {#if isOpen}
      <div class="lg:hidden p-4">
        <a href="/" class="block py-2">Home</a>
        <a href="/products" class="block py-2">Products</a>
        <a href="/cart" class="block py-2">Cart</a>
        <a href="/orders" class="block py-2">Orders</a>
      </div>
    {/if}
  </header>