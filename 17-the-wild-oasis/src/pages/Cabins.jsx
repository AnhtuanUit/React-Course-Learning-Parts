import Heading from '../ui/Heading';
import Row from '../ui/Row';

import CabinTable from '../features/cabins/CabinTable';
import AddCabin from '@src/features/cabins/AddCabin';
import Filter from '@src/ui/Filter';
import Select from '@src/ui/Select';

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
        <Select
          name="sort"
          options={[
            { label: 'Sort by name(A-Z)', value: 'name-asc' },
            { label: 'Sort by name(Z-A)', value: 'name-desc' },
            { label: 'Sort by price(low first)', value: 'regularPrice-asc' },
            { label: 'Sort by price(high first)', value: 'regularPrice-desc' },
            {
              label: 'Sort by capacity(high first)',
              value: 'maxCapacity-desc',
            },
            { label: 'Sort by capacity(low first)', value: 'maxCapacity-asc' },
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
