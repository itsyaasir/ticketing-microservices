import { useState } from "react"
import useRequest from "../../hooks/use-request";
import Router from "next/router"
const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { doRequest, errors } = useRequest({
        url: "/api/users/signup",
        method: "post",
        body: {
            email, password
        },
        onSuccess: () => Router.push("/")
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");

        await doRequest();

    };
    return (
        <form onSubmit={onSubmit}>
            <h1>Sign up</h1>
            <div className="from-group">
                <label htmlFor="">Email </label>
                <input className="form-control m-2" type="email" name="" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="from-group">
                <label htmlFor="">Password</label>
                <input className="form-control m-2"
                    value={password} type="password" onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            {errors}
            <button className="btn btn-primary m-2">Sign Up</button>
        </form>
    );
}
export default SignUp;