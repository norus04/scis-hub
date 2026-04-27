import { useNavigate } from 'react-router-dom';

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Familjen Grotesk, sans-serif' }}>
      <div style={{ padding: '16px 24px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#082E58', fontSize: 14 }}>
          ← Back
        </button>
      </div>
      <div style={{ maxWidth: 700, margin: '40px auto' }}>
        <h1 style={{ fontFamily: 'teko', fontSize: 48, color: '#082E58', fontWeight: 400 }}>About Us</h1>
        <div style={{ background: '#EDEEF1', borderRadius: 14, padding: 32 }}>
          <p style={{ fontSize: 18, color: '#333', lineHeight: 1.6 }}>
            SCIS Hub is a Q&A forum built for students and faculty in the University of Maine's School of Computing and Information Science. The goal: give students a central place to ask questions, share tips, and get answers verified by faculty and peers.
          </p>
          <p style={{ fontSize: 18, color: '#333', lineHeight: 1.6 }}>
            The platform will support AI-assisted answers that are marked for community verification, so students can get quick responses while faculty verify accuracy. Whether you have a question about a course, need study tips, or want to share advice with students, SCIS Hub is the place for it.
          </p>
          <p style={{ fontSize: 18, color: '#333', lineHeight: 1.6 }}>
            This project was built by a team of UMaine SCIS students as part of COS 498/598.
          </p>
        </div>
      </div>
    </div>
  );
}