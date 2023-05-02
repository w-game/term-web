import axios from "axios"
import Cookies from 'js-cookie';
import config from '../func/config'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const csrftoken = Cookies.get('csrftoken')
axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

const get = (router, callback, error) => {
    axios.get(`${config.api}api/${router}`)
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
    axios.post(`${config.api}api/${router}`, data, {
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

const stream = (router, callback, error) => {
    fetch(`${config.api}api/${router}`)
        .then(res => {
            if (callback) {
                callback(res)
            }
        })
        .catch(e => {
            if (error) {
                error(e)
            }
        });
}

export { get, post, stream }