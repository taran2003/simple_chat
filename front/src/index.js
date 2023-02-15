import './CSS/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Routes/Login';
import Register from './Routes/Register';
import Main from './Routes/Main';
import Comment from './Routes/Comments';
import User from './Routes/User';
import PrivateRoute from './Routes/PrivateRoute';
import AuthProvider from './Providers/AuthProvider';
import PostProvider from './Providers/PostProvider';
import CommentProvider from './Providers/CommentProvider';
import lab3 from './Lab3';
import Logout from "./Routes/Logout";
import PostCreate from './Routes/AddPost';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/chat" element={<Logout />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);