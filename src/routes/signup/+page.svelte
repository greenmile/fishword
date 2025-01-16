<script>
  import pb from '$lib/pocketbase';

  let name = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let phone = "";
  let error = "";

  async function handleSignup() {
    if (!name || !email || !password || !confirmPassword || !phone) {
      error = "Please fill in all fields.";
      return;
    }

    if (password !== confirmPassword) {
      error = "Passwords do not match.";
      return;
    }

    try {
      // Create a new user
      const record = await pb.collection('users').create({
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
        phone, // Add phone number to the user data
      });
      console.log("Signup successful:", record);

      // Redirect to login page
      window.location.href = "/login";
    } catch (err) {
      console.error("Signup failed:", err);
      error = "An error occurred. Please try again.";
    }
  }
</script>

<div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
  <h1 class="text-2xl font-bold mb-6">Sign Up</h1>

  {#if error}
    <div class="text-red-600 mb-4">{error}</div>
  {/if}

  <form on:submit|preventDefault={handleSignup} class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        id="name"
        bind:value={name}
        placeholder="Enter your name"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

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

    <div>
      <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        bind:value={confirmPassword}
        placeholder="Confirm your password"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
      <input
        type="tel"
        id="phone"
        bind:value={phone}
        placeholder="Enter your phone number"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <button type="submit" class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
      Sign Up
    </button>
  </form>

  <div class="mt-4 text-center">
    <p>Already have an account? <a href="/login" class="text-blue-600 hover:underline">Login</a></p>
  </div>
</div>