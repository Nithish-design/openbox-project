import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Pages/Layout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={'/login'} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route path="/*" element={<h1>404 Page Not Found</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
