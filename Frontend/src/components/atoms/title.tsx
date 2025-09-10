import "./title.css";

interface TitleProps {
  icon?: React.ReactNode;
  title?: string;
  subheading?: string;
  variant?: "primary" | "secondary";
}

const Title = ({ subheading, title, icon, variant = "primary" }: TitleProps) => {
  return (
    <div className={`titleCard-base`}>
      <h1 className={variant}>
        {icon} {title}
      </h1>
      {subheading && <p>{subheading}</p>}
    </div>
  );
};
export default Title;
