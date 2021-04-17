import { useState } from "react"

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
    }
    return (
        <form onSubmit={onSubmit}>
            <h1>Sign up</h1>


            <div className="from-group">
                <label htmlFor="">Email </label>
                <input className="form-control" type="email" name="" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="from-group">
                <label htmlFor="">Password</label>
                <input className="form-control"
                    value={password} type="password" onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
};

export default SignUp;