import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import ResetPassword from './Components/ResetPassword.jsx';
import Dashboard from './Components/Dashboard.jsx';
import Allpost from './Components/Allpost.jsx';
import Createpost from "./Components/Createpost.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<Dashboard /> }>
          <Route index element={<Allpost />} />
          <Route path="allpost" element={<Allpost />} />
          <Route index element={<Createpost />} />
          <Route path="createpost" element={<Createpost />} />
       
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
