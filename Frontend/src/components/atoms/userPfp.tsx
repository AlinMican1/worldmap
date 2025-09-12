import "./userPfp.css";
interface UserPfpProps {
  name: string;
  size: "userPfp-small" | "userPfp-big";
}

const UserPfp = ({ name, size }: UserPfpProps) => {
  return (
    <div className={`pfp-wrapper ${size}`}>
      <h1 className={`pfp-title ${size}`}>{name[0].toUpperCase()}</h1>
    </div>
  );
};

export default UserPfp;
