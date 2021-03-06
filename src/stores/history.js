import {observable, action, makeObservable} from 'mobx'
import {Uploader} from "../models";
import {message} from "antd"

class HistoryStore {
  constructor() {
    makeObservable(this)
  }
  @observable list = [];
  @observable isLoading = false;
  @observable hasMore = true;
  @observable page = 0;
  limit = 10;

  @action append(newList) {
    this.list = [...this.list, ...newList];
  }
  @action find() {
    this.isLoading = true;
    Uploader.find({page:this.page,limit:this.limit})
      .then(newList => {
        this.append(newList);
        this.page++;
        if(newList.length < this.limit) {
          this.hasMore = false;
        }
      }).catch(error => {
        message.error('加载数据失败');
      }).finally(() => {
      this.isLoading = false;
    })
  }
  @action reset() {
    this.list = [];
    this.page = 0;
    this.isLoading = false;
    this.hasMore = true;
  }
}
export default new HistoryStore()
