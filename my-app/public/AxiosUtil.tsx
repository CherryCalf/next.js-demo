import axios from "axios";



export async function axiosGet(url: any, params: any = null, ContentType: string = 'application/json', responseType = '') {
    return axios("http://localhost:8080" + url, {
        method: 'get',
        headers: {
            'Content-Type': ContentType,
            'token': localStorage.getItem('token')
        },
        responseType: responseType,
        params: params
    })
}


export async function axiosPost(url: any, data: any = null, ContentType: string = 'application/json') {
    return axios("http://localhost:8080" + url, {
        method: 'post',
        headers: {
            'Content-Type': ContentType,
            'token': localStorage.getItem('token')
        },
        data: data
    })
}
export async function axiosPut(url: any, data: any = null, ContentType: string = 'application/json') {
    return axios("http://localhost:8080" + url, {
        method: 'put',
        headers: {
            'Content-Type': ContentType,
            'token': localStorage.getItem('token')
        },
        data: data
    })
}
