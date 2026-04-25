import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    async function fetchPosts() {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto' }}>
      <div style={{background: '#EDEEF1', display: 'flex', flexDirection: 'row', borderRadius: 8}}>
        <img style={{padding: '3px 15px 3px 20px'}} src="/images/Search Icon.png" alt="" />
      <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{outline: 'none', background: '#EDEEF1',border: 0, borderRadius: 8, width: '100%', fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 18}} type="text" placeholder='Search posts...' />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 24 }}>
        <span style={{
          background: user?.role === 'faculty' ? '#FDE2D9' : '#D6ECFA',
          color: user?.role === 'faculty' ? '#572318' : '#082E58',
          border: user?.role === 'faculty' ? '1px solid #D25F3D' : '1px solid #1F73BD', 
          padding: '0px 28px', 
          borderRadius: 8, 
          fontFamily: 'Familjen Grotesk, sans-serif',
          fontSize: 14}}
          >{user?.role === 'faculty' ? 'Faculty' : 'Student'}</span>
        <button onClick={() => navigate('/create-post')} style={{ 
          padding: '8px 36px', 
          background: '#082E58', 
          color: '#fff', 
          border: 'none', 
          borderRadius: 6, 
          cursor: 'pointer', 
          fontFamily: 'Familjen Grotesk, sans-serif', 
          fontSize: 20,
          }}>
          New Post
        </button>
      </div>
      <div style={{background: '#EDEEF1', borderRadius: 14, padding: 25}}>
        <div style={{display: 'flex', flexDirection: 'row', background: '#EFF6FF', border: '1px solid #D6ECFA', borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <img style={{maxWidth: 40, maxHeight: 40, padding: '10px 12px 32px 5px'}}src="/images/Ai-PFP.png" alt="" />
          <div style={{flexDirection: 'column', margin: '0 auto', lineHeight: .5, gap: 0, paddingTop: 16}}>
            <p style={{ margin: 0, fontWeight: '400', color: '#0B3A6E', fontFamily: 'teko', fontSize: 24}}>AI Helper</p>
            <p style={{ margin: '4px 0 0', color: '#0F4A86', fontFamily:'Familjen Grotesk, sans-serif', fontSize: 18, lineHeight: 1}}>
              Our AI helper can draft answers to your questions! All AI responses are marked as "needs verification" so the community can validate, correct, and add sources. Together, we build reliable knowledge and AI literacy.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '24px', width: '100%'}}>
                <div style={{ display: 'flex', flexDirection: 'row', background: '#D6ECFA', borderRadius: 14, width: '90%', gap: 0, margin: '0 auto', maxHeight: 36, padding: '4px 0 4px 3px' }}>
                    {['All', 'Study Tips', 'Time Management', 'Resources', 'Exam Prep', 'Motivation', 'Questions'].map((cat, i, arr) => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} style={{margin: 0, flex: 1, height: '90%', width: '90%', background: selectedCategory === cat ? '#fff' : 'transparent', borderRadius: selectedCategory === cat ? 14 : 0, fontFamily: 'teko', fontSize: 20, cursor: 'pointer', border: 0, outline: 'none', display: 'block' }}>
                        {cat}
                    </button>
                    ))}
                </div>
            </div>
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet. Be the first to post!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {posts.filter(post =>
              (selectedCategory === 'All' || post.category === selectedCategory) &&
              (post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               post.body?.toLowerCase().includes(searchQuery.toLowerCase()))
            ).map(post => (
              <div key={post.id} onClick={() => navigate(`/post/${post.id}`)} style={{ border: '1px solid #e5e7eb', borderRadius: 14, padding: 16, background: '#fff', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <img src={post.type === 'tip' ? '/images/Icon_Lightbulb.png' : '/images/Open-Book.png'} alt={post.type} style={{ width: 16, height: 16 }}/>
                  <span style={{fontFamily: 'teko', fontSize: 15, color: '#555' }}>{post.category}</span>
                  {post.resolved && (
                    <span style={{ fontSize: 12, padding: '2px 8px', background: '#d1fae5', color: '#065f46', borderRadius: 20 }}>
                      Resolved
                    </span>
                  )}
                </div>
                <h3 style={{fontFamily: 'teko', fontSize: 24, margin: '0 0 8px', fontWeight: 400 }}>{post.title}</h3>
                <p style={{fontFamily:'Familjen Grotesk, sans-serif', fontSize: 14, margin: '0 0 12px', color: '#444', fontSize: 14 }}>{post.body}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: 5, flexDirection: 'row' }}>
                  <span style={{fontFamily:'Familjen Grotesk, sans-serif', fontSize: 14, color: '#716f6f' }}>{post.author}</span>
                  <span style={{fontFamily:'Familjen Grotesk, sans-serif', fontSize: 14, color: '#716f6f', display: 'flex', gap: 16}}>
                    <span><img src="/images/View_Arrow.png" alt="" style={{ verticalAlign: 'middle' }} /> {post.upvotes}</span>
                    <span style={{}}>{post.answers} answers</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}