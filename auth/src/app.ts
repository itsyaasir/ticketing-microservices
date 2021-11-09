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
import { errorHandler, NotFoundError } from "@itsyasir/common";
const app = express();
// trust proxy
app.set("trust proxy", true);  // trust first proxy

app.use(json());  // parse json
// Adding cookie-session support
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test"
}));  // secure: true for https
// Routes
app.use(currentUserRouter); // current user
app.use(signinRouter); // signin
app.use(signupRouter); // signup
app.use(signoutRouter); // signout

app.all("*", async (req, res) => {
    throw new NotFoundError();
}); // 404
app.use(errorHandler);  // Error handler

export { app };  // Exporting app 