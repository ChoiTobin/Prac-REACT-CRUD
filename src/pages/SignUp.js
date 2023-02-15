import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    Pw: ''
  });
  const [disable, setDisable] = useState(false);

  const { email, Pw } = inputs; 
  
  const onChange = (e) => {
    const { value, name } = e.target; 
    setInputs({
      ...inputs, 
      [name]: value 
    });
  };

  const onReset = () =>{
    const isValidEmail = inputs.email.includes('@') && email.includes('.');
    const isValidPassword = inputs.Pw.length >= 8 && inputs.Pw.length >= 1;
    
    if(isValidEmail && isValidPassword){
      fetch("https://pre-onboarding-selection-task.shop/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputs.email,
        password: String(inputs.Pw),

      }),
    }).then((response) => {
      if(response.status ===201){
        navigate("/signin");
      }
    } )
    setInputs({email:"",Pw:""})
    }else{
      setDisable(true)
    }
  }


  return (
    <>
      <input  name="email" placeholder="이메일" onChange={onChange} value={email} data-testid="email-input"/>
      <input type='password'  name="Pw" placeholder="비밀번호" onChange={onChange} value={Pw}  data-testid="password-input"/>
      <button   onClick={onReset} data-testid="signup-button" disabled={disable} >회원가입</button>   
    </>    
  )
}

export default SignUp
