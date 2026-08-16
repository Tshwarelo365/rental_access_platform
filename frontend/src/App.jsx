
import Login from "./pages/Login"
import Properties from "./pages/Properties"
import CreateProperty from "./pages/CreateProperty"
import LandlordDashboard from "./pages/LandlordDashboard"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Register from "./pages/Register"
import LandlordApplications from "./pages/LandlordApplications"
import MyApplications from "./pages/MyApplications"

const role = localStorage.getItem("role")
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-property" element={<CreateProperty />} />
      <Route
        path="/dashboard"
        element={role === "landlord" ? <LandlordDashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/landlord-applications"
        element={<LandlordApplications />}
      />
      <Route
        path="/my-applications"
        element={<MyApplications />}
      />
    </Routes>
    
  )
}

export default App