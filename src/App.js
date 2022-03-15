import * as React from "react";
import { Router, Routes, Route, Outlet, Link, Switch } from "react-router-dom";
import AddStudent from './pages/AddStudents.js'
import StudentList from './pages/StudentList.js'
import './App.css';

function App() {
  return (

    <div className="App">
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/home">Home</Link> |{" "}
        <Link to="/add">Add</Link>
      </nav>
      <Outlet />
    </div>

  );
}


export default App;
