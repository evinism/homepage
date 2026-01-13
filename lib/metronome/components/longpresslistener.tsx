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
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default LongPressListener;