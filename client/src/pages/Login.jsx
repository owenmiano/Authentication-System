import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

function Login() {
  const { loginUser, isLoading } = useContext(AuthContext);
  const onSubmit = (data) => loginUser(data);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { errors } = formState;
  return (
    <>
      <div className="container">
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col col-md-6 col-lg-6">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* ... your form content ... */}
              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  {...register("email", {
                    required: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i,
                      message: "Invalid email format",
                    },
                  })}
                />
                <p style={{ color: "red" }}>{errors.email?.message}</p>
              </div>

              {/* <!-- Password input --> */}
              <div className="form-outline mb-4">
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    {...register("password", {
                      required: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                        message:
                          "Password should be at least 8 characters long and should contain at least one lowercase letter, one uppercase letter, and one digit",
                      },
                    })}
                  />
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      top: "30%",
                      right: "10px", // Adjust the value for proper positioning
                      transform: "translateY(-50%)",
                      zIndex: "2",
                    }}
                  />
                  <label
                    htmlFor="showPassword"
                    style={{
                      width: "20px", // Adjust the size of the icon
                      height: "20px", // Adjust the size of the icon
                      backgroundSize: "cover",
                      cursor: "pointer",
                    }}
                  ></label>
                </div>
                <p style={{ color: "red" }}>{errors.password?.message}</p>
              </div>

              {/* <!-- 2 column grid layout for inline styling --> */}
              <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                  {/* <!-- Checkbox --> */}
                </div>

                <div className="col">
                  {/* <!-- Simple link --> */}
                  <a href="#!">Forgot password?</a>
                </div>
              </div>

              {/* <!-- Submit button --> */}
              <div className="row justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4 col-9"
                >
                  {isLoading ? "Signing in..." : "Login"}
                </button>
              </div>

              {/* <!-- Register buttons --> */}
              <div className="text-center">
                <p>
                  Not a member?<Link to="/register">Register</Link>
                </p>
                <p>or sign up with:</p>
                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-google"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-twitter"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-github"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
