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
    | "nav-btn";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size = "sm", ...props }, ref) => {
    return <button {...props} ref={ref} className={`button-base ${variant} ${size}`} />;
  }
);

export default memo(Button);
