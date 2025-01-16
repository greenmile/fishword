<script>
    import PocketBase from 'pocketbase';
    import { goto } from '$app/navigation';
  
    const pb = new PocketBase('http://129.154.43.50');
  
    let email = '';
    let password = '';
    let error = null;
  
    async function handleSignup() {
      try {
        await pb.collection('users').create({ email, password, passwordConfirm: password });
        goto('/login'); // Redirect to the login page after signup
      } catch (err) {
        error = 'Failed to sign up. Please try again.';
      }
    }
  </script>
  
  <main class="flex-1 p-6">
    <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
  
    {#if error}
      <p class="text-red-600 mb-4">{error}</p>
    {/if}
  
    <form on:submit|preventDefault={handleSignup} class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Email</label>
        <input type="email" bind:value={email} class="w-full px-4 py-2 border rounded-lg" required />
      </div>
      <div>
        <label class="block text-sm font-medium">Password</label>
        <input type="password" bind:value={password} class="w-full px-4 py-2 border rounded-lg" required />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Sign Up
      </button>
    </form>
  </main>