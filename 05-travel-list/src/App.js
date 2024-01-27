export default function App() {
  return (
    <div className="app">
      <Header />
      <Form />
      <PackageList />
      <Stats />
    </div>
  );
}

function Header() {
  return <h1>🏝️ FAR AWAY 🧳</h1>;
}

function Form() {
  return (
    <div className="add-form">
      <form>
        <h3>What do you need for your 😍 trip?</h3>
      </form>
    </div>
  );
}

function PackageList() {
  return <div className="list">LIST</div>;
}

function Stats() {
  return (
    <footer className="stats">
      {/* <em>🧳 You got everything. Ready to go ✈️</em> */}
      <em>You have X items on your list. And you already packded X(X%)</em>
    </footer>
  );
}
