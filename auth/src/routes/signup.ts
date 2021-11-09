import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "@itsyasir/common";
import jwt from "jsonwebtoken"
// Error handlers
import { User } from "../models/user";
import { validateRequest } from "@itsyasir/common";

const router = express.Router();

router.post("/api/users/signup", [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
], validateRequest, async (req: Request, res: Response) => {  // validateRequest is a middleware function

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {  // if user already exists
        throw new BadRequestError("Email in use")  // throw error
    }

    const user = User.build({ email, password });  // create new user
    await user.save();  // save user to database

    // Generate JWT 
    const userJwt = jwt.sign({  // sign user with JWT
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!)  // process.env.JWT_KEY is a variable that is set in the .env file


    // Store it on session object
    req.session = { jwt: userJwt }  // req.session is an object that is set in the session middleware

    res.status(201).send(user)  // send user back to client

});

export { router as signupRouter };