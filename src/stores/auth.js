import {observable, action, makeObservable} from 'mobx'
import {Auth} from '../models'
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
                    console.log('登录成功')
                    resolve(user)
                })
                .catch(err=>{
                    console.log('登录失败')
                    reject(err)
                })
        })
    }
    @action register() {
        return new Promise((resolve,reject)=>{
            const {username,password} = this.values
            Auth.register(username,password)
                .then(user=>{
                    console.log('注册成功')
                    resolve(user)
                }).catch(err=>{
                    console.log('注册失败')
                    reject(err)
                })
        })
    }
    @action logout() {
        Auth.logout()
    }
}
export {AuthStore}
