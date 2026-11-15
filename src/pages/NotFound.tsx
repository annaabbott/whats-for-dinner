import { Link } from 'react-router';

export default function NotFound() {
  return (
    <section className="card">
      <p className="eyebrow">404</p>
      <h1>Page not found.</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link className="button" to="/">
        Back to home
      </Link>
    </section>
  );
}
