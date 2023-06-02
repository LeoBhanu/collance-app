import "./FormComponent.css";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { User } from "./types";



const Form = () => {
  const [user, setUser] = useState<User>({
    name: "",
    age: 0,
    dob: "",
    phone: 0,
    address: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const [showPass, setShowPass] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<User>();

  const onSubmit = (data: User) => {
    console.log("submitted", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <input
            {...register("name", {
              required: `Name field is required`,
              maxLength: { value: 20, message: "should be 20" },
            })}
            placeholder="Name"
            type="text"
          />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <input
            {...register("age", {
              required: `Age field is required`,
              maxLength: 2,
            })}
            placeholder="Age"
            type="number"
          />
          <p>{errors.age?.message}</p>
        </div>
        <div>
          <input
            {...register("dob", {
              required: `Date of Birth field is required`,
              maxLength: 20,
            })}
            placeholder="Date of Birth"
            type="text"
          />
          <p>{errors.dob?.message}</p>
        </div>
        <div>
          <input
            {...register("phone", {
              required: `Phone Number field is required`,
              maxLength: 20,
            })}
            placeholder="Phone Number"
            type="number"
          />
          <p>{errors.phone?.message}</p>
        </div>
        <div>
          <input
            {...register("address", {
              required: `Address field is required`,
              maxLength: 20,
            })}
            placeholder="Address"
            type="text"
          />
          <p>{errors.address?.message}</p>
        </div>
        <div>
          <input
            {...register("email", {
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/i,
                message: `Email format doesn't matched`,
              },
              required: `Email field is required`,
            })}
            type="email"
            placeholder="Email"
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <input
            className="password"
            {...register("password", {
              required: `Password field is required`,
              maxLength: 20,
            })}
            placeholder="Password"
            type={showPass ? "text" : "password"}
          />
          <div onClick={() => setShowPass(!showPass)}>
            {showPass ? "hide" : "show"}
          </div>
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <input
            className="password"
            {...register("cPassword", {
              required: `Confirm Password field is required`,
              maxLength: 20,
            })}
            placeholder="Confirm Password"
            type={showPass ? "text" : "password"}
          />
          <div onClick={() => setShowPass(!showPass)}>
            {showPass ? "hide" : "show"}
          </div>
          <p>{errors.cPassword?.message}</p>
        </div>

        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Form;
