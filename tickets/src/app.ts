import express from "express";
import { json } from "body-parser";
require("express-async-errors");
import cookieSession from "cookie-session";
// Routers
import { createTicketRouter } from "./routes/new"

// Middleware
import { errorHandler, NotFoundError, currentUser } from "@itsyasir/common";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";
const app = express();
// trust proxy
app.set("trust proxy", true);

app.use(json());
// Adding cookie-session support
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test"
}));
app.use(currentUser);
// Routes
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
app.all("*", async (req, res) => {
    throw new NotFoundError();
});
app.use(errorHandler);

export { app };