import styled from 'styled-components';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import Modal from '@src/ui/Modal';
import ConfirmDelete from '@src/ui/ConfirmDelete';
import CreateCabinForm from './CreateCabinForm';

import { formatCurrency } from '@src/utils/helpers';
import { useCreateCabin } from './useCreateCabin';
import { useDeleteCabin } from './useDeleteCabin';
import Table from '@src/ui/Table';
import Menus from '@src/ui/Menus';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  function handleDuplicateCabin() {
    createCabin({
      name: `Copy of ${cabin.name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up tp {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {!discount ? (
        <span>&mdash;</span>
      ) : (
        <Discount>{formatCurrency(discount)}</Discount>
      )}

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Menus.Button
                disabled={isCreating}
                onClick={handleDuplicateCabin}
                icon={<HiSquare2Stack />}
              />

              <Modal.Open opens="update-cabin">
                <Menus.Button icon={<HiPencil />} />
              </Modal.Open>

              <Modal.Open opens="delete-cabin">
                <Menus.Button icon={<HiTrash />} />
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="update-cabin">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                resourceName="cabin"
                onConfirm={() => deleteCabin(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
