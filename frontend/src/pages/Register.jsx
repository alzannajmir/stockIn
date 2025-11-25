// frontend/src/components/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      })
      .then((response) => {
        // Jika registrasi berhasil
        toast.success(
          response.data.message || "Registrasi berhasil! Silakan login."
        );

        // Redirect ke halaman login setelah 2 detik
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        // Jika registrasi gagal
        const errorMessage =
          error.response?.data?.message || "Registrasi gagal. Coba lagi.";
        toast.error(errorMessage);
      });
  }

  return (
    <>
      <div className="w-full mt-70">
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center italic text-2xl/9 font-bold tracking-tight text-gray-500">
              "StockIn <span className="text-green-500">WarungKu" </span>
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="Username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block outline-slate-500 w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block outline-slate-500 w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
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
                    autoComplete="new-password"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-slate-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Daftar
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="flex-1 rounded-md bg-gray-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
