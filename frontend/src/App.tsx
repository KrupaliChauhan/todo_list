import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addTask"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editTask/:index"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
