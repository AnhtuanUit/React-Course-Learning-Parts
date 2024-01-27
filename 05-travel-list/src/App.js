const initialItems = [
  { id: 1, desciption: 'Passports', quantity: 2, packed: true },
  { id: 2, desciption: 'Socks', quantity: 12, packed: false },
];

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
  return (
    <div className="list">
      <ul>
        {initialItems.map(item => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.desciption}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      {/* <em>🧳 You got everything. Ready to go ✈️</em> */}
      <em>You have X items on your list. And you already packded X(X%)</em>
    </footer>
  );
}
