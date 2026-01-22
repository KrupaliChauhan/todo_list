import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import Login from "./components/Login";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/editTask/:index" element={<EditTask />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
