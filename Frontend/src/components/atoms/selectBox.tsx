import "./selectBox.css";
import { memo } from "react";
interface SelectBoxProps {
  name: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  dimmed?: boolean;
  selected?: boolean;
}
const SelectBox = ({
  name,
  className,
  onClick,
  disabled = false,
  dimmed = false,
  selected = false,
}: SelectBoxProps) => {
  const produceButtonClass = () => {
    let base = "button-wrapper-1";
    if (disabled) base += " unselectable";
    if (dimmed && !disabled && !selected) base += " turnDownOpacity";
    if (selected && !disabled) base += " selected";
    return `${base} ${className}`.trim();
  };
  return (
    <div>
      <button onClick={onClick} className={produceButtonClass()}>
        {name}
      </button>
    </div>
  );
};

export default memo(SelectBox);
