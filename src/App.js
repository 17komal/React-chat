import React from 'react'
import './App.css';
import Login from './component/Login/Login';
import Chat from './component/Chat/Chat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route  path="/React-chat" Component={Login}></Route>
        <Route  path='/chat' Component={Chat}></Route>
      </Routes>
    </Router>

  )
}

export default App

