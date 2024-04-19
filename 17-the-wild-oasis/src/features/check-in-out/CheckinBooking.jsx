import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "@src/ui/Spinner";
import Checkbox from "@src/ui/Checkbox";
import useCheckin from "./useCheckin";
import { useEffect, useState } from "react";
import { useSetting } from "../settings/useSetting";
import { formatCurrency } from "@src/utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking = {}, isLoading } = useBooking();
  const { checkin } = useCheckin();
  const { setting = {} } = useSetting();
  const {
    id: bookingId,
    guests,
    numGuests,
    hasBreakfast,
    numNights,
    status,
    isPaid,
    cabinPrice,
  } = booking;

  const extrasPrice = booking.hasBreakfast
    ? booking.extrasPrice
    : numNights * setting.breakfastPrice * numGuests;

  const isConfirmed = status !== "unconfirmed";
  const [checked, setChecked] = useState(false);
  const [confirmAddBreakfast, setConfirmAddBreakfast] = useState(false);

  useEffect(function () {}, []);

  function handleCheckin() {
    if (!confirmAddBreakfast) {
      checkin({});
    } else {
      const breakfast = {
        hasBreakfast: true,
        extrasPrice,
        totalPrice: cabinPrice + extrasPrice,
      };
      checkin(breakfast);
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && !isPaid && (
        <Box>
          <Checkbox
            checked={confirmAddBreakfast}
            onChange={() => setConfirmAddBreakfast((add) => !add)}
          >
            Want to add breakfast for ${extrasPrice}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={isConfirmed || checked}
          onChange={() => setChecked((currChecked) => !currChecked)}
          disabled={isConfirmed}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!confirmAddBreakfast && !hasBreakfast
            ? `${formatCurrency(cabinPrice)}`
            : `${formatCurrency(cabinPrice + extrasPrice)} (${formatCurrency(
                cabinPrice
              )} cabin + ${formatCurrency(extrasPrice)} breakfast)`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={isConfirmed || !checked}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
