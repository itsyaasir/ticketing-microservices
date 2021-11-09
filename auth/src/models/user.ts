import mongoose from "mongoose";
import { Password } from "../services/password";
// An interface that describes the properties that are requiredd to create a new User
interface UserAttrs {  // interface for the user model attributes
    email: string,
    password: string
} 
//An interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}  // interface for the user model methods 

// An interface that describes that a user Document Has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string; 
}
const userSchema = new mongoose.Schema({  // user schema 
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
}, {
    toJSON: {
        transform(_, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;

        }
    }
});

userSchema.pre("save", async function (done) {  // pre save hook 
    if (this.isModified("password")) { // if the password is modified
        const hashed = await Password.toHash(this.get("password")); // hash the password
        this.set("password", hashed) // set the password to the hashed password
    }
    done()  // done 
})

userSchema.statics.build = (attrs: UserAttrs) => { // build method 
    return new User(attrs) // return a new user 
}
const User = mongoose.model<UserDoc, UserModel>("User", userSchema); // create a new user model 




export { User };