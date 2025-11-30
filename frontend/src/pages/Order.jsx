import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Order() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders/report");
        const data = await response.json();

        // --- TAMBAHKAN PENGECEKAN INI ---
        if (Array.isArray(data)) {
          // Jika data adalah Array, balik urutannya dan set state
          setOrderData(data.reverse());
        } else {
          // Jika bukan Array, tampilkan error di console dan set state menjadi array kosong
          console.error("Data yang diterima bukan Array:", data);
          setOrderData([]);
        }
        // --- AKHIR PENGECEKAN ---
      } catch (error) {
        console.error("Gagal mengambil data laporan order:", error);
        // Jika terjadi error, set state menjadi array kosong untuk mencegah crash
        setOrderData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <div className="w-full bg-green-500 px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-white rounded-full text-xl">☰</div>
          <div className="flex items-center bg-white rounded-full px-4 py-2 w-[60%]">
            🔍
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 outline-none w-full bg-transparent text-sm"
            />
          </div>
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
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-600">
            Laporan Order (Stock Out)
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Total barang keluar per hari (30 hari terakhir)
          </p>
        </div>

        {/* Chart Container */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          {loading ? (
            <p className="text-center py-10">Memuat data laporan...</p>
          ) : orderData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={orderData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tanggal" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total_keluar"
                  stroke="#ef4444"
                  name="Total Keluar"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center py-10 text-gray-500">
              Belum ada data transaksi stock out.
            </p>
          )}
        </div>

        {/* Button bawah */}
        <div className="mt-6">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            &lt; Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
