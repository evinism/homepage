import { useEffect } from "react";

const GlobalKeydownListener = ({
  onKeyDown,
  keyFilter,
}: {
  onKeyDown: (e: KeyboardEvent) => void;
  keyFilter?: string;
}) => {
  const handleKeyDown = (e) => {
    if (keyFilter && e.key === keyFilter) {
      e.preventDefault();
      console.log("key down");
      onKeyDown(e);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return null;
};

export default GlobalKeydownListener;
