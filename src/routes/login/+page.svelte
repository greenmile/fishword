<script>
    import { login } from '$lib/auth';
    import { goto } from '$app/navigation';
  
    let email = '';
    let password = '';
    let error = null;
  
    async function handleLogin() {
      try {
        await login(email, password);
        goto('/'); // Redirect to the home page after login
      } catch (err) {
        error = 'Failed to log in. Please check your email and password.';
      }
    }
  </script>
  
  <main class="flex-1 p-6">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
  
    {#if error}
      <p class="text-red-600 mb-4">{error}</p>
    {/if}
  
    <form on:submit|preventDefault={handleLogin} class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Email</label>
        <input type="email" bind:value={email} class="w-full px-4 py-2 border rounded-lg" required />
      </div>
      <div>
        <label class="block text-sm font-medium">Password</label>
        <input type="password" bind:value={password} class="w-full px-4 py-2 border rounded-lg" required />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Log In
      </button>
    </form>
  </main>