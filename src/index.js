import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Outlet, Link, Switch } from "react-router-dom";
import AddStudent from './pages/AddStudents.js'
import StudentList from './pages/StudentList.js'
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="home" element={<StudentList />} />
        <Route path="add" element={<AddStudent />} />
        <Route path="update/:id" element={<AddStudent />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
