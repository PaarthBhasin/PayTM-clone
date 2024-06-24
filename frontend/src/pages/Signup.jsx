import { useState } from "react";
import axios from "axios"; // Import axios
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); // Change LastName to lastName
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name"}
            placeholder={"John"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label={"Last Name"}
            placeholder={"Doe"}
          />
          <InputBox
            onChange={(e) => {
              setusername(e.target.value);
            }}
            label={"Email"}
            placeholder={"johndoe@example.com"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              label={"Sign up"}
              onClick={() => {
                 axios.post("http://localhost:3000/api/v1/user/signup", {
                  username,
                  lastName,
                  firstName,
                  password
                })
                .then(response => {
                  console.log(response.data);
                  navigate("/dashboard");
                  localStorage.setItem("token", response.data.token);
                  // handle successful signup, maybe redirect to login page or show a success message
                })
                .catch(error => {
                  console.error("There was an error signing up!", error);
                  // handle error, show an error message to the user
                });
              }}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
