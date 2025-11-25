// frontend/src/components/Report.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Report() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/stocks/report");
        const data = await response.json();
        setReportData(data);
      } catch (error) {
        console.error("Gagal mengambil data laporan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR - Sama seperti halaman lain */}
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
            Laporan Stok Barang
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Total stok berdasarkan merk
          </p>
        </div>

        {/* Chart Container */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          {loading ? (
            <p className="text-center py-10">Memuat data laporan...</p>
          ) : reportData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={reportData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="merk" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_stok" fill="#10b981" name="Total Stok" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center py-10 text-gray-500">
              Tidak ada data untuk ditampilkan dalam laporan.
            </p>
          )}
        </div>

        {/* Button bawah */}
        <div className="mt-6">
          <button
            onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            &lt; Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
