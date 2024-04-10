import Button from '@src/ui/Button';
import Modal from '@src/ui/Modal';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowForm(show => !show)}>Add new cabin</Button>
      {showForm && (
        <Modal onCloseModal={() => setShowForm(false)}>
          <CreateCabinForm
            type="modal"
            onCloseModal={() => setShowForm(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
