import axios from "axios"

const instance = axios.create({
    baseURL: 'https://us-central1-clone-utube-23bce.cloudfunctions.net/api'
    // https://us-central1-clone-utube-23bce.cloudfunctions.net/api
// http://localhost:5001/clone-utube-23bce/us-central1/api
    // cloud fn url
})

export default instance