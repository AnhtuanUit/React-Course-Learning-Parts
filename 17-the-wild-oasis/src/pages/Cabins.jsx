import Heading from '../ui/Heading';
import Row from '../ui/Row';

import CabinTable from '../features/cabins/CabinTable';
import AddCabin from '@src/features/cabins/AddCabin';
import Filter from '@src/ui/Filter';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <Filter
          filterField="discount"
          options={[
            { label: 'All', value: 'all' },
            { label: 'With Discount', value: 'with-discount' },
            { label: 'No Discount', value: 'no-discount' },
          ]}
        />
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
