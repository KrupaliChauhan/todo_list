import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
import { useAuth } from "../context/AuthContext";

const STATIC_USERNAME = "admin";
const STATIC_PASSWORD = "1234";

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (data: User) => {
    if (
      data.userName !== STATIC_USERNAME ||
      data.password !== STATIC_PASSWORD
    ) {
      setError("password", {
        type: "manual",
        message: "Invalid username or password !!",
      });
      return;
    }
    login(data.userName);

    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white p-6 rounded-lg shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <Controller
          name="userName"
          control={control}
          rules={{ required: "username requied" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Username"
              className="w-full mb-3 p-2 border rounded"
            />
          )}
        />
        {errors.userName && (
          <p className="text-red-600">{errors.userName.message}</p>
        )}

        <Controller
          name="password"
          control={control}
          rules={{ required: "please fill the password" }}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-2 border rounded"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          Demo login: admin / 1234
        </p>
      </form>
    </div>
  );
};

export default Login;
