import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import CompleteProject from './pages/CompleteProject'
import CreateProject from './pages/CreateProject'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'
import AuthPage from './pages/AuthPage'
import { Navigate } from 'react-router-dom'
import UpdatePage from './pages/UpdatePage'
import DashboardCollab from './collaborator/pages/DashboardCollab'
import HomePage from './pages/HomePage'
import LoginPage from "./pages/LoginPage";
import UserProfile from './pages/UserProfile'
import BlogDetail from './pages/BlogDetail'
import CreateBlog from './pages/CreateBlog'



function App() {
  console.log(userAtom);
  const user = useRecoilValue(userAtom);
  console.log(user);

  return (
    <>
    <Routes>
       <Route path='/*' element={user ? user.type==='creator' ? <Dashboard/> :<DashboardCollab/> : <LoginPage/>} />
       <Route path='/auth' element={!user ? <LoginPage /> : <Navigate to="/"/>} />     
       <Route path='/update' element={user ? <UpdatePage /> : <Navigate to="/auth"/>} />
       <Route path='/project/:id' element={user ? <CompleteProject /> : <Navigate to="/"/>} />
        <Route path='/create' element={user ? <CreateProject /> : <Navigate to="/"/>} />
        <Route path="/chats" element={user ? <HomePage /> : <Navigate to="/"/>} />
        <Route path="/user/:id" element={user ? <UserProfile/> : <Navigate to="/"/>}/>
        <Route path="/blog/:blogId" element={<BlogDetail />} />
        <Route path="/createblog" element={<CreateBlog />} />


        

       
      </Routes>
    
    </>
  )
}

export default App
