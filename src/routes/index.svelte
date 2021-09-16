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
	import {goto} from "$app/navigation"
	import { session } from '$app/stores';
	import {auth0} from '../auth0';


	async function logout() {
		const res = await fetch('/auth_cookie.json', {method: 'DELETE'})
		if (res.ok)  {
			$session = {user: {guest: true}, isAuthenticated: false};
			await goto('/login')
		}
		await auth0.logout();
	}
</script>

<!-- Display the user details -->
{#if $session.user}
	{#each Object.keys($session.user) as key}
		<p><b>{key}</b>: {$session.user[key]}</p>
	{/each}
{/if}

<button type="button" on:click={logout}> Logout </button>


