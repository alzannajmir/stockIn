import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState();

  function handleUser() {
    navigate("/user");
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    const userData = localStorage.getItem("userLogin");

    if (userData) {
      const user = JSON.parse(userData);
      console.log("User Login:", user.nama, user.email);
      setUserLogin(user.nama);
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 to-indigo-300 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        {/* Welcome Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">
            Welcome {userLogin}👋
          </h1>
          <p className="text-gray-600">
            Selamat datang di dashboard aplikasi Anda.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleUser}
            className="w-full rounded-md bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600 transition"
          >
            Ke Halaman User
          </button>

          <button
            onClick={handleLogout}
            className="w-full rounded-md bg-red-500 py-2 font-semibold text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
