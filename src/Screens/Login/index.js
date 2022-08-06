import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

// images
import background from '../../Assets/images/login-bg.jpg'
import logo from '../../Assets/images/logo.png'


const Login = () => {

  // localStorage.removeItem('token');

  // console.log(localStorage.getItem('token'))
  
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameText, setUsernameText] = useState(null);
  const [passwordText, setPasswordText] = useState(null);


  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      navigate("/patients");
      console.log("=====");
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username !== '' && password !== '') {
      try {
        const response = await axios({
          method : 'POST',
          data: {
            "user" : username,
            "password" : password,
          },
          url : 'https://emrtest.genensys.com/rpm/login'
        });
        console.log(response, '======')
        let token = response.data.token;
        if (token !== null) {
            localStorage.setItem('token', token);
            navigate("/patients");
        }else{
          setUsernameText("2");
          setPasswordText("2");
          console.log(password);
        }
      } catch (error) {
        console.log(error);
      }
    }
    else{
      if (username === '') {
        setUsernameText("1");
        if(password === ''){
          setPasswordText("1")
        }
      }
      if(username !== '' ){
        setUsernameText("2");
      }
      if(password === ''){
        setPasswordText("1")
      }
      if(password !== ''){
        setPasswordText("2")
      }
    }
  }

  return (
    <div className='login-wrapper' style={{ backgroundImage: `url(${background})` }}>
      <div className='login-card bg-white p-5'>
          <div className='logo mb-5 mt-5'>
            <img src={logo} className='object-cover h-10 w-40 mx-auto' alt='' />
          </div>
          <h4 className='mb-5 text-lg color-primary'>Sign In</h4>
          <form onSubmit={handleSubmit}>
            <div className='form-field mb-3'>
              <label htmlFor='username' className='mb-1 text-xs text-gray-600 inline-block'>Username</label>
              <input 
                type='text' 
                autoComplete='on' 
                autoSave='on' 
                className='w-full px-4 py-1 bg-gray-100 focus:outline-none border border-gray-400 rounded-full' 
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                onFocus={()=>setUsernameText(null)}
                />
              <div className='text-xs text-rose-700'>{usernameText === "1" ? "Please fill the Username" : usernameText === "2" && "Wrong Username" }</div>
            </div>
            <div className='form-field mb-5'>
              <label htmlFor='username' className='mb-1 text-xs text-gray-600 inline-block'>Password</label>
              <input 
                type='password' 
                autoComplete='on' 
                autoSave='on' 
                className='w-full px-4 py-1 bg-gray-100 focus:outline-none border border-gray-400 rounded-full' 
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                onFocus={()=>setPasswordText(null)}
              />
              <div className='text-xs text-rose-700'>{passwordText === "1" ? "Please fill the Password" : passwordText === "2" && "Wrong Password" }</div>
            </div>
            <div className='form-btn mb-4'>
              <button type='submit' className='btn text-sm font-normal leading-4 ripple block w-full py-2 px-5 bg-purple-700 mb-2 text-white  rounded-full'>Sign In</button>
            </div>
            <div className='form-btn mb-6'>
              <button type='button' className='btn text-sm font-normal leading-4 ripple block w-full py-2 px-5 bg-purple-700 mb-2 text-white  rounded-full'>Create an account</button>
            </div>
            <p className='hover:text-purple-500 underline text-gray-600 text-center cursor-pointer mb-5'>Forgot Password?</p>
          </form>
      </div>
    </div>
  )
}

export default Login