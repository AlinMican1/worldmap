import "./selectBox.css";

interface SelectBoxProps {
  name: string;
}
const SelectBox = ({ name }: SelectBoxProps) => {
  return (
    <div>
      <button className="button-wrapper-1">{name}</button>
    </div>
  );
};

export default SelectBox;
