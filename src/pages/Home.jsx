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
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>SCIS Hub</h1>
        <p style={{ color: '#666', margin: '4px 0 0' }}>Share tips or ask questions</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <span>Hi, {user?.role === 'faculty' ? 'Faculty' : 'Student'}</span>
        <button onClick={() => navigate('/create-post')} style={{ padding: '8px 16px', background: '#000', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          + New Post
        </button>
      </div>

      <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 8, padding: 16, marginBottom: 24 }}>
        <p style={{ margin: 0, fontWeight: 'bold', color: '#4338ca' }}>AI Helper</p>
        <p style={{ margin: '4px 0 0', color: '#4338ca', fontSize: 14 }}>
          Our AI Helper can answer your questions. All AI responses are marked as "needs verification" so the community can validate and add sources.
        </p>
      </div>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet. Be the first to post!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {posts.map(post => (
            <div key={post.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#555' }}>{post.category}</span>
                {post.resolved && (
                  <span style={{ fontSize: 12, padding: '2px 8px', background: '#d1fae5', color: '#065f46', borderRadius: 20 }}>
                    Resolved
                  </span>
                )}
              </div>
              <h3 style={{ margin: '0 0 8px' }}>{post.title}</h3>
              <p style={{ margin: '0 0 12px', color: '#444', fontSize: 14 }}>{post.body}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: '#716f6f' }}>{post.author} / {post.type}</span>
                <span style={{ fontSize: 13, color: '#716f6f' }}>↑ {post.upvotes} / {post.answers} answers</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}