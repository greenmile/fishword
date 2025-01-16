<script>
    import { onMount } from 'svelte';
    import pb from '$lib/pocketbase'; // PocketBase client
    import { getCurrentUser } from '$lib/auth'; // Function to get the logged-in user
    import Header from '$lib/components/Header.svelte';
  
    let cartItems = []; // Stores cart items
    let isLoading = true; // Loading state
    let error = null; // Error message
  
    // Form fields
    let name = '';
    let email = '';
    let address = '';
  
    // Fetch cart items and user details
    onMount(async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const cartData = urlParams.get('cart');
  
      if (cartData) {
        try {
          cartItems = JSON.parse(decodeURIComponent(cartData)); // Parse the cart data
          console.log('Cart Items:', cartItems); // Log the cart items
        } catch (err) {
          console.error('Failed to parse cart data:', err);
          error = 'Invalid cart data.';
        }
      } else {
        error = 'No cart data found.';
      }
  
      // Fetch user details
      const user = getCurrentUser();
      if (!user) {
        alert('You must be logged in to proceed to checkout.');
        window.location.href = '/login'; // Redirect to login page
        return;
      }
  
      // Pre-fill form fields with user data
      name = user.name || '';
      email = user.email;
      address = user.address || '';
  
      // Fetch additional user details from PocketBase if needed
      try {
        const userProfile = await pb.collection('users').getOne(user.id);
        console.log('User Profile:', userProfile);
  
        // Update form fields with fetched data (if available)
        name = userProfile.name || name;
        address = userProfile.address || address;
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        // Do not block the flow if fetching fails; use the data from `getCurrentUser`
      }
  
      isLoading = false; // Set loading to false after fetching
    });
  
    // Function to place an order
    async function placeOrder(event) {
  event.preventDefault();

  const user = getCurrentUser();
  if (!user) {
    alert('You must be logged in to place an order.');
    return;
  }

  const order = {
    customer_name: name,
    customer_email: email,
    customer_address: address,
    total_amount: cartItems.reduce((total, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity || 1);
      if (isNaN(price) || isNaN(quantity)) {
        console.error('Invalid price or quantity:', item);
        return total;
      }
      return total + price * quantity;
    }, 0),
    products: cartItems,
    user: user.id, // Associate the order with the logged-in user
  };

  console.log('Order Data:', order); // Log the order data

  try {
    console.log('Attempting to create order...');
    const createdOrder = await pb.collection('orders').create(order);
    console.log('Order created successfully:', createdOrder);

    // Redirect to the thank-you page with the order ID
    window.location.href = `/thankyou?orderId=${createdOrder.id}`;
  } catch (err) {
    console.error('Failed to place order:', err);
    error = err.message;
    alert('Failed to place order. Please try again.');
  }
}
  </script>
  
  <Header />
  
  <main class="flex-1 p-6">
    <h2 class="text-2xl font-bold mb-4">Checkout</h2>
  
    {#if isLoading}
      <p>Loading cart...</p>
    {:else if error}
      <p class="text-red-600">{error}</p>
    {:else if cartItems.length === 0}
      <p>Your cart is empty.</p>
    {:else}
      <form on:submit={placeOrder} class="space-y-4">
        <!-- Customer Name -->
        <div>
          <label for="name" class="block text-sm font-medium">Name</label>
          <input
            id="name"
            type="text"
            bind:value={name}
            class="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
  
        <!-- Customer Email (Read-only) -->
        <div>
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            class="w-full px-4 py-2 border rounded-lg bg-gray-100"
            readonly
          />
        </div>
  
        <!-- Customer Address -->
        <div>
          <label for="address" class="block text-sm font-medium">Address</label>
          <textarea
            id="address"
            bind:value={address}
            class="w-full px-4 py-2 border rounded-lg"
            required
          ></textarea>
        </div>
  
        <!-- Total Amount -->
        <div>
          <label class="block text-sm font-medium">Total Amount</label>
          <p class="text-lg font-semibold">
            Rs {cartItems.reduce((total, item) => {
              const price = parseFloat(item.price);
              const quantity = parseInt(item.quantity || 1);
              return total + price * quantity;
            }, 0).toFixed(2)}
          </p>
        </div>
  
        <!-- Place Order Button -->
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Place Order
        </button>
      </form>
    {/if}
  </main>