import EnterLocation from "../atoms/enterLocation";
import InputLocation from "../atoms/inputLocation";

const Form = () => {
  return (
    <main>
      <h1>Choose A timeslot</h1>
      <p>
        Please complete the following below to allow us to choose the best possible time for your
        meeting
      </p>
      <EnterLocation />
    </main>
  );
};
export default Form;
