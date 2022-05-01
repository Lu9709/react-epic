import {observable, action, makeObservable} from 'mobx'
import {Auth} from '../models'
import UserStore from "./user"
import {message} from "antd"

class AuthStore {
    constructor() {
        makeObservable(this)
    }
    @observable values = {
        username:'',
        password:''
    };
    @action setUsername(username) {
        this.values.username = username
    }
    @action setPassword(password) {
        this.values.password = password
    }
    @action login() {
        return new Promise((resolve,reject)=>{
            const {username,password} = this.values
            Auth.login(username,password)
                .then(user=>{
                    UserStore.pullUser()
                    resolve(user)
                })
                .catch(err=>{
                    UserStore.resetUser()
                    message.error('登陆失败')
                    reject(err)
                })
        })
    }
    @action register() {
        return new Promise((resolve,reject)=>{
            const {username,password} = this.values
            Auth.register(username,password)
                .then(user=>{
                    UserStore.pullUser()
                    resolve(user)
                }).catch(err=>{
                    UserStore.resetUser()
                    message.error('注册失败')
                    reject(err)
                })
        })
    }
    @action logout() {
        Auth.logout()
        UserStore.resetUser()
    }
}
export default new AuthStore()
