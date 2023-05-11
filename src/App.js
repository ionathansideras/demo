import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
