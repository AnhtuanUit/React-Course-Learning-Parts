import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirms = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function Confirm({ action, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirms>
      <Heading as="h3">Confirm {action}</Heading>
      <p>Are you sure you want to perform this action?</p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button
          variation="primary"
          disabled={disabled}
          onClick={() => onConfirm()}
        >
          Confirm {action}
        </Button>
      </div>
    </StyledConfirms>
  );
}

export default Confirm;
