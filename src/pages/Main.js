import { createContext,useMemo,useState } from "react"
import List from "../components/List";
import Total from "../components/Total"

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

  return (
    <>  
      {/* <Provider value={memoizedValue}>
          {children}
      </Provider> */}
      {children}
    </>
    )
}
// 사용부 
Main.List = List;
Main.Total = Total;

export default Main