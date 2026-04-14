import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 24px', borderBottom: '1px solid #ccc' }}>
      <NavLink to="/home" style={{ fontWeight: 'bold', marginRight: 'auto' }}>SCIS Hub</NavLink>

      {user ? (
        <>
          <NavLink to="/profile">Profile</NavLink>
          <button onClick={() => { signOut(); navigate('/register'); }}>Sign Out</button>
        </>
      ) : (
        <>
          <NavLink to="/sign-in">Sign In</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
    </nav>
  );
}