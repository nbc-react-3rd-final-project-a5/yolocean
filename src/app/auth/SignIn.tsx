import React from "react";

interface Props {
  mode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn = ({ mode, setMode }: Props) => {
  return (
    <>
      <div>SignIn</div>
    </>
  );
};

export default SignIn;
