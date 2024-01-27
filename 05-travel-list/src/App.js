import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems(sItems => [...sItems, item]);
  }

  function handleDeleteItems(id) {
    setItems(sItems => sItems.filter(item => item.id !== id));
  }

  return (
    <div className="app">
      <Header />
      <Form onAddItems={handleAddItems} />
      <PackageList items={items} onDeleteItems={handleDeleteItems} />
      <Stats />
    </div>
  );
}

function Header() {
  return <h1>🏝️ FAR AWAY 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    // 0) Guard check
    if (!description) return;
    // 1) Create item data
    const item = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    // 2)
    onAddItems(item);

    // 3) Clearn the input
    setDescription('');
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={e => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackageList({ items, onDeleteItems }) {
  return (
    <div className="list">
      <ul>
        {items.map(item => (
          <Item key={item.id} item={item} onDeleteItems={onDeleteItems} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItems }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
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
