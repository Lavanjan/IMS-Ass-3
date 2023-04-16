import "./App.css";
import Dashboard from "./pages/Dashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "./pages/SignIn";

function App() {
  const token = useSelector((state) => state.authReducer.data);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={token ? <Dashboard /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={token ? <Navigate to="../home" /> : <SignIn />}
        />
      </Routes>
    </div>
  );
}

export default App;
