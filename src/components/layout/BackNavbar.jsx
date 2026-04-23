import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect, useRef } from 'react';

const itemStyle = { display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: '12px 15px', gap: 10, height: 40, borderRadius: 8, width: '100%' };
const labelStyle = { fontFamily: 'Teko', fontWeight: 400, fontSize: 24, lineHeight: '140%', color: '#082E58' };
const iconStyle = { width: 16, height: 16, flexShrink: 0 };

function MenuItem({ to, icon, label, onClick }) {
  const navigate = useNavigate();
  const inner = (
    <div style={itemStyle}>
      {icon
        ? <img src={icon} alt="" style={iconStyle} />
        : <div style={{ ...iconStyle, border: '1.6px solid #082E58' }} />
      }
      <span style={labelStyle}>{label}</span>
    </div>
  );

  if (to) {
    return <div onClick={() => { onClick?.(); navigate(to); }} style={{ textDecoration: 'none', width: '100%', cursor: 'pointer' }}>{inner}</div>;
  }
  return <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: '100%', display: 'flex', textAlign: 'left' }}>{inner}</button>;
}

export default function BackNavbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const close = () => setIsOpen(false);

  return (
    <nav ref={menuRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '12px 24px', borderBottom: '1px solid #ccc' }}>
      <img src='/images/icon_UMaine.png' alt='UMaine Flag Logo'style={{}}/>
      <button
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#082E58', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Familjen Grotesk, sans-serif', marginRight: 'auto', paddingLeft: 100 }}
      >
        <img src='/images/Back_Arrow.png' alt='UMaine Flag Logo'style={{margin: 'auto', paddingTop: 4}}/>
         Back
      </button>

      <button
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        style={{ width: 32, height: 32, background: '#FFFFFF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, fontSize: 32, color: '#082E58' }}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {isOpen && (
        <div style={{ position: 'fixed', top: 53, right: 24, zIndex: 1000, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 8, width: 301, background: '#FFFFFF', border: '1px solid #D9D9D9', boxShadow: '0px 4px 4px -1px rgba(12, 12, 13, 0.1)', borderRadius: 8 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '8px 16px 4px', width: 285, height: 32 }}>
            <span style={{ fontFamily: 'Teko', fontWeight: 400, fontSize: 24, lineHeight: '140%', color: '#222A35' }}>Menu Navigation</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px 16px', width: 285 }}>
            <div style={{ width: 253, height: 1, background: '#D9D9D9' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 264, borderRadius: 8 }}>
            {user ? (
              <>
                <MenuItem to="/home" icon="/images/Home.png" label="Home" onClick={close} />
                <MenuItem to="/profile" icon="/images/User.png" label="Profile" onClick={close} />
                <MenuItem icon="/images/Log out.png" label="Sign Out" onClick={() => { signOut(); navigate('/register'); close(); }} />
              </>
            ) : (
              <>
                <MenuItem to="/sign-in" label="Sign In" onClick={close} />
                <MenuItem to="/register" label="Register" onClick={close} />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
