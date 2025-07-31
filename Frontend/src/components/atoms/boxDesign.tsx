import { ReactNode } from "react";
import "./boxDesign.css";

interface BoxDesignProps {
  children: ReactNode | ReactNode[];
}

const BoxDesign = ({ children }: BoxDesignProps) => {
  return <div className="box-wrapper">{children}</div>;
};
export default BoxDesign;
