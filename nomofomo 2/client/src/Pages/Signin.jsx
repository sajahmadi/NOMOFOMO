import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import axiosInstance from "../config/axiosConfig";
import { authAtom } from "../atoms/authAtom";
import { useState } from "react";

function Signin() {
  // Global State
  const setAuth = useSetRecoilState(authAtom);

  // local state
  const [Loading, setLoading] = useState(false);

  // Instances
  const navigate = useNavigate();

  // Handlers
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email || !password) {
      setLoading(false);
      return toast.error("Email and password are required!");
    }

    axiosInstance
      .post("/auth/signin", {
        email,
        password,
      })
      .then((res) => {
        if (res?.data?.success) {
          localStorage.setItem("__NOMOFOMO_TOKEN", res.data.token);
          localStorage.setItem(
            "__NOMOFOMO_USER",
            JSON.stringify(res.data.user)
          );
          setAuth({
            isAuthenticated: true,
            token: res.data.token,
            user: res.data.user,
          });
          navigate("/dashboard");
        } else {
          toast.error("Invalid credentials!");
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <main className="w-screen h-screen overflow-hidden flex justify-center items-center">
      <section className="bg-white rounded-md px-4 md:px-6 py-6 md:py-8 lg:py-10 w-[350px] md:w-[500px]">
        <h1 className="text-4xl font-bold text-center mb-4 md:mb-6 lg:mb-8 text-green-500">
          Login
        </h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border outline-none focus:border-primary-500 border-gray-300 placeholder:tracking-widest p-2 focus:outline-none rounded-md transition-all duration-200 ease-in-out"
          />
          <input
            type="password"
            placeholder="Password"
            className="border outline-none focus:border-primary-500 border-gray-300 placeholder:tracking-widest p-2 focus:outline-none rounded-md transition-all duration-200 ease-in-out"
          />
          <button
            className="bg-primary-500 text-white font-bold text-lg tracking-widest rounded-md py-2 px-4 mt-4 hover:bg-primary-600 transition-all duration-200 ease-in-out uppercase"
            type="submit"
          >
            {Loading ? "Verifying..." : "submit"}
          </button>

          <p className="text-center">
            Don't have an account?{" "}
            <span
              className="text-green-600 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>
        </form>
      </section>

      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
    </main>
  );
}

export default Signin;
