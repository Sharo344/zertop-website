import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { PropertyProvider } from "./context/PropertyContext";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import DashboardLayout from "./components/layout/DashboardLayout";

// Auth Components
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Dashboard Components
import Overview from "./components/dashboard/Overview";
import SavedProperties from "./components/dashboard/SavedProperties";
import Appointments from "./components/dashboard/Appointments";
import Profile from "./components/dashboard/Profile";
import Settings from "./components/dashboard/Settings";
import MyProperties from "./components/dashboard/MyProperties";
import AddProperty from "./components/dashboard/AddProperty";
import EditProperty from "./components/dashboard/EditProperty";

function App() {
  return (
    <Router>
      <AuthProvider>
        <PropertyProvider>
          <div className="App">
            {/* Toast Notifications */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />

            <Routes>
              {/* Public Routes with Navbar & Footer */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Home />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/properties"
                element={
                  <>
                    <Navbar />
                    <Properties />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/properties/:id"
                element={
                  <>
                    <Navbar />
                    <PropertyDetails />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/about"
                element={
                  <>
                    <Navbar />
                    <About />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/contact"
                element={
                  <>
                    <Navbar />
                    <Contact />
                    <Footer />
                  </>
                }
              />

              {/* Auth Routes (No Navbar/Footer) */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Dashboard Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <DashboardLayout>
                      <Overview />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/saved"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <DashboardLayout>
                      <SavedProperties />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/appointments"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <DashboardLayout>
                      <Appointments />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/profile"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <DashboardLayout>
                      <Profile />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/settings"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <DashboardLayout>
                      <Settings />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              {/* Agent/Admin Only Routes */}
              <Route
                path="/dashboard/properties"
                element={
                  <ProtectedRoute requiredRole="agent">
                    <Navbar />
                    <DashboardLayout>
                      <MyProperties />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/add-property"
                element={
                  <ProtectedRoute requiredRole="agent">
                    <Navbar />
                    <DashboardLayout>
                      <AddProperty />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/edit-property/:id"
                element={
                  <ProtectedRoute requiredRole="agent">
                    <Navbar />
                    <DashboardLayout>
                      <EditProperty />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </PropertyProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
