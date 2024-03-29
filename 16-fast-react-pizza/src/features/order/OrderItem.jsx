import { formatCurrency } from '../../utils/helpers';

// eslint-disable-next-line no-unused-vars
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-3 py-1">
      <div className="flex  items-center justify-between">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
