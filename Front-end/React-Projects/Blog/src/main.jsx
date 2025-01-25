import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx';
import AllPosts from './pages/AllPosts.jsx'
import Post from './pages/Post.jsx';
import UpdatePost from './pages/UpdatePost.jsx';
import CreatePost from './pages/CreatePost.jsx';
import {AuthLayout} from './components';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path="" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/all-posts" element={<AuthLayout authentication><AllPosts/></AuthLayout>}/>
      <Route path="/create-post" element={<AuthLayout authentication><CreatePost/></AuthLayout>}/>
      <Route path="/post/:id" element={<AuthLayout authentication><Post/></AuthLayout>}/>
      <Route path="/post/update/:fileId" element={<AuthLayout authentication><UpdatePost/></AuthLayout>}/>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
  </Provider>,
)
