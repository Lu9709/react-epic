import React, {useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {List,Skeleton, Divider} from "antd";
import {observer} from 'mobx-react';
import {useStores} from "../stores";
import styled from "styled-components";

const Img = styled.img`
  width: 100px;
  height: 120px;
  object-fit: contain;
  border: 1px solid #eee;
`
const EndMsg = ()=>{return (<><Divider plain>It is all, nothing more 🤐</Divider></>)}

const Component = observer(() => {
  const {HistoryStore,UserStore} = useStores();


  const loadMore = () => {
    HistoryStore.find();
  };

  const options = {
    dataLength: HistoryStore.list.length,
    initialLoad: true,
    pageStart: 0,
    next: () => loadMore(),
    // loader: () => {return (<> { UserStore.currentUser ? <Skeleton avatar paragraph={{ rows: 1 }} active /> : '' }</>)},
    endMessage: UserStore.currentUser ? EndMsg() : '',
    hasMore: !HistoryStore.isLoading && HistoryStore.hasMore,
    useWindow: true,
  }

  useEffect(()=>{
    if(UserStore.currentUser) loadMore()
    return ()=>{
      HistoryStore.reset()
    }
  },[]);

  return (
    <>
      <InfiniteScroll {...options}>
        <List
          dataSource={HistoryStore.list}
          renderItem={item =>
            <List.Item key={item.id}>
              <div>
                <Img src={item.attributes.url.attributes.url} alt={item.attributes.fileName}/>
              </div>
              <div>
                <h5>{item.attributes.filename}</h5>
              </div>
              <div>
                <a target='_blank' href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a>
              </div>
            </List.Item>
          }
        />
      </InfiniteScroll>
    </>
  )
})
export default Component;
