import { useNavigate } from 'react-router-dom';

export default function UserInfo({ _id, username }) {
  const nav = useNavigate();
  return (
    <div key={_id}>
      <h2>{username}</h2>
      <button onClick={() => nav(`/users/${_id}`)}>See Details</button>
    </div>
  );
}
