<script>
    let cartItems = [];

    function loadCart() {
        const storedCart = localStorage.getItem('cart');
        cartItems = storedCart ? JSON.parse(storedCart) : [];
    }
</script>
  
<section class="p-6">
    {#if cartItems.length > 0}
        <div class="space-y-4">
            {#each cartItems as item}
                <div class="flex justify-between items-center">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                </div>
            {/each}
        </div>
    {:else}
        <p>Your cart is empty.</p>
    {/if}
</section>