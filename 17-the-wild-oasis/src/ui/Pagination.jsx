import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const PAGE_SIZE = 10;

function Pagination({ page = 1, count, onChange }) {
  const isLastPage = PAGE_SIZE * page >= count;
  const isFirstPage = page === 1;

  const from = PAGE_SIZE * (page - 1) + 1;
  const to = isLastPage ? count : from + PAGE_SIZE - 1;

  function handleNext() {
    if (!isLastPage) onChange({ currPage: page + 1 });
  }

  function handlePrevious() {
    if (!isFirstPage) onChange({ currPage: page - 1 });
  }

  return (
    <StyledPagination>
      <P>
        Show <span>{from}</span> to <span>{to}</span> of <span>{count}</span>
      </P>
      <Buttons>
        <PaginationButton disabled={isFirstPage} onClick={handlePrevious}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton disabled={isLastPage} onClick={handleNext}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
