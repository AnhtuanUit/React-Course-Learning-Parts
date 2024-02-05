import AppNav from '@src/components/AppNav';
import PageNav from '@src/components/PageNav';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1 className="test">Worldwise</h1>
      <Link to="/app">Go to the app</Link>
    </div>
  );
}

export default HomePage;
