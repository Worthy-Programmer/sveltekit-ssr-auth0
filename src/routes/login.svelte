<!-- This is a route which redirects to `/` route when it is authenticated. -->
<script type="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		if (session.isAuthenticated) {
			return {
				status: 301,
				redirect: '/'
			};
		}

		return {
			status: 200
		};
	};
</script>

<script type="ts">
	import { auth0 } from '../auth0';
</script>

<button type="button" on:click={auth0.loginWithRedirect.bind(auth0)}> Login </button>
