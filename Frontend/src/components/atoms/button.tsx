import { ButtonHTMLAttributes, forwardRef } from "react";
import "./button.css";
import { memo } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary-btn"
    | "secondary-btn"
    | "third-btn"
    | "fourth-btn"
    | "fifth-btn"
    | "outline-btn"
    | "nav-btn"
    | "nav-btn.active"
    | "log-out-btn";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size = "sm", className, ...props }, ref) => {
    return (
      <button {...props} ref={ref} className={`button-base ${variant} ${size} ${className}`} />
    );
  }
);

export default memo(Button);
