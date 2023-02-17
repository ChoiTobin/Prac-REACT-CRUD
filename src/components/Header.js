import {React,useState} from 'react'

const Header = () => {
    const [toggle,setToggle] = useState(true)
    console.log(toggle)
  return (
    <div className='mx-auto w-4/4 h-4/4 bg-stone-400'>
        <span onClick={() =>{setToggle(!toggle)}}> 메뉴</span>

    </div>
  )
}

export default Header


