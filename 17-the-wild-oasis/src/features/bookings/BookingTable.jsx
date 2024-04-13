import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "@src/ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "@src/ui/Spinner";
import Pagination from "@src/ui/Pagination";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();
  const [searchParams, setSearchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resourceName="bookings" />;

  function handlePageChange({ currPage }) {
    searchParams.set("page", currPage);
    setSearchParams(searchParams);
  }

  const page = searchParams.get("page") || 1;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          values={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination page={page} count={count} onChange={handlePageChange} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
