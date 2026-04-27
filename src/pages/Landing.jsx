import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Familjen Grotesk, sans-serif' }}>


      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 60 }}>

        <div style={{ background: '#D6E8F7', borderRadius: 24, padding: '48px 80px', textAlign: 'center', width: 500, boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <img src="/images/Icon_UMaine_Transparent.png" alt="UMaine logo" style={{ height: 48 }} />
            <h1 style={{ margin: 0, fontSize: 36, fontWeight: 'bold', color: '#082E58', fontFamily: 'teko' }}>SCIS Hub</h1>
          </div>
          <p style={{ margin: 0, color: '#555', fontSize: 16 }}>School of Computing and Information Science Success Tips Website</p>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          <button onClick={() => navigate('/sign-in')} style={{ padding: '20px 48px', fontSize: 22, background: '#D6E8F7', color: '#082E58', border: '1.5px solid #082E58', borderRadius: 16, cursor: 'pointer', fontFamily: 'teko' }}>
            Sign In
          </button>
          <button onClick={() => navigate('/register')} style={{ padding: '20px 48px', fontSize: 22, background: '#082E58', color: '#fff', border: 'none', borderRadius: 16, cursor: 'pointer', fontFamily: 'teko' }}>
            Register
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