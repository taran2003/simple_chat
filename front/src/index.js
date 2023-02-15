import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './routes/login/page';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/register" element={<Register />} />
                    <Route path="/chat" element={<Logout />} /> */}
                </Routes>
            </BrowserRouter>
    </React.StrictMode>
);