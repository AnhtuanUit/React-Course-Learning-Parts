export default function Stats({ items }) {
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
