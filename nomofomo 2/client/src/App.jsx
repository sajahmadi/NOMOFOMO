import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import { authAtom } from "./atoms/authAtom";
import Dashboard from "./Pages/Dashboard";
import Event from "./Pages/Event";

function App() {
  // Global State
  const [auth, setAuth] = useRecoilState(authAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get token and user from localstorage
    const token = localStorage.getItem("__NOMOFOMO_TOKEN");
    const user = localStorage.getItem("__NOMOFOMO_USER");

    // if token and user exists, set auth
    if (token && user) {
      setAuth({
        isAuthenticated: true,
        token,
        user: JSON.parse(user),
      });
    }
    setLoading(false);
  }, [setAuth]);

  if (loading)
    return (
      <div className="w-screen h-screen flex justify-center items-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-primary-500 title">
        <p>Loading...</p>
      </div>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />

        {/* Protected Routes */}
        <Route
          element={<ProtectedRoutes authenticated={auth.isAuthenticated} />}
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/event/:eventId" element={<Event />} />

          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
