import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import BackNavbar from './components/layout/BackNavbar';
import SignIn from './pages/auth/SignIn';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* No navbar */}
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />

          {/* With back navbar */}
          <Route path="/create-post" element={
            <>
              <BackNavbar />
              <main style={{ padding: 24 }}>
                <CreatePost />
              </main>
            </>
          } />

          {/* With main navbar */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main style={{ padding: 24 }}>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </main>
            </>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}