import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
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

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 to-indigo-200 p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">📋 Data Users</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>

        {/* Card Table */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading data...</p>
          ) : user.length === 0 ? (
            <p className="text-center text-gray-500">
              Data user belum tersedia
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-indigo-500 text-white text-left">
                    <th className="px-4 py-3 rounded-tl-lg">No</th>
                    <th className="px-4 py-3">Nama</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3 rounded-tr-lg">Telp</th>
                  </tr>
                </thead>

                <tbody>
                  {user.map((u, index) => (
                    <tr
                      key={u.id}
                      className="border-b hover:bg-gray-100 transition"
                    >
                      <td className="px-4 py-3 text-center">{index + 1}</td>
                      <td className="px-4 py-3">{u.nama}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {u.email}
                      </td>
                      <td className="px-4 py-3 text-center">{u.telp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-gray-600 text-sm">
          © 2025 Sistem Manajemen User
        </p>
      </div>
    </div>
  );
}
