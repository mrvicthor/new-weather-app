import React, { useRef, useEffect } from "react";

export const useToggleDaysDropdown = (isOpen: boolean) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (isOpen && itemsRef.current[0]) {
      itemsRef.current[0].focus();
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const items = itemsRef.current;
    const currentIndex = items.findIndex(
      (item) => item === document.activeElement
    );

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        items[(currentIndex + 1) % items.length]?.focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        items[(currentIndex - 1 + items.length) % items.length]?.focus();
        break;
      case "Home":
        event.preventDefault();
        items[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case "Escape":
        event.preventDefault();
        buttonRef.current?.focus();
        break;
    }
  };

  return { menuRef, buttonRef, itemsRef, handleKeyDown };
};
