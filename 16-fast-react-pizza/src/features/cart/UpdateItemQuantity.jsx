import Button from '@src/ui/Button';
import { useDispatch } from 'react-redux';
import { descreaseItemQuantity, increaseItemQuantity } from './cartSlice';

function UpdateItemQuantity({ currentQuantity, pizzaId }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(descreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-medium text-sm">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
