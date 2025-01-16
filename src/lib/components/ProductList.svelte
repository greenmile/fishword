<script>
    import { onMount } from 'svelte';
    import pb from '$lib/pocketbase';
    
    let products = [];
    
    onMount(async () => {
        products = await pb.collection('products').getFullList();
    });
</script>
  
<section class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each products as product}
            <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-lg font-semibold">{product.name}</h3>
                <p class="text-gray-600">${product.price}/kg</p>
                <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Add to Cart
                </button>
            </div>
        {/each}
    </div>

    <div class="bg-blue-500 text-white p-4">
        Test Tailwind CSS
      </div>
</section>