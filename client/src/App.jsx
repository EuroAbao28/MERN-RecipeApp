import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import SavedRecipe from "./pages/SavedRecipe";
import SideNav from "./components/SideNav";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TopNav from "./components/TopNav";

function App() {
  return (
    <Router>
      <div className="App">
        <SideNav />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/saved-recipes" element={<SavedRecipe />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
