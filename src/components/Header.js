import React,{useState} from "react";
import LogoUrl from './logo.svg'
import {NavLink} from "react-router-dom";
import styled from "styled-components"
import {Button} from 'antd'
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
function Component() {
    const [isLogin,setLogin] = useState(false)
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
                    isLogin ? <><StyleButton type="primary" onClick={()=>setLogin(false)}>注销</StyleButton>
                    </> :<>
                        <StyleButton type="primary" onClick={()=>setLogin(true)}>登录</StyleButton>
                        <StyleButton type="primary">注册</StyleButton>
                    </>
                }
            </Login>
        </Header>
    )
}
export default Component
