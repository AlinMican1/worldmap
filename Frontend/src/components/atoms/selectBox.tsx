import "./selectBox.css";

interface SelectBoxProps {
  name: string;
  classname?: string;
  onClick?: () => void;
}
const SelectBox = ({ name, classname, onClick }: SelectBoxProps) => {
  return (
    <div>
      <button onClick={onClick} className={`button-wrapper-1 ${classname}`}>
        {name}
      </button>
    </div>
  );
};

export default SelectBox;
