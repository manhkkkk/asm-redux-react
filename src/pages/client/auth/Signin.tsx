import React from 'react'
import { useState } from 'react';
import { loginUser, registerUser } from '../../../redux/actions';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import facebook from '../../../lib/img/facebook.png';
import google from '../../../lib/img/google.png';
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, cssTransition } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e:any) =>{
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    loginUser(newUser, dispatch) ;
    navigate('/')
    toast('🦄 Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  return (
          <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center'}}>
            <Form>
            <form style={{display: 'flex',borderRadius: '10px',backgroundColor: 'white'}} onSubmit={handleLogin}>
                <div style={{ padding: '20px', width: '250px'}}>
                <Link to="/signup"><div style={{color: 'black',fontSize: '20px', fontWeight: 'bold'}}>Signip</div></Link>
                <div>
                  <Label>Email</Label>
                  <input type="email" style={{ width: '100%', border: '1px solid #dadada'}} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                  <Label>Password</Label>
                  <input type="password" style={{ width: '100%', border: '1px solid #dadada'}} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                
                 <Button>
                 <button  style={{width: '100%', border: 'none', backgroundColor: 'rgb(250 93 93)', padding: '4px 0',color: 'white', font: ' Roboto,Arial,sans-serif'}}>Signin</button>
                 </Button>
                 <div>
                  <span>Hoặc đăng nhập bằng</span>
                </div>
                <div style={{margin: 10}}>
                  <img style={{width: 30 , marginRight: 7}} src={facebook} alt="" />
                  <img style={{width: 30}} src={google} alt="" />
                </div>
                </div>
                <div style={{backgroundColor:"#f6f6f6", padding: '50px' , display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                  <img style={{ width: '40px', height: '40px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGEYEpW1vU6CUR0j02DyPoWtcoapc34tkhkMSgWG7kHw&s" alt="loi"/>
                </div>
            </form>
            </Form>
          </div>
          </>
  )
};

const Form = styled.div`
  border: none;
   cursor: pointer;
   overflow: hidden;
   box-shadow: 0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%);
   transform: rotateY(0deg);
   transform-style: preserve-3d;
   transition: all 1s ease-out;
   position: relative;
   border-radius: 20px;
`
const Label = styled.div`
  text-align: left;
`
const Button = styled.div`
margin: 6px 0;
padding: 2px 0;
`
export default Signin