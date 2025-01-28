import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import HomePage from './pages/HomePage.tsx';
import SignInPage from './pages/SignInPage.tsx';
import RegistrationPage from './pages/RegistrationPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<SignInPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
