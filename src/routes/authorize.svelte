<script type="ts">
	import { page, session } from '$app/stores';
	import { auth0 } from '../auth0';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	/** Checks authentication, if successful it redirects to index.svelte */
	async function checkAuthentication() {
		// If there are code param and state param, handle the redirect
		if ($page.query.has('code') && $page.query.has('state')) {
			await auth0.handleRedirectCallback();
		}

		if (await auth0.isAuthenticated()) {
			const token = await auth0.getTokenSilently();

			// Fetching the api endpoint which adds the access token cookie
			const res = await fetch('/auth_cookie.json', {
				method: 'POST',
				body: JSON.stringify({ token }),
				credentials: 'same-origin',
				headers: { 'Content-Type': 'application/json' }
			});

			if(res.ok) {
				// Creating user session
				$session = { isAuthenticated: true, user: await auth0.getUser() }
				await goto('/');
			}
		}

		// Here goes the code to deal with failed login
	}

	onMount(checkAuthentication);
</script>
