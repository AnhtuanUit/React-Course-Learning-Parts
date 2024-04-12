import Spinner from '@src/ui/Spinner';
import CabinRow from './CabinRow';

import { useCabins } from './useCabins';
import Table from '@src/ui/Table';
import Menus from '@src/ui/Menus';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const [searchParam] = useSearchParams();
  const { isLoading, cabins = [] } = useCabins();

  const filterValue = searchParam.get('discount') || 'all';

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter(cabin => cabin.discount > 0);

  if (isLoading) return <Spinner />;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Menus>
        <Table.Body
          values={filteredCabins}
          render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Menus>
    </Table>
  );
}

export default CabinTable;
