import type { GetSession, Handle } from '@sveltejs/kit';

import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { AuthenticationClient } from 'auth0';

/** The node auth0 client */
const authClient = new AuthenticationClient({
	domain: import.meta.env.VITE_AUTH0_DOMAIN,
	clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
	clientSecret: import.meta.env.VITE_AUTH0_CLIENT_SECRET
});

// Checks for Access Token in cookie and retrieves the user info
export const handle: Handle = async ({ request, resolve }) => {
	/** JWT of token is retrieved from cookie */
	const { token: tokenJWT } = cookie.parse(request.headers.cookie || '');

	if (tokenJWT) {
		/** The Access Token */
		const token = jwt.verify(tokenJWT, import.meta.env.VITE_PRIVATE_KEY);

		if (token && typeof token === 'string') {
			request.locals.token = token;
			request.locals.isAuthenticated = true;
			const user = await authClient.getProfile(token);
			request.locals.user = user || { guest: true };
		}
	}

	return await resolve(request);
};

// Adding the autenthication result to the session of the web app
export const getSession: GetSession = async ({ locals: { isAuthenticated, user } }) => {
	return {
		isAuthenticated,
		user
	};
};
