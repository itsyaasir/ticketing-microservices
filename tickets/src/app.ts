import express from "express";
import { json } from "body-parser";
require("express-async-errors");
import cookieSession from "cookie-session";
// Routers


// Middleware
import { errorHandler, NotFoundError } from "@itsyasir/common";
const app = express();
// trust proxy
app.set("trust proxy", true);

app.use(json());
// Adding cookie-session support
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test"
}));
// Routes


app.all("*", async (req, res) => {
    throw new NotFoundError();
});
app.use(errorHandler);

export { app };