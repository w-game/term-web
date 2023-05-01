import axios from "axios"
import appConfig from '../config/app'
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const csrftoken = Cookies.get('csrftoken')
axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

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

const post = (router, data, callback, error) => {
    axios.post(`${url}api/${router}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }
    })
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