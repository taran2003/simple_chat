import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './routes/login/page';
import { RegistrationPage } from './routes/registration/page';

const root = ReactDOM.createRoot(document.getElementById('root'));

document.body.style.backgroundColor = '#333344';

root.render(
    <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    {/* <Route path="/register" element={<Register />} />
                    <Route path="/chat" element={<Logout />} /> */}
                </Routes>
            </BrowserRouter>
    </React.StrictMode>
);
