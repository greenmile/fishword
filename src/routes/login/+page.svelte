<script>
  import pb from '$lib/pocketbase';

  let email = "";
  let password = "";
  let error = "";

  async function handleLogin() {
    if (!email || !password) {
      error = "Please fill in all fields.";
      return;
    }

    try {
      // Authenticate user
      const authData = await pb.collection('users').authWithPassword(email, password);
      console.log("Login successful:", authData);

      // Redirect to dashboard or home page
      window.location.href = "/products";
    } catch (err) {
      console.error("Login failed:", err);
      error = "Invalid email or password.";
    }
  }
</script>

<div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
  <h1 class="text-2xl font-bold mb-6">Login</h1>

  {#if error}
    <div class="text-red-600 mb-4">{error}</div>
  {/if}

  <form on:submit|preventDefault={handleLogin} class="space-y-4">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        placeholder="Enter your email"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <input
        type="password"
        id="password"
        bind:value={password}
        placeholder="Enter your password"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <button type="submit" class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
      Login
    </button>
  </form>

  <div class="mt-4 text-center">
    <a href="/forgot-password" class="text-blue-600 hover:underline">Forgot Password?</a>
    <p>Don't have an account? <a href="/signup" class="text-blue-600 hover:underline">Sign Up</a></p>
  </div>
</div>