import axios from "axios"

const instance = axios.create({
    baseURL: 'https://us-central1-clone-utube-23bce.cloudfunctions.net/api'
    // cloud fn url
})

export default instance