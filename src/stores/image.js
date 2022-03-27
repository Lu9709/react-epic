import {observable,action} from 'mobx'
import {Uploader} from "../models";

class ImageStore {
    @observable filename = ''
    @observable file = null
    @observable isUploading = false
    @observable serverFile = null


    @action setFilename(newFilename){
        this.filename = newFilename
    }

    @action setFile(newFile){
        this.file = newFile
    }

    @action upload(){
        this.isUploading = true
        return new Promise((resolve,reject)=>{
            Uploader.add(this.file,this.filename)
                .then(serverFile=>{
                    this.serverFile = serverFile
                    resolve(serverFile)
                }).catch(err=>{
                    reject(err)
            }).finally(()=>{
                this.isUploading = false
            })
        })
    }
}
export default ImageStore
