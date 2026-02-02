import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/auth";
import type { User } from "../types/User";
import { useAuth } from "../context/AuthContext";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

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

  const handleRegister = async (data: User) => {
    try {
      const result = await registerApi(data.userName, data.password);

      login(result.user.username, result.token);

      navigate("/home");
    } catch (err) {
      setError("userName", {
        type: "manual",
        message: "Username already exists",
      });
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white p-6 rounded-lg shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <Controller
          name="userName"
          control={control}
          rules={{ required: "Username required" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Username"
              className="w-full mb-2 p-2 border rounded"
            />
          )}
        />
        {errors.userName && (
          <p className="text-red-600 text-sm">{errors.userName.message}</p>
        )}

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password required",
            minLength: { value: 4, message: "Min 4 characters" },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              placeholder="Password"
              className="w-full mb-2 p-2 border rounded"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
