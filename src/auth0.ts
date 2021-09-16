// Creates and Contains Auth0Client
import createAuth0Client from '@auth0/auth0-spa-js';
import type { Auth0Client } from '@auth0/auth0-spa-js';

/** The auth0 client which is initialized in the __layout.svelte */
export let auth0: Auth0Client;

/** Creates an Auth0Client */
export async function createClient() {
	auth0 = await createAuth0Client({
		domain: import.meta.env.VITE_AUTH0_DOMAIN,
		client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
		redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI
	});
}
