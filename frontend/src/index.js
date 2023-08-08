import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../src/styles/App.css'


import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import DashBoard from './components/pages/DashboardPage';
import HomePage from './components/pages/HomePage';
import CreatePostPage from './components/pages/CreatePostPage';
import PostDetailPage from './components/pages/PostDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App><HomePage></HomePage></App>,
  },
  {
    path:'/dashboard/:id',
    element: <App><DashBoard></DashBoard></App>
  },
  {
    path:'/dashboard/:id/posts/create',
    element: <App><CreatePostPage></CreatePostPage></App>
  },
  {
    path:'/post/:id',
    element:<App><PostDetailPage></PostDetailPage></App>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,500;0,700;1,500;1,700&family=Pangolin&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet"/>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
