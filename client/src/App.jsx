import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import { Sidebar } from "./components";

const App = () => {
  return (
    <Router>
      <div className="p-4 sm:-8 relative bg-[#13131a] min-h-screen flex flex-row text-white">
        <div className="hidden relative mr-10 sm:flex">
          <Sidebar />
        </div>
        <div className="sm:pr-5 max-sm:w-full max-w-[1280px] flex-1 mx-auto">
          Navbar
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
