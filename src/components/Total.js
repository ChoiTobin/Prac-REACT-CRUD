import {React,useEffect,useState} from 'react'

const Total = () => {

  let [inputValue,setInputValue] = useState({text:""})
  const {text} = inputValue
  let access_token = localStorage.getItem('access_token')
  
  const onChange = (e) => {
    const {value,name} = e.target;
    setInputValue({
    ...inputValue,
    [name]:value
  })}
  const addServer = () => {


    fetch("https://pre-onboarding-selection-task.shop/todos", {
      method: "POST",
      headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: inputValue.text,
      }),
    }).then(response => {
   
      

    })
  }

  
  return (
    <>
      <input onChange={onChange} name="text" type="text" value={text} data-testid="new-todo-input" />
      <button onClick={addServer} data-testid="new-todo-add-button">추가</button>
    </>
  )
}

export default Total
