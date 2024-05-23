import { defineStore } from 'pinia'
export const userStore = defineStore('save', {
    actions:{
        save(value:string,role:string){
            this.token = value
            this.role = role
        }
    },
    state(){
        return{
            token:"",
            role:''
        }
    }
})
