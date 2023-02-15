import {React,useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";



  function SignIn() {
    
    const navigate = useNavigate();
    let [inputValue,setInputValue] = useState({
      email:"",
      password:""
    })

    const {email,password} = inputValue

    const onChange = (e) => {
      const { value, name } = e.target; 
      setInputValue({
      ...inputValue, 
      [name]: value 
    });
    }

  const nextPageHandler = () => {
    const isValidEmail = inputValue.email.includes('@') && inputValue.email.includes('.');
    const isValidPassword = inputValue.password.length >= 8 && inputValue.password.length >= 1;
    
    if(isValidEmail && isValidPassword){
      
      fetch("https://pre-onboarding-selection-task.shop/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputValue.email,
        password: String(inputValue.password),
      }),
    })
    .then(response => {
      if(response.status == 200){
        setInputValue({email:"",password:""})
        response.json()  
    .then((response) => {

      localStorage.setItem('access_token', response.access_token);
        navigate("/main");
        })
      }
    }
      //response.json()으로 json으로 바꿔준후 .then안에 response값으로 access_token을 받을수 있다
      //기존 response에는 이전 status등 값이 나오지 않음 json으로 바꾼후에는 
    )
  }else{
    alert("틀렸습니다 ^^!")
    }
  }

  
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
     navigate("/main");
    }
  }, []);
  //signIn으로 접근할때 access_token을 가지고 있으면 main으로

  return (
    <>
      <input name="email" type='email' onChange={onChange} value={email}/>
      <input name="password" type='password' onChange={onChange} value={password}/>
      <button onClick={nextPageHandler}>버튼</button>
    </>
  )
}

export default SignIn
