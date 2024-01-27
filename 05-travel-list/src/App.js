import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems(items => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Header />
      <Form onAddItems={handleAddItems} />
      <PackageList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
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

function PackageList({ items, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState('input');

  let sortItems;
  if (sortBy === 'input') {
    sortItems = items;
  }

  if (sortBy === 'description') {
    sortItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === 'packed') {
    sortItems = items.slice().sort((a, b) => a.packed - b.packed);
  }
  return (
    <div className="list">
      <ul>
        {sortItems.map(item => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="action">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by desciption</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  if (!totalItems)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );
  const totalPackedItems = items.reduce(
    (acc, item) => (item.packed ? acc + 1 : acc),
    0
  );
  const percentPackedItems = ((100 * totalPackedItems) / totalItems).toFixed(0);

  const isReadyToGo = totalItems === totalPackedItems;
  return (
    <footer className="stats">
      {isReadyToGo ? (
        <em>🧳 You got everything. Ready to go ✈️</em>
      ) : (
        <em>
          You have {totalItems} items on your list. And you already packded{' '}
          {totalPackedItems} ({percentPackedItems}%)
        </em>
      )}
    </footer>
  );
}
