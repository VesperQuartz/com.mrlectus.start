import { Hono } from "hono";

const app = new Hono().basePath("/api");

app.get("/hono", (c) => c.text("Hello Hono!"));

export default app;
