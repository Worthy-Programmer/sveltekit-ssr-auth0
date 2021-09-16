// An endpoint which creates and stores the access token as a jwt in cookie.
import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';
import type { CookieSerializeOptions } from 'cookie';
import jwt from 'jsonwebtoken';


const cookieOpt: CookieSerializeOptions = {
	sameSite: 'lax', httpOnly: true
}

export const post: RequestHandler = async ({ body }) => {
	if (typeof body === 'object') {
		// @ts-ignore
		const { token }: { token: string } = body;

		// The JWT containing the access token is serialized
		const cookieString = cookie.serialize(
			'token',
			jwt.sign(token, import.meta.env.VITE_PRIVATE_KEY),
			cookieOpt
		);

		return {
			status: 200,
			headers: {
				'set-cookie': [cookieString]
			}
		};
	}
};


export const del: RequestHandler = async ({ headers }) => {
	const cookieString = cookie.serialize(
		'token',
		'',
		{expires: new Date(1970, 1), ...cookieOpt}
	);
	return {
		status: 200,
		headers: {
			'set-cookie': [cookieString]
		}
	};
}