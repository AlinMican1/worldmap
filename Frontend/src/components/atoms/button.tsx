import { ReactNode } from "react";
import "./button.css";
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  children?: ReactNode;
}

const Button = ({ variant, size = "sm", onClick, children }: ButtonProps) => {
  return (
    <button className={`button-base ${variant} ${size}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
