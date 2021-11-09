import { promisify } from "util"
import { scrypt, randomBytes } from "crypto"

const scryptAsync = promisify(scrypt);  
export class Password {
    // Static are methods that can be called with instantiating the class
    static async toHash(password: string) { // Generate a hash
        const salt = randomBytes(8).toString("hex"); // 8 bytes
        const buf = (await scryptAsync(password, salt, 64)) as Buffer; // 64 bytes
        return `${buf.toString("hex")}.${salt}`;
    }
    // Compare Password
    static async compare(storedpassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedpassword.split(".")
        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
        return buf.toString("hex") === hashedPassword
    }  // Compare Password
}