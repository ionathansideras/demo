import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <HashRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
