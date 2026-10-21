import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import WebSocket from "ws";
import { serverEnv } from "@/env/server";
import { authRelations } from "@/repo/schema/auth.schema";

// `neon-serverless` speaks to Postgres over a WebSocket and calls the
// constructor with the URL only, so wrap `ws` to supply connection options.
//
// Neon resolves to several IPv4 addresses and not all of them are reachable
// from every network. Node's Happy Eyeballs discards an address after 250ms
// and fails the whole connect instead of trying the next one, which shows up
// as an intermittent ETIMEDOUT. Give each address a real chance first.
//
// `autoSelectFamily` is a `net.Socket` option that `ws` accepts at runtime but
// does not declare on `ClientOptions`, hence the cast.
const connectionOptions = {
  autoSelectFamily: true,
  autoSelectFamilyAttemptTimeout: 3_000,
} as WebSocket.ClientOptions;

const NeonWebSocket = class extends WebSocket {
  constructor(address: string) {
    super(address, connectionOptions);
  }
};

// The driver only ever calls this with a single URL argument.
neonConfig.webSocketConstructor = NeonWebSocket as unknown as NonNullable<
  typeof neonConfig.webSocketConstructor
>;

const sql = new Pool({
  connectionString: String(serverEnv.DB_URL),
});

export const db = drizzle({
  client: sql,
  logger: true,
  relations: {
    ...authRelations,
  },
});

export type Db = typeof db;
