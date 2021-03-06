import {observer} from "mobx-react";
import {useStores} from "../stores";
import {Form, Input, Button} from 'antd';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;
`
const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`
const Component = observer(() => {
    const {AuthStore} = useStores()
    const navigate = useNavigate()
    const layout = {
        labelCol: {span: 6},
        wrapperCol: {span: 18}
    }
    const tailLayout = {
        wrapperCol: {offset: 6, span: 18}
    }
    const onFinish = (values) => {
        console.log('Success:', values);
        const {username,password} = values
        AuthStore.setUsername(username)
        AuthStore.setPassword(password)
        AuthStore.register()
            .then(()=>{
                navigate('/')
                console.log('注册成功')
            }).catch((err)=>{
            console.log(err)
            console.log('注册失败,什么都不做')
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const Validators = {
        username(rule,value,callback){
            if(/W/.test(value)) return Promise.reject('不能出现字母数字下划线以外的字符')
            if(value.length < 3) return Promise.reject('用户名不能长度小于3')
            if(value.length > 10) return Promise.reject('用户名不能长度大于10')
            return Promise.resolve()
        }
    }
    const confirmPassword = ({getFieldValue}) => ({
        validator(rule,value) {
            if(!value || getFieldValue('password') === value ) return Promise.resolve()
            return Promise.reject('两次密码不匹配')
        }
    })

    return (
        <Wrapper>
            <Title> 注册 </Title>
            <Form
                name="basic"
                {...layout}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{required: true,message: '请输入用户名'},{validator:Validators.username}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{required: true,message: '请输入密码',}, {min: 4,message: '最少四个字符'}, {max: 10,message: '最多十个字符'}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    label="确认密码"
                    name="confirmPassword"
                    rules={[{required: true, message: '再次输入密码'},confirmPassword]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Wrapper>
    )
})

export default Component
