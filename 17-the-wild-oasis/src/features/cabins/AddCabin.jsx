import Button from '@src/ui/Button';
import Modal from '@src/ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="create-cabin">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="create-cabin">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
