// "use client";
// import { useState } from "react";
import UserWelcome from "../atoms/userWelcome";

const Dashboard = () => {
  // const [te, setTe] = useState<boolean>(false);
  return (
    <div className="">
      {/* <button onClick={() => setTe(!te)}>change te</button>
      te */}
      <UserWelcome />{" "}
    </div>
  );
};

export default Dashboard;
