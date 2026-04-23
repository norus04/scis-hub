import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MOCK_POSTS = [
  {
    id: 1,
    category: 'Time Management',
    title: 'How to balance studying with extracurriculars?',
    body: 'I am struggling to manage my time between classes, homework, and my club activities. Does anyone have practical tips for staying organized?',
    author: 'John Doe',
    time: '1d ago',
    upvotes: 10,
    answers: 0,
    tags: ['#productivity', '#organization', '#balance'],
    resolved: false,
  },
  {
    id: 2,
    category: 'Study Tips',
    title: 'The Pomodoro Technique Changed My Life',
    body: 'I used to procrastinate constantly, but then I discovered the Pomodoro Technique. Work for 25 minutes, then take a 5-minute break. It has helped me stay focused and avoid burnout!',
    author: 'Jane Doe',
    time: '1d ago',
    upvotes: 42,
    answers: 0,
    tags: ['#pomodoro', '#focus', '#productivity'],
    resolved: false,
  },
  {
    id: 3,
    category: 'Resources',
    title: 'Best note-taking apps for college?',
    body: 'I have been using paper notebooks but I want to go digital. What apps do you recommend for taking notes during lectures?',
    author: 'Jebediah Doe',
    time: '2d ago',
    upvotes: 16,
    answers: 0,
    tags: ['#apps', '#notes', '#technology'],
    resolved: true,
  },
];

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>SCIS Hub</h1>
        <p style={{ color: '#666', margin: '4px 0 0' }}>Share tips or ask questions</p>
      </div>

      {/* User bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>Hi, {user?.email ?? 'Guest'}</span>
          {user?.role && (
            <span style={{ padding: '2px 10px', border: '1px solid #ccc', borderRadius: 20, fontSize: 13 }}>
              {user.role.toUpperCase()}
            </span>
          )}
        </div>
        <button onClick={() => navigate('/create-post')} style={{ padding: '8px 16px', background: '#000', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          + New Post
        </button>
      </div>

      {/* AI Helper */}
      <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 8, padding: 16, marginBottom: 24 }}>
        <p style={{ margin: 0, fontWeight: 'bold', color: '#4338ca' }}>AI Helper</p>
        <p style={{ margin: '4px 0 0', color: '#4338ca', fontSize: 14 }}>
          Our AI Helper can answer your questions. All AI responses are marked as "needs verification" so the community can validate and add sources.
        </p>
      </div>

      {/* Posts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {MOCK_POSTS.map(post => (
          
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
              <span style={{ fontSize: 13, color: '#716f6f' }}>{post.author} / {post.time}</span>
              <span style={{ fontSize: 13, color: '#716f6f' }}>↑ {post.upvotes} / {post.answers} answers</span>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              {post.tags.map(tag => (
                <span key={tag} style={{ fontSize: 12, padding: '2px 8px', background: '#f3f4f6', borderRadius: 20 }}>
                  {tag}
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}