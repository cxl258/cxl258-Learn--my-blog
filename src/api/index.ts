import request from '../utils/request'

export const login = (data:any) => {
    return request.request({
        url:'/api/login',
        method:"post",
        data
    })
}

export const yiyan = ()=>{
    return request.request({
        url:'/api/yiiyan',
        method:"get"
    })
}