import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "@itsyasir/common";
import jwt from "jsonwebtoken"
import { validateRequest } from "@itsyasir/common";
import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post("/api/users/signin", [
    body("email")
        .isEmail()
        .withMessage("Email must be valid"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("You must supply password"),

], validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);

    if (!passwordsMatch) {
        throw new BadRequestError("Invalid credentials");
    }
    // Generate JWT 
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!) //The ! marks means the JWT_KEY has already been defined


    // Store it on session object
    req.session = { jwt: userJwt }

    res.status(201).send(existingUser)
});

export { router as signinRouter };