import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function StockIn() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  const items = Array(9).fill({
    kode: "Item One",
    stok: "Item Two",
    merk: "Item Three",
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR BARU */}
      <div className="w-full bg-green-500 px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          
          {/* Menu Icon */}
          <div className="p-2 bg-white rounded-full text-xl">☰</div>

          {/* Search */}
          <div className="flex items-center bg-white rounded-full px-4 py-2 w-[60%]">
            🔍
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

      {/* CONTENT */}
      <div className="p-6">
        
        {/* Search Bar + Add Button */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Cari barang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Icon kalender */}
          <button className="border p-2 rounded-lg hover:bg-gray-100">
            📅
          </button>

          {/* Tombol tambah */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            +
          </button>
        </div>

        {/* GRID BARANG */}
        <div className="grid grid-cols-3 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 bg-white p-3 rounded-lg shadow-sm"
            >
              <p className="font-semibold">Kode Barang</p>
              <p>{item.kode}</p>
              <p>{item.stok}</p>
              <p>{item.merk}</p>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="mt-6 flex justify-center items-center gap-3">
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            &lt;
          </button>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md">
              One
            </button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
              Two
            </button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
              Three
            </button>
          </div>
        </div>

        {/* Button bawah */}
        <div className="mt-6">
          <button className="text-blue-600 hover:underline flex items-center gap-1">
            &lt; Button
          </button>
        </div>

      </div>
    </div>
  );
}
