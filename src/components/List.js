import { useState, useEffect } from "react";

const List = () => {
  const [todos, setTodos] = useState([]);
  const [editTg, setEditTg] = useState({ id: 0, isEdit: true });


  let [inputValue,setInputValue] = useState({text:""})
  
  const {text} = inputValue

  let access_token = localStorage.getItem('access_token');

  useEffect(() => {
    fetch("https://pre-onboarding-selection-task.shop/todos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then(response => {
      return response.json();
    }).then(data => {
      setTodos(data);
    }).catch(error => {
      console.error(error);
    });
  }, );

  const editToggleHandler = (postId) => {
    const newEdit = {
      id: postId,
      isEdit: !editTg.isEdit,
    };
    setEditTg(newEdit);
    setInputValue((prevState) => ({
      ...prevState, text:""
    }))

  };



  const onChange = (e) => {
    const {value,name} = e.target;
    setInputValue({
    ...inputValue,
    [name]:value

  })
}

  const saveFunction = (id) => {
    fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: inputValue.text,
        isCompleted:true
      }),
    }).then(response => {
      console.log(response)
    
    })

  }
  const deleteToggleHandler =(id) =>{
    fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then(response => {
      console.log(response)
    
    })
  }

  return (
    <>
      {
      todos.map((todo) => (
        <li key={todo.id}>
          <label>
            <input type="checkbox" />
            <span>{todo.todo}</span>
          </label>
          {editTg.isEdit == false && editTg.id == todo.id ? (
            <>
             <input onChange={onChange} name="text" value={text} type="text" />
              <button onClick={()=> saveFunction(todo.id)} >저장</button>
              <button onClick={() => setEditTg({id: 0, isEdit: true})}>취소</button>
            
            </>
            
          ) 
          : (
            <>
              <button onClick={() => {editToggleHandler(todo.id)}}>수정</button>
              <button onClick={()=> {deleteToggleHandler(todo.id)}}>삭제</button>
           


             </>
          )}
        </li>
      ))}
    </>
  );
};

export default List;
