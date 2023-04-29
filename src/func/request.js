import axios from "axios"
import appConfig from '../config/app'

var url = appConfig.serverAddress
// url = "http://localhost:8000/"

const get = (router, callback, error) => {
    axios.get(`${url}api/${router}`)
        .then(res => {
            if (callback) {
                callback(res)
            }
        })
        .catch(e => {
            if (error) {
                error(e)
            }
        })
}

const post = (router, callback, error) => {
    axios.post(`${url}api/${router}`)
        .then(res => {
            if (callback) {
                callback(res)
            }
        })
        .catch(e => {
            if (error) {
                error(e)
            }
        })
}

export { get, post }