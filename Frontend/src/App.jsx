import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Farms from "./pages/Farms.jsx";
import Crops from "./pages/Crops.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="/farms" element={<ProtectedRoute> <Farms /> </ProtectedRoute>} />
        <Route path="/farms/:farmId/crops" element={<ProtectedRoute> <Crops/> </ProtectedRoute>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;