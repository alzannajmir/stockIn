import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [correct, setCorrect] = useState();
  const notify = () => toast("Wow so easy!");

  const navigate = useNavigate();

  function handleLogout() {
    navigate("/login");
  }

  useEffect(() => {
    async function getUser() {
      const url = "http://localhost:3000";
      try {
        const response = await fetch(url);
        const result = await response.json();

        setUser(result.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, []);
  function signIn(e) {
    e.preventDefault();

    const foundUser = user.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem(
        "userLogin",
        JSON.stringify({
          nama: foundUser.nama,
          email: foundUser.email,
        })
      );

      toast.success("Email dan password benar");
      navigate("/dashboard");
    } else {
      toast.error("Email atau password salah");
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="flex border-4 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          /> */}
          <h2 className="mt-10 text-center italic text-2xl/9 font-bold tracking-tight text-green-500">
            "StockIn WarungKu"
          </h2>
        </div>

        {correct && (
          <div
            className={`p-3 rounded-md text-white mb-4 ${
              correct.includes("benar") ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {correct}
          </div>
        )}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Username..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block outline-slate-500 w-full rounded-md bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-slate-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div >
            </div>
              <div>
                  <a
                    href="#"
                    className="text-sm ml-65 text-black hover:text-indigo-300 "
                    >
                    Forgot password?
                  </a>
                    </div>

            <div className="flex gap-4">
              <button 
                onClick={signIn}
                type="submit"
                className="w-1/2 rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Login
              </button>
              <button 
                onClick={signIn}
                type="submit"
                className="w-1/2 rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Register
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}
