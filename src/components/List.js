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
    <div className="bg-green-600 border-solid border-8 border-stone-500">
      {
      todos.map((todo) => (
        
        <li  className="w-2/4 h-2/4 mx-auto list-none " key={todo.id}  >
           <div className="py-1"> 
              <label>
                <input type="checkbox" className="form-checkbox h-5 w-11 "/>
                <span className="font-bold bg-">{todo.todo}</span>
              </label>
            </div>
            {editTg.isEdit == false && editTg.id == todo.id ? (
              <>
                <input className="font-bold	bg-blue-200 text-white py-1 px-2 rounded" onChange={onChange} name="text" value={text} type="text" />
                  <div className="py-1">
                    <button className='font-bold bg-blue-500 border-2 border-blue-600/50 rounded' onClick={()=> saveFunction(todo.id)} >저장</button>
                    <button className='mx-3 font-bold bg-gray-500 border-2 border-gray-600/50 rounded' onClick={() => setEditTg({id: 0, isEdit: true})}>취소</button>
                  </div>
              </>
            ) : (
              <>
                <button className='font-bold bg-blue-500 border-2 border-blue-600/50 rounded' onClick={() => {editToggleHandler(todo.id)}}>수정</button>
                <button className='mx-3 font-bold bg-gray-500 border-2 border-gray-600/50  rounded' onClick={()=> {deleteToggleHandler(todo.id)}}>삭제</button>
              </>
            )}
             
        </li>
      ))}
      </div>
    </>
  );
};

export default List;
