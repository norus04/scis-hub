import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    try {
      await signIn(email, password);
      navigate('/home');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('Unable to find account with given email address.');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between', fontFamily: 'Familjen Grotesk, sans-serif' }}>

      <div style={{ padding: '16px 24px' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#082E58', fontSize: 14, fontFamily: 'Familjen Grotesk, sans-serif' }}>
          ← Back
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>

        <div style={{ background: '#D6E8F7', borderRadius: 24, padding: '32px 80px', textAlign: 'center', width: 500, boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
            <img src="/images/Icon_UMaine_Transparent.png" alt="UMaine logo" style={{ height: 48 }} />
            <h1 style={{ margin: 0, fontSize: 36, fontWeight: 'bold', color: '#082E58', fontFamily: 'teko' }}>SCIS Hub</h1>
          </div>
          <p style={{ margin: 0, color: '#555', fontSize: 16 }}>School of Computing and Information Science Success Tips Website</p>
        </div>

        {error && (
          <div style={{ background: '#fde8e8', border: '1px solid #f5c6c6', borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, width: 500, boxSizing: 'border-box' }}>
            <span style={{ fontSize: 14, color: '#922' }}><strong>Error:</strong> {error}</span>
            <button onClick={() => setError('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>×</button>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 500 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: '14px 20px', borderRadius: 30, border: '1.5px solid #082E58', fontSize: 16, outline: 'none', fontFamily: 'Familjen Grotesk, sans-serif' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '14px 20px', borderRadius: 30, border: '1.5px solid #082E58', fontSize: 16, outline: 'none', fontFamily: 'Familjen Grotesk, sans-serif' }}
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, justifyContent: 'center', color: '#082E58' }}>
            <input type="checkbox" checked={keepSignedIn} onChange={e => setKeepSignedIn(e.target.checked)} />
            Keep Me Signed In
          </label>
          <button onClick={handleSubmit} style={{ padding: '16px', borderRadius: 16, background: '#D6E8F7', color: '#082E58', border: '1.5px solid #082E58', fontSize: 22, cursor: 'pointer', fontWeight: 500, fontFamily: 'teko' }}>
            Sign In
          </button>
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '16px', borderTop: '1px solid #ddd', fontSize: 14, color: '#555' }}>
        <span onClick={() => navigate('/about')} style={{ margin: '0 16px', cursor: 'pointer' }}>About Us</span>
        <a href="mailto:kkidder@maine.edu" style={{ margin: '0 16px', color: '#555', textDecoration: 'none' }}>Contact Us</a>
        <span style={{ margin: '0 16px', cursor: 'pointer' }}>FAQ's</span>
      </footer>
    </div>
  );
}