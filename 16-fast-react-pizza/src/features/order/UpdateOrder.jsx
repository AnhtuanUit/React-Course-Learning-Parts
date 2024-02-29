import { updateOrder } from '@src/services/apiRestaurant';
import Button from '@src/ui/Button';
import { useFetcher } from 'react-router-dom';

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form className="text-right" method="PATCH">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params }) {
  const updateObj = { priority: true };
  await updateOrder(params.orderId, updateObj);
  return null;
}

export default UpdateOrder;
