import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/style.css';
import ContextProvider from './components/context/context';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/login';
import SignUp from './pages/signUp';
import UserDetail from './pages/userDetails';
import NotFound from './pages/notFound';

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/user-details" element={<PrivateRoute><UserDetail /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
