import {observable, action, makeObservable} from 'mobx'
import {Auth} from '../models'
import UserStore from "./user"
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
