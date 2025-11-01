import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Landing = () => {
  const { user } = useAuth();

  if (user) {
    return null;
  }

  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Share Your Stories with the World</h1>
          <p className="hero-subtitle">
            A modern blogging platform built for writers, thinkers, and creators. 
            Express yourself, connect with readers, and build your community.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-hero btn-primary">
              Get Started Free
            </Link>
            <Link to="/login" className="btn-hero btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Everything You Need to Blog</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✍️</div>
            <h3>Write & Publish</h3>
            <p>Create beautiful blog posts with rich content and featured images</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📁</div>
            <h3>Organize Categories</h3>
            <p>Keep your content organized with custom categories</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Engage Readers</h3>
            <p>Build community with comments and discussions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Discover Content</h3>
            <p>Search and filter posts to find exactly what you need</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Beautiful Design</h3>
            <p>Modern, clean interface that puts your content first</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast & Secure</h3>
            <p>Built with modern technology for speed and security</p>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Your Account</h3>
            <p>Sign up in seconds and start your blogging journey</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Set Up Categories</h3>
            <p>Organize your content by creating custom categories</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Write Your First Post</h3>
            <p>Share your thoughts, add images, and publish to the world</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Grow Your Audience</h3>
            <p>Engage with readers through comments and build your community</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Start Blogging?</h2>
        <p>Join our community of writers and share your voice</p>
        <Link to="/register" className="btn-cta">
          Create Your Free Account
        </Link>
      </section>
    </div>
  );
};

export default Landing;