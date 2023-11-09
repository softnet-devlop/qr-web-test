import { ChangeEventHandler } from "react";

type UserIdSelectProps = {
  handleChange: ChangeEventHandler<HTMLSelectElement>;
};

export const UserIdSelect = (props: UserIdSelectProps) => {
  const { handleChange } = props;

  return (
    <>
      <select onChange={handleChange}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </>
  );
};
