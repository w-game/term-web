import axios from "axios"
import appConfig from '../config/app'

const url = appConfig.serverAddress

const get = ({ router, callback, error }) => {
    axios.get(`http://127.0.0.1:8000${router}`)
        .then(res => callback(res))
        .catch(e => error(e))
}

const post = ({ router, callback, error }) => {
    axios.post(`${url}${router}`)
        .then(res => callback(res))
        .catch(e => error(e))
}

export { get }