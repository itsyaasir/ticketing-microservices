import axios from "axios";

export default ({ req }) => {
    if (typeof window === "undefined") {
        // We are on the server
        let ingressSrv = "ingress-nginx-controller.ingress-nginx.svc.cluster.local"
        return axios.create({
            baseURL: `http://${ingressSrv}`,
            headers: req.headers
        });

    } else {
        // We are on the browser
        return axios.create({
            baseURL: "/"
        });
    }
}

