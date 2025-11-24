import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState("");

  const menus = [
    { name: "Stock In", icon: "✏️", path: "/stockin" },
    { name: "Stock Out", icon: "🛒", path: "/stock-out" },
    { name: "Orders", icon: "📈", path: "/orders" },
    { name: "Report", icon: "📊", path: "/report" },
    { name: "Distributor", icon: "🚚", path: "/" },
    { name: "Merk", icon: "📦", path: "/merk" },
  ];

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    const userData = localStorage.getItem("userLogin");

    if (userData) {
      const user = JSON.parse(userData);
      setUserLogin(user.nama);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== NAVBAR ===== */}
      <div className="w-full bg-green-500 px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          {/* Menu Icon */}
          <div className="p-2 bg-white rounded-full text-xl">☰</div>

          {/* Search */}
          <div className="flex items-center bg-white rounded-full px-4 py-2 w-[60%]">
            🔍
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 outline-none w-full bg-transparent text-sm"
            />
          </div>

          {/* User Icon */}
          <button
            onClick={handleLogout}
            className="p-2 bg-white rounded-full text-xl"
            title="Logout"
          >
            👤
          </button>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="p-6">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-600">
            StockIn Warungku
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Selamat datang, {userLogin} 👋
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-5">
          {menus.map((menu, index) => (
            <div
              key={index}
              onClick={() => navigate(menu.path)}
              className="border border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center shadow hover:bg-green-100 transition cursor-pointer"
            >
              <div className="text-3xl">{menu.icon}</div>
              <p className="mt-3 text-sm font-semibold text-gray-700">
                {menu.name}
              </p>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-10">
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-300 transition"
          >
            ← Logout
          </button>
        </div>
      </div>
    </div>
  );
}
