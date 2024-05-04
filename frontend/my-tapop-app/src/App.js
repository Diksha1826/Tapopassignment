import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
