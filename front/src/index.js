import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {LoginPage} from './routes/login/page';
import { RegistrationPage } from './routes/registration/page';
import React from 'react';
import { ChatPage } from './routes/chat/page';
import { AuthRequired } from './components/Auth/Required';
import { AuthProvider } from './components/Auth/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));

document.body.style.backgroundColor = '#333344';
document.body.style.color = '#DDDDDD';

root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route element={<AuthRequired redirect='/login'/>}>
                        <Route path="/chat" element={<ChatPage />} />
                    </Route>
                    <Route path='/' element={<Navigate to="/login"/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
