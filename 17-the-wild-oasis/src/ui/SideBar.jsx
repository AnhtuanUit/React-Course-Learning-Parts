import styled from 'styled-components';

const StyledSidebar = styled.aside`
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
`;

function SideBar() {
  return <StyledSidebar>SIDEBAR</StyledSidebar>;
}

export default SideBar;