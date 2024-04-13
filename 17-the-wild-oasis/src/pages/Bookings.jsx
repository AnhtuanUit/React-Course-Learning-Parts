import BookingTable from "@src/features/bookings/BookingTable";
import Heading from "../ui/Heading";

import Row from "../ui/Row";
import BookingTableOperations from "@src/features/bookings/BookingTableOperations";
function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Row>
        <BookingTable />
      </Row>
    </>
  );
}

export default Bookings;
