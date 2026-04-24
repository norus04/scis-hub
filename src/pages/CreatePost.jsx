import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';


export default function CreatePost() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [postType, setPostType] = useState('question');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [error, setError] = useState('')

  async function handlePost() {
    if (!title || !details || !selectedCategory) {
        setError('Please fill in all fields and select a category.');
        return;
    }
    try {
        await addDoc(collection(db, 'posts'), {
            type: postType,
            category: selectedCategory,
            title,
            body: details,
            author: user.email,
            role: user.role,
            upvotes: 0,
            answers: 0,
            resolved: false,
            createdAt: serverTimestamp(),
        });
        navigate('/home');
    }
    catch(err) {
        setError('Failed to create post. Please try again.');
    }
  }

    return (
        <div style={{boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '0 auto',
                    width: '90%',
                    maxWidth: 1024,
                    minWidth: 320,
                    padding: 'clamp(24px, 4vw, 50px) clamp(24px, 4vw, 50px) 32px',
                    background: "#EDEEF1",
                    borderRadius: 14,
                    fontFamily: 'teko',
                   }}>
            <h1 style={{ fontWeight: 400, fontSize: 'clamp(24px, 4vw, 40px)', margin: '0 auto'}}>Create A New Post</h1>
            <h2 style={{ fontWeight: 400, fontSize: 'clamp(16px, 2.5vw, 24px)'}}>What would you like to share?</h2>
            <div style={{display: "flex", fontWeight: 400, flexDirection:'row', gap: 'clamp(8px, 2vw, 16px)'}}>
                <button onClick={() => setPostType('question')} style={{background: postType === 'question' ? '#D6ECFA' : '#fff', fontFamily: 'teko', border: '2px solid #082E58', borderRadius: 10, textAlign: 'left', fontSize: 'clamp(16px, 2vw, 24px)', margin: 0, height: '80px', width: '50%', verticalAlign: 'middle', cursor: 'pointer'}}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0, lineHeight: 1, padding: 10 }}>
                    <span>Ask a Question</span>
                    <p style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 'clamp(12px, 1.5vw, 18px)', color: '#353D4A', margin: 0 }}>Get help from the community</p>
                  </div>
                </button>
                <button onClick={() => setPostType('tip')} style={{background: postType === 'tip' ? '#D6ECFA' : '#fff', fontFamily: 'teko', border: '2px solid #082E58', borderRadius: 10, textAlign: 'left', fontSize: 'clamp(16px, 2vw, 24px)', margin: 0, height: '80px', width: '50%', verticalAlign: 'middle', cursor: 'pointer'}}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0, lineHeight: 1, padding: 10 }}>
                    <span>Share a Tip</span>
                    <p style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 'clamp(12px, 1.5vw, 18px)', color: '#353D4A', margin: 0 }}>Help others with your advice</p>
                  </div>
                </button>
            </div>
            <div style={{gap: 0, margin: 0, marginTop: 25, padding: 0, display:'flex', flexDirection: 'column'}}>
                <div style={{display:'flex',flexDirection: 'row'}}>
                    <h3 style={{color: 'black', margin: 0, fontWeight: 400, fontSize: 'clamp(16px, 2vw, 24px)'}}>Title</h3>
                    <p style={{color: '#AB0634', margin: 0, fontWeight: 400, fontSize: 'clamp(16px, 2vw, 24px)'}}>*</p>
                </div>
                <input onChange={e => setTitle(e.target.value)} style={{ border:'1px solid #777B82', borderRadius: 8, padding: 10, fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)', width:'100%', height: 36 }} type="text" placeholder="e.g., How do I prepare for multiple midterms?" />
            </div>
            <div style={{gap: 0, margin: 0, marginTop: 25, padding: 0, display:'flex', flexDirection: 'column'}}>
                <div style={{display:'flex',flexDirection: 'row'}}>
                    <h3 style={{color: 'black', margin: 0, fontWeight: 400, fontSize: 'clamp(16px, 2vw, 24px)'}}>Question Details</h3>
                    <p style={{color: '#AB0634', margin: 0, fontWeight: 400, fontSize: 'clamp(16px, 2vw, 24px)'}}>*</p>
                </div>
                <textarea onChange={e => setDetails(e.target.value)} style={{ border:'1px solid #777B82', borderRadius: 8, padding: 10, fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 'clamp(14px, 1.5vw, 18px)', width:'100%', height: '20vh', minHeight: 120 }} placeholder="Describe your question in detail. What have you tried so far?" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 25 }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', border: '1px solid #082E58', borderRadius: 14, overflow: 'hidden', width: '90%', gap: 0, margin: '0 auto' }}>
                    {['Study Tips', 'Time Management', 'Resources', 'Exam Prep', 'Motivation', 'Questions'].map((cat) => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} style={{margin: 0, flex: '1 1 80px', padding: '8px 4px', background: selectedCategory === cat ? '#D6ECFA' : '#fff', fontFamily: 'teko', fontSize: 20, cursor: 'pointer', border: 0, outline: 'none', display: 'block' }}>
                        {cat}
                    </button>
                    ))}
                </div>
            </div>

            {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}
            
            <div style={{ display: 'flex', flexDirection: 'row', gap: 16, marginTop: 50, justifyContent: 'flex-end', margin: 'auto' }}>
                <button onClick={handlePost} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#082E58', color: '#fff', fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 20, cursor: 'pointer', width: 112}}>
                    Post
                </button>
                <button onClick={() => navigate('/home')} style={{ padding: '10px 24px', borderRadius: 8, border: '2px solid #082E58', background: '#fff', color: '#082E58', fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 20, cursor: 'pointer', width: 112 }}>
                    Cancel
                </button>
            </div>
        </div>
        
    );
}

