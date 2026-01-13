import { ReactNode, UIEvent, useRef } from "react";

const LongPressListener = ({
  onLongPress,
  onClick,
  children,
  delay = 500,
}: {
  // TODO: Clean up signatures to be a little more sensible.
  onLongPress: (target: HTMLElement) => void;
  onClick: (target: HTMLElement) => void;
  children: ReactNode;
  delay?: number;
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = (e: UIEvent) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    const target = e.currentTarget as HTMLElement;
    timerRef.current = setTimeout(() => {
      onLongPress(target);
      timerRef.current = null;
    }, delay);
  };

  const handleMouseUp = (e: UIEvent) => {
    const target = e.currentTarget as HTMLElement;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      onClick(target);
    }
    timerRef.current = null;
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      // We ignore touch events because they seem to be less reliable across devices.
    >
      {children}
    </div>
  );
};

export default LongPressListener;
