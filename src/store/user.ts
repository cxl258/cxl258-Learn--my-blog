import { defineStore } from 'pinia'
import {  getData } from '../utils/local'
export const userStore = defineStore('save', {
    actions:{
        save(value:string,role:string){
            this.token = value
            this.role = role
        }
    },
    state(){
        return{
            token: getData('token').token,
            role: getData('token').role,
            user_pic: getData('token').user_pic,
            userInfo: getData('token')
        }
    }
})
