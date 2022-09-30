import AllComponent from "./components/Admin/AllComponent";
import Login from "./components/Admin/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
function App() {
  // <AllComponent />
  const [state, setState] = useState(false);
  const [runEffetct, setRunEffect] = useState(true);
  // const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("aid");
    if (token) {
      setState(true);
      // navigate("/admin");/
    } else {
      // navigate("/");
      setState(false);
    }
    setRunEffect(false);
  }, [runEffetct]);
  return (
    <BrowserRouter>
      <Routes>
        {!state && (
          <Route path="/" element={<Login setRunEffect={setRunEffect} />} />
        )}
        {state && (
          <Route
            path="/"
            element={<AllComponent setRunEffect={setRunEffect} />}
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
