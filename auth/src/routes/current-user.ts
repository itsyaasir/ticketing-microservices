import express from "express";
import { currentUser } from "@itsyasir/common";


const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
    // Return the current user
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };