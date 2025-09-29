import '@/polyfill'

import { RPCHandler } from '@orpc/server/fetch'
import { createFileRoute } from '@tanstack/react-router'
import router from '@/orpc/router'
import { getCookies } from "@tanstack/react-start/server"
import { CORSPlugin } from '@orpc/server/plugins'
import { BatchHandlerPlugin
 } from '@orpc/server/plugins'
import { CompressionPlugin } from '@orpc/server/fetch'
import { BodyLimitPlugin } from '@orpc/server/fetch'

const handler = new RPCHandler(router, {
	plugins: [
		new CORSPlugin({
			origin: (origin, options) => origin,
			allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
		}),
		new BatchHandlerPlugin(),
    new CompressionPlugin(),
		new BodyLimitPlugin({
      maxBodySize: 1024 * 1024 * 5, // 5MB
    }),
	]
})

async function handle({ request }: { request: Request }) {
	const { response } = await handler.handle(request, {
		prefix: '/api/rpc',
		context: {
			headers: request.headers,
			cookies: getCookies(),
		},
	})

	return response ?? new Response('Not Found', { status: 404 })
}

export const Route = createFileRoute('/api/rpc/$')({
	server: {
		handlers: {
			HEAD: handle,
			GET: handle,
			POST: handle,
			PUT: handle,
			PATCH: handle,
			DELETE: handle,
		},
	},
})
