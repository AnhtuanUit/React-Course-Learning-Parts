import { createContext, useContext, useState } from "react";
import styled from "styled-components";

import { useOutsideClick } from "./useOutsideClick";
import { HiEllipsisVertical } from "react-icons/hi2";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  justify-self: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  z-index: 1;
  white-space: nowrap;
  position: absolute;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  top: calc(100% + 5px);
  right: 0%;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");

  function close() {
    setOpenId("");
  }

  return (
    <MenusContext.Provider
      value={{
        openId,
        close,
        setOpenId,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, setOpenId } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    if (openId === id) {
      close();
    } else {
      setOpenId(id);
    }
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ children, id }) {
  const { openId, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  const isOpen = id && openId === id;
  if (!isOpen) return null;

  return <StyledList ref={ref}>{children}</StyledList>;
}
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <StyledButton onClick={handleClick}>
      <span>{icon}</span>
      <span>{children}</span>
    </StyledButton>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.Menu = Menu;

export default Menus;
