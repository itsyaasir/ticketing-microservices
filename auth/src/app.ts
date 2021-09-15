import express from "express";
import { json } from "body-parser";
require("express-async-errors");
import cookieSession from "cookie-session";
// Routers
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";

// Middleware
import { errorHandler } from "@itsyasir/common";
import { NotFoundError } from "@itsyasir/common";
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
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", async (req, res) => {
    throw new NotFoundError();
});
app.use(errorHandler);

export { app };