import Modal from "@src/ui/Modal";
import Button from "../../ui/Button";
import useCheckout from "./useCheckout";
import Confirm from "@src/ui/Confirm";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkout } = useCheckout();

  function handleCheckout() {
    checkout(bookingId);
  }

  return (
    <Modal>
      <Modal.Open opens="checkout">
        <Button variation="primary" size="small" disabled={isCheckingOut}>
          Check out
        </Button>
      </Modal.Open>
      <Modal.Window name="checkout">
        <Confirm action="Checkout" onConfirm={handleCheckout} />
      </Modal.Window>
    </Modal>
  );
}

export default CheckoutButton;
