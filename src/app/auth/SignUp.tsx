import React from "react";

interface Props {
  mode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp = ({ mode, setMode }: Props) => {
  return (
    <>
      <div>SignUp</div>
    </>
  );
};

export default SignUp;
