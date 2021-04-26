import axios from "axios"

const LandingPage = ({ currentUser }) => {
    console.log(currentUser)
    return <h1>Landing Page</h1>
}

LandingPage.getInitialProps = async () => {
    let ingressSrv = "ingress-nginx.ingress-nginx-controller.svc.cluster.local"
    const response = await axios.get(`${ingressSrv}/api/users/currentuser`);
    console.log(response.data);
    return response.data;
}

export default LandingPage;