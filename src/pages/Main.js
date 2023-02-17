import { createContext,useMemo,useState } from "react"
import List from "../components/List";
import Total from "../components/Total"
import Header from "../components/Header";
//구현부
 const Main = ({ children, onClap }) => {
  
  // const Context = createContext()
  // const { Provider } = Context 
  //context 
  
  // const [clapState, setClapState] = useState()
  //state
  
  // const memoizedValue = useMemo(() => ({...clapState, }),
  //   [clapState]
  // )
  //memo
  

  //function
console.log(children)
  return (
    <>  
      {/* <Provider value={memoizedValue}>
          {children}
      </Provider> */}
      <div className="w-2/4 h-4/4 bg-white mx-auto" >
          {children}
      </div>
    </>
    )
}
// 사용부 
Main.List = List;
Main.Total = Total;
Main.Header =Header;

export default Main