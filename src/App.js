import './App.css';
import React, {Suspense, lazy} from 'react'
import {Routes, Route} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const Home = lazy(() => import('./pages/Home'));
const History = lazy(() => import('./pages/History'));
const About = lazy(() => import('./pages/About'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

function App() {
    return (
        <>
            <Header/>
            <main>
                <Suspense fallback={<Loading/>}>
                    <Routes>
                        <Route path='/' element={<Home/>} exact/>
                        <Route path='/About' element={<About/>}/>
                        <Route path='/History' element={<History/>}/>
                        <Route path='/Login' element={<Login/>}/>
                        <Route path='/Register' element={<Register/>}/>
                    </Routes>
                </Suspense>
            </main>
            <Footer/>
        </>
    );
}

export default App;
