import React, {useRef} from 'react';
import {useStores} from "../stores";
import {observer,useLocalStore} from "mobx-react";
import {message, Upload,Spin} from "antd";
import {InboxOutlined} from '@ant-design/icons';
import styled from "styled-components";

const {Dragger} = Upload;
const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
`
const H1 = styled.h1`
  margin: 20px;
  text-align: center;
`
const Image = styled.img`
  max-width: 300px;
`

const Component = observer(() => {
  const widthRef = useRef()
  const heightRef = useRef()
  const { ImageStore,UserStore } = useStores();
  const store = useLocalStore(()=>({
    width:null,
    setWidth(width){
      store.width = width;
    },
    get widthStr () {
      return store.width?`/w/${store.width}`:''
    },
    height:null,
    setHeight(height){
      store.height = height;
    },
    get heightStr () {
      return store.height?`/h/${store.height}`:''
    },
    get fullStr(){
      return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
    },
  }))

  const bindWidthChange = () => {
    store.setWidth(widthRef.current.value)
  }
  const bindHeightChange = () => {
    store.setHeight(heightRef.current.value)
  }
  const props = {
    showUploadList: false,
    beforeUpload:file=>{
      ImageStore.setFile(file)
      ImageStore.setFilename(file.name)
      if(UserStore.currentUser === null) {
        message.warning('请先登录再上传！')
        return false;
      }
      window.file = file
      if(!/(svg|png|jpg|jpeg|gif)$/ig.test(file.type)){
        message.error('只能上传.svg/.png/.jpg/.jpeg/.gif格式的文件！')
        return false;
      }
      if(file.size > 1024* 1024){
        message.error('图片最大尺寸不能超过1M！')
        return false;
      }
      ImageStore.upload()
        .then((serverFile)=>{
          console.log('上传成功')
          console.log(serverFile)
        }).catch(()=>{
        console.log('上传失败')
      })
      return false;
    }
  }

  return (
    <>
      <Spin tip='上传中' spinning={ImageStore.isUploading}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或者拖拽上传图片</p>
          <p className="ant-upload-hint">
            仅支持.svg/.png/.jpg/.jpeg/.gif格式的图片，最大尺寸不能超过1M
          </p>
        </Dragger>
      </Spin>
      {
        ImageStore.serverFile ? <Result>
          <H1>上传结果</H1>
          <dl>
            <dt>完整路径</dt>
            <dd><a target='_blank' href={ ImageStore.serverFile.attributes.url.attributes.url}>
              {ImageStore.serverFile.attributes.url.attributes.url}</a></dd>
            <dd>文件名</dd>
            <dd>{ImageStore.filename}</dd>
            <dt>图片预览</dt>
            <dd>
              <Image src={ImageStore.serverFile.attributes.url.attributes.url} alt={ImageStore.filename}/>
            </dd>
            <dt>更多尺寸</dt>
            <dd>
              <input ref={widthRef} onChange={bindWidthChange} placeholder='最大宽度(可选)'/>
              <input ref={heightRef} onChange={bindHeightChange} placeholder='最大高度(可选)'/>
            </dd>
            <dd>
              <a target='_blank' href={store.fullStr}>{store.fullStr}</a>
            </dd>
          </dl>
        </Result> : null
      }
    </>
  );
})
export default Component;
