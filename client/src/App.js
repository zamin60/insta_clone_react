import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/screens/Navbar'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home';
import Signup from './components/screens/Signup';
import Signin from './components/screens/Signin';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';
import UserProfile from './components/screens/UserProfile';
import {reducer,initialState} from './reducers/userReducer';
import './App.css'
import SubscribedUserPosts from './components/screens/SubscribedUserPosts'

export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"))

    if(user){
      dispatch({type:"USER",payload:user})
    
    }
    else{
      history.push('/signin')
    }
      

    if(user){
      
    }
    else{
      history.push('/signin')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/profile">
          <Profile/>
        </Route>
        <Route path="/signin"> 
          <Signin/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/create">
          <CreatePost/>
        </Route>
        <Route path="/profile/:userid">
          <UserProfile/>
        </Route>
        <Route path="/myfollowingpost"> 
          <SubscribedUserPosts/>
        </Route>
    </Switch>
  )
}

function App() {
  const[state,dispatch] = useReducer(reducer,initialState)
  console.log(state)
  console.log("in app")
  return (
    <UserContext.Provider value = {{state,dispatch}}>
    <BrowserRouter>
        <Navbar />
        <Routing />
        
    </BrowserRouter>
    </UserContext.Provider>

  );
}

export default App;
