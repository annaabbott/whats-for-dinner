import { Link } from 'react-router';

export default function Home() {
  return (
    <section className="card">
      <p className="eyebrow">What's for Dinner</p>
      <h1>A fresh start.</h1>
      <p>Your React and TypeScript app is ready to build on.</p>
      <Link className="button" to="/about">
        About this app
      </Link>
    </section>
  );
}
