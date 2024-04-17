import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login"
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dasgboard";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
