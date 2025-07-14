import "./selectBox.css";

interface SelectBoxProps {
  name: string;
  classname?: string;
}
const SelectBox = ({ name, classname }: SelectBoxProps) => {
  return (
    <div>
      <button className={`button-wrapper-1 ${classname}`}>{name}</button>
    </div>
  );
};

export default SelectBox;
