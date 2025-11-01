import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import PrivateRoute from './components/Auth/PrivateRoute';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CategoriesPage from './pages/CategoriesPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route 
                  path="/categories" 
                  element={
                    <PrivateRoute>
                      <CategoriesPage />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/create-post" 
                  element={
                    <PrivateRoute>
                      <CreatePost />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/edit-post/:id" 
                  element={
                    <PrivateRoute>
                      <EditPost />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;