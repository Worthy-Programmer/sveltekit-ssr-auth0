<script>
	import { onMount } from 'svelte';
	import { createClient } from '../auth0';

	/** Is `true` when the auth0 client is created. */
	let isClientCreated = false;

	// Whenever a person loads the website, the auth0Client is created first.
	onMount(() => {
		createClient().then(() => (isClientCreated = true));
	});
</script>

{#if isClientCreated}
	<slot />
{:else}
	Loading..
{/if}
