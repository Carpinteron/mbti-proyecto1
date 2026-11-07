import { Link } from 'react-router';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-bold tracking-tight text-xl" aria-label="MBTI Personalities home">
      <img src="/icon.png" alt="" className="size-8 rounded-full object-cover" />
      <span>MBTI</span>
    </Link>
  );
}

export default Logo;
