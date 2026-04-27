import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, updateDoc, increment, serverTimestamp, orderBy, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import mockAiResponses from '../data/mockAiResponses.json';

export default function Post() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [aiDraft, setAiDraft] = useState('');
  const [aiApproved, setAiApproved] = useState(0);
  const [aiRejected, setAiRejected] = useState(0);

  useEffect(() => {
    async function fetchPost() {
      const snap = await getDoc(doc(db, 'posts', id));
      if (snap.exists()) setPost({ id: snap.id, ...snap.data() });
      setLoading(false);
    }
    fetchPost();

    const q = query(collection(db, 'posts', id, 'comments'), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, snap => {
      setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [id]);

  async function handleSubmitComment() {
    if (!commentText.trim()) return;
    setSubmitting(true);
    await addDoc(collection(db, 'posts', id, 'comments'), {
      body: commentText,
      author: user.email,
      role: user.role,
      createdAt: serverTimestamp(),
    });
    await updateDoc(doc(db, 'posts', id), { answers: increment(1) });
    setCommentText('');
    setSubmitting(false);
  }

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div style={{display: 'flex', flexDirection: 'column', margin: 'auto', background: '#EDEEF1', padding: 25, maxWidth: '65%', borderRadius: 14}}>
        <div style={{ width: '95%', margin: ' auto', background: '#fff', padding: 25, borderRadius: 14}}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <img src={post.type === 'tip' ? '/images/Icon_Lightbulb.png' : '/images/Open-Book.png'} alt={post.type} style={{ width: 23, height: 23}} />
            <span style={{fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 14, border: '1px solid #777B82', background: '#F9FAFB', borderRadius: 8, padding: '3px 10px', lineHeight: 1, color: '#222A35'}}>{post.category}</span>
            {post.resolved && (
              <span style={{ fontSize: 12, padding: '2px 8px', background: '#d1fae5', color: '#065f46', borderRadius: 20 }}>Resolved</span>
            )}
        </div>

        <h1 style={{ fontFamily: 'teko', fontWeight: 400, fontSize: 24, margin: '0 0 8px' }}>{post.title}</h1>

        <p style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 14, color: '#716f6f', margin: '0 0 16px', display: 'flex', gap: 10}}>
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.createdAt?.toDate?.().toLocaleDateString()}</span>
        </p>

        <p style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 14, color: '#444', lineHeight: 1.6 }}>{post.body}</p>

        <div style={{ marginTop: 24, fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 14, color: '#716f6f', display: 'flex', flexDirection: 'row', gap: 10}}>
            <span style={{display: 'flex', top: 10}}><img src="/images/View_Arrow.png" alt="" /></span>
            <span>{post.upvotes}</span>
            <span>{comments.length} answers</span>
        </div>

        </div>
        <div style={{width: '93%', margin:'auto', marginTop: 25, padding: '16px 20px', background: 'linear-gradient(to bottom, #EFF6FF, #FAF5FF)', border: '1px solid #A8D6F3', borderRadius: 14, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <img style={{height: 40, width: 40}} src="/images/AI_Circle_Icon.png" alt="" />
            <div style={{display: 'flex', flexDirection: 'column', padding:'0px 15px'}}>
                <h2 style={{fontFamily: 'teko', color: '#082E58', fontSize: 24, fontWeight: 400, margin: 0}}>Need Help Answering?</h2>
                <p style={{fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 18, margin: 0, color:'#4A5565'}}>Let AI draft an answer that the community can verify</p>
            </div>
            <button onClick={() => setAiDraft(mockAiResponses[Math.floor(Math.random() * mockAiResponses.length)])} style={{cursor: 'pointer', height: 36, fontFamily: 'teko', fontSize: 20, fontWeight: 400, display:'flex', flexDirection: 'row', alignItems: 'center', color: '#fff', background: 'linear-gradient(to right, #2B7FFF, #AD46FF)', border: '0', borderRadius: 8, marginLeft: 'auto'}}>
                <img style={{marginLeft: 12}} src="/images/AI_icon.png" alt=""/>
                <span style={{padding: 20}}>Generate AI Answer</span>
            </button>
        </div>

        <span style={{fontFamily: 'teko', fontSize: 24, margin: 24}}>{comments.length} Answers</span>

          {aiDraft && (
            <div style={{ width: '95%', margin: 'auto', marginTop: 25, marginBottom: 25, padding: '16px 20px', background: 'linear-gradient(to bottom, #EFF6FF, #FAF5FF)', border: '1px solid #A8D6F3', borderRadius: 14, display: 'flex', flexDirection: 'row'}}>
              <img style={{width: 40, height: 40, marginRight: 10 }} src="/images/Ai-PFP.png" alt="" />
              <div style={{flexDirection: 'column'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <p style={{fontFamily: 'teko', fontSize: 24, color: '#000', margin: '0 0 8px' }}>AI Study Assistant</p>
                  <p style={{fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 14, marginLeft: 20, height: 20, background: 'linear-gradient(to bottom, #2B7FFF, #AD46FF)', color:'#fff', alignItems: 'center', border: '1px solid #082E58', borderRadius: 8, padding: '0px 10px', verticalAlign: 'middle'}}><img style={{marginRight: 10}} src='/images/AI_Icon.png'></img>AI Generated</p>
                  <p style={{fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 14,  marginLeft: 15, height: 20, background: '#F8D6DD', color:'#2A0110', border: '1px solid #8F052C', borderRadius: 8, padding: '0px 10px'}}>Unverified</p>
                </div>
                <div style={{background: '#D6ECFA', border: '1px solid #79BDE8', borderRadius: 10, padding: 13, display: 'flex', flexDirection: 'row'}}>
                  <img style={{width: 20, height: 20}} src="/images/AI_Warning.png" alt="" />
                  <div style={{display: 'flex', flexDirection: 'column', margin: 0, marginLeft: 10, gap: 4, justifyContent: 'flex-start'}}>
                    <h3 style={{fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 18, lineHeight: 1, margin: 0, color: '#082E58', fontWeight: 400}}>Needs Community Verification</h3>
                    <p style={{fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 14, lineHeight: 1, margin: 0, color: '#0B3A6E'}}>This AI-generated answer should be reviewed by students, TAs, or staff. Help improve accuracy by verifying, adding sources, or suggesting corrections.</p>
                    <p style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 14, margin: 0, lineHeight: 1, color: '#0B3A6E' }}>
                      <span style={{fontWeight: 'bold'}}>Status:</span> <span>{aiApproved} approved</span>, <span >{aiRejected} rejected</span> ({aiApproved + aiRejected} total reviews)
                    </p>
                  </div>
                </div>
                <p style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 15, color: '#444', margin: '0 0 12px', lineHeight: 1.6, whiteSpace: 'pre-line'}}>{aiDraft}</p>
                <button onClick={() => setCommentText(aiDraft)} style={{display: 'flex', fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 14,  padding: '6px 12px', background: '#082E58', color: '#fff', border: 0, borderRadius: 6, cursor: 'pointer', marginLeft: 'auto', marginTop: 50 }}>
                  Confirm Answer
                </button>
              </div>
            </div>
          )}

         {comments.length > 0 && (
              <div style={{ margin: '0px 24px 15px', display: 'flex', flexDirection: 'column', gap: 16,  display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {comments.map(comment => (
                  <div key={comment.id} style={{ borderTop: '1px solid #e5e7eb', background: '#fff', width: '98%', padding: 20, borderRadius: 14, border: '1px solid #C9CBD0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 18, color: '#082E58' }}>{comment.author}</span>
                      <span style={{
                        background: comment.role === 'faculty' ? '#FDE2D9' : '#D6ECFA',
                        color: comment.role === 'faculty' ? '#572318' : '#082E58',
                        border: comment.role === 'faculty' ? '1px solid #D25F3D' : '1px solid #1F73BD',
                        padding: '0px 8px', borderRadius: 8, fontSize: 12, fontFamily: 'Familjen Grotesk, sans-serif'
                      }}>
                        {comment.role === 'faculty' ? 'Faculty' : 'Student'}
                      </span>
                    </div>
                    
                    <p style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 16, color: '#444', margin: 0, padding: '10px 0px'}}>{comment.body}</p>
                  </div>
                ))}
              </div>
            )}

        <div style={{ width: '95%', margin: ' auto', background: '#fff', padding: 25, border: '1px solid #C9CBD0', borderRadius: 14, display: 'flex', flexDirection: 'column'}}>
            <h4 style={{fontFamily: 'teko', fontSize: 24, fontWeight: 400, margin: 0}}>Your Answer</h4>
            <p style={{fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 16, margin: 0}}>Write a helpful answer based on your experience</p>
            <textarea value={commentText} onChange={e => setCommentText(e.target.value)} style={{fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 16, marginTop: 30, padding: 20, background: '#F3F3F5', border: 0, borderRadius: 8, height: 120}} placeholder='Share your knowledge or advice...' />
            <button onClick={handleSubmitComment} disabled={submitting} style={{fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 14, marginTop: 30, marginLeft:'auto', padding: '10px 15px', color: '#fff', background: '#082E58', border: 0, borderRadius: 8, cursor: 'pointer'}}>
                {submitting ? 'Posting...' : 'Post Answer'}
            </button>

        </div>
    </div>
  );
}
