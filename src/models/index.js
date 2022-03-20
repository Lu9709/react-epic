import AV,{Query,User} from "leancloud-storage";

AV.init({
    appId: "FqKCj2VbsTgmnDK0mS7ne9DO-gzGzoHsz",
    appKey: "Q23i6gbdRerQOw9C9HhgYTdr",
    serverURL: "https://fqkcj2vb.lc-cn-n1-shared.com"
});

console.log('start...')

const Auth = {
    register(username,password){
        let user = new User();
        user.setUsername(username)
        user.setPassword(password)
        return new Promise((resolve,reject)=>{
            user.signUp().then(loginedUser => resolve(loginedUser),error => reject(error))
        })
    },
    login(username,password){
        return new Promise((resolve,reject)=>{
            User.logIn(username,password).then(loginedUser=> resolve(loginedUser),error=>reject(error))
        })
    },
    logout(){
        User.logOut()
    },
    getCurrentUser(){
        return User.current();
    }
}

export {
    Auth
};

