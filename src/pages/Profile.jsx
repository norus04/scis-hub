import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h1>Profile</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
        <div>
          <strong>Email</strong>
          <p style={{ margin: '4px 0' }}>{user?.email}</p>
        </div>
        <div>
          <strong>Role</strong>
          <p style={{ margin: '4px 0', textTransform: 'capitalize' }}>{user?.role}</p>
        </div>
      </div>
    </div>
  );
}