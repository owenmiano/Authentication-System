import Login from "./pages/Login";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContextProvider";
import Register from "./pages/Register";

function App() {
  const { user, token, ToastContainer } = useContext(AuthContext);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
