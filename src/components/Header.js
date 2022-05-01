import React from "react";
import LogoUrl from './logo.svg'
import {NavLink,useNavigate} from "react-router-dom";
import styled from "styled-components"
import {Button} from 'antd'
import {useStores} from '../stores'
import {observer} from "mobx-react";

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 100px;
  background-color: #02101f;
  color: #fff;
`
const Logo = styled.img`
  height: 30px
`
const StyledLink = styled(NavLink)`
  color: #fff;
  margin-left: 30px;
  &.active {
    border-bottom: 1px solid #fff;
  }
`
const Login = styled.div`
  margin-left: auto;
`
const StyleButton = styled(Button)`
  margin-left: 10px;
`
const Component = observer(() => {
    const navigate = useNavigate()
    const {UserStore,AuthStore} = useStores()
    const handleLogin = ()=>{
        navigate('/login')
    }
    const handleLogout = ()=>{
        AuthStore.logout()
        navigate('/login')
    }
    const handleRegister = ()=>{
        navigate('/register')
    }
    return (
        <Header>
            <Logo src={LogoUrl}/>
            <nav>
                <StyledLink to="/" activeclassname="active" exact={'true'}>首页</StyledLink>
                <StyledLink to="/history" activeclassname="active">历史</StyledLink>
                <StyledLink to="/about" activeclassname="active">关于我</StyledLink>
            </nav>
            <Login>
                {
                    UserStore.currentUser ? <>
                        {UserStore.currentUser.attributes.username} <StyleButton type="primary" onClick={handleLogout}>注销</StyleButton>
                    </> :<>
                        <StyleButton type="primary" onClick={handleLogin}>登录</StyleButton>
                        <StyleButton type="primary" onClick={handleRegister}>注册</StyleButton>
                    </>
                }
            </Login>
        </Header>
    )
})
export default Component
