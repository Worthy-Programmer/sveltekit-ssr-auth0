<!-- This is a private route, which redirects to `/login` when no authenicated-->
<script type="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		if (!session.isAuthenticated) {
			return {
				status: 301,
				redirect: '/login'
			};
		}

		return {
			status: 200
		};
	};
</script>

<script type="ts">
	import { session } from '$app/stores';
</script>

<!-- Display the user details -->
{#if $session.user}
	{#each Object.keys($session.user) as key}
		<p><b>{key}</b>: {$session.user[key]}</p>
	{/each}
{/if}
