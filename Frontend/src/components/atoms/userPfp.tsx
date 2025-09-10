import "./userPfp.css";
interface UserPfpProps {
  name: string;
}

const UserPfp = ({ name }: UserPfpProps) => {
  return (
    <div className="pfp-wrapper">
      <h1 className="pfp-title">{name[0].toUpperCase()}</h1>
    </div>
  );
};

export default UserPfp;
