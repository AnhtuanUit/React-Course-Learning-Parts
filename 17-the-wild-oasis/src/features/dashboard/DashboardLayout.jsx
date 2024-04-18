import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Spinner from "@src/ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const {
    stays,
    numDays,
    confirmedStays,
    isLoading: isLoading2,
  } = useRecentStays();

  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        stays={stays}
        confirmedStays={confirmedStays}
        cabinCount={cabins.length}
        numDays={numDays}
      />
      <div>{`Total's activity`}</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
