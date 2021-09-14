import axios from "axios"

const LandingPage = ({ currentUser }) => {
    console.log(currentUser);
    return <h1>Landing Page</h1>

}

LandingPage.getInitialProps = async () => {
    if (typeof window === 'undefined') {
        let ingressSrv = "ingress-nginx.ingress-nginx-controller.svc.cluster.local"
        const { data } = await axios.get(`${ingressSrv}/api/users/currentuser`);
        return data;
    } else {
        const { data } = await axios.get("/api/users/currentuser");
        return data;
    }

    return {}; // return an empty object

}

export default LandingPage;