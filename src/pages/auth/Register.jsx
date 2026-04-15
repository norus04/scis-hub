import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    try {
      await register(email, password, role);
      navigate('/home');
    } catch (err) {
      setError('Could not create account. Email may already be in use.');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '60px auto' }}>
      <h1>Create Account</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" onClick={() => setRole('student')}
            style={{ flex: 1, padding: 10, cursor: 'pointer', background: role === 'student' ? '#000' : '#fff', color: role === 'student' ? '#fff' : '#000', border: '1px solid #000' }}>
            Student
          </button>
          <button type="button" onClick={() => setRole('faculty')}
            style={{ flex: 1, padding: 10, cursor: 'pointer', background: role === 'faculty' ? '#000' : '#fff', color: role === 'faculty' ? '#fff' : '#000', border: '1px solid #000' }}>
            Faculty
          </button>
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Have an account? <Link to="/sign-in">Sign In</Link></p>
    </div>
  );
}