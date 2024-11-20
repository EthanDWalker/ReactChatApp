import Join from "./components/Join";
import Room from "./components/Room";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

export default function App() {
  return (
    <div className="bg-first h-screen text-white">
      <Router>
        <Routes>
          <Route path="/rooms/:roomId" element={<Room />} />
          <Route path="/join" element={<Join />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
    </div>
  );
}
