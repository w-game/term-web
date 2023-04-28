import axios from "axios"
import appConfig from '../config/app'

const url = appConfig.serverAddress

const get = (router, callback, error) => {
    console.log(router)
    axios.get(`${url}${router}`)
        .then(res => callback(res))
        .catch(e => error(e))
}

const post = (router, callback, error) => {
    axios.post(`${url}${router}`)
        .then(res => callback(res))
        .catch(e => error(e))
}

export { get }