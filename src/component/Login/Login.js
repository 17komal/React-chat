import React, { useState } from 'react';
import './Login.css';
import Logo from '../../img/logo3.png';
import { Link } from 'react-router-dom';
let user = '';
const Login = () => {
    const [name,setName] =useState('');
    const getUser = () =>{
       
        user = document.getElementById('loginInput').value;
        document.getElementById('loginInput').value='';
        
    }
   
    return (
        <div className='login'>
            <div className='loginContainer'>
                <div className='loginHeader'>
                    <div id='loginTitle'> 
                    <img id='loginLogo' src={Logo} alt='Log' /> 
                    <p>CHAT</p>
                    </div>
                </div>
              
                <div className='loginBody'>
                    <input id="loginInput" placeholder='ENTER YOUR NAME' onChange={(e) =>setName(e.target.value)} />
                </div>
                <div className='loginFooter'>

                 <Link onClick={(e) => !name ? e.preventDefault():null} to='/chat' className='loginBtnLink'>  <button onClick ={getUser} className='loginBtn'> Login</button></Link> 

                </div>
            </div>

        </div>
    )
}

export default Login;
export {user};
