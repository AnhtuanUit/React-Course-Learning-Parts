import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "@src/utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1.Count bookings
  const bookingCount = bookings.length;

  // 2.Cout sales
  const saleCount = bookings.reduce(
    (sum, { totalPrice }) => sum + totalPrice,
    0
  );

  // 3.Count checkins
  const checkinCount = confirmedStays.length;

  // 4.Calculate occupancy rate
  const occupancyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (cabinCount * numDays);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={bookingCount}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(saleCount)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={checkinCount}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy"
        value={`${Math.round(100 * occupancyRate)}%`}
        color="yellow"
      />
    </>
  );
}

export default Stats;
