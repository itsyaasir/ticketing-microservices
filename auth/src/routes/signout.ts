import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {  
    req.session = null;  // The user session is nulled when the user signs out.
    res.send({})
});

export { router as signoutRouter };