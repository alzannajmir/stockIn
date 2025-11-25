import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function StockOut() {
  const [search, setSearch] = useState("");
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk modal hapus item
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // State untuk modal kurangi stok
  const [isReduceModalOpen, setIsReduceModalOpen] = useState(false);
  const [reduceQuantity, setReduceQuantity] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/stocks");
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        toast.error("Gagal memuat data stock");
      } finally {
        setLoading(false);
      }
    };
    fetchStocks();
  }, []);

  // Fungsi untuk membuka modal hapus
  const openDeleteModal = (id) => {
    setSelectedItemId(id);
    setIsDeleteModalOpen(true);
  };

  // Fungsi untuk menghapus seluruh item
  const handleDeleteStock = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/stocks/${selectedItemId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Barang berhasil dihapus!");
        setStocks(stocks.filter((stock) => stock.id !== selectedItemId));
        setIsDeleteModalOpen(false);
      } else {
        toast.error("Gagal menghapus barang");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan server");
    }
  };

  // Fungsi untuk membuka modal kurangi stok
  const openReduceModal = (id) => {
    setSelectedItemId(id);
    setIsReduceModalOpen(true);
  };

  // Fungsi untuk mengurangi stok
  const handleReduceStock = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/stocks/${selectedItemId}/reduce`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: parseInt(reduceQuantity) }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        // Update stok di state tanpa perlu fetch ulang
        setStocks(
          stocks.map((stock) =>
            stock.id === selectedItemId
              ? {
                  ...stock,
                  jumlah_stok: stock.jumlah_stok - parseInt(reduceQuantity),
                }
              : stock
          )
        );
        setIsReduceModalOpen(false);
        setReduceQuantity(1); // Reset quantity
      } else {
        toast.error(data.message || "Gagal mengurangi stok");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan server");
    }
  };

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  const filteredStocks = stocks.filter(
    (item) =>
      item.nama_barang.toLowerCase().includes(search.toLowerCase()) ||
      item.kode_barang.toLowerCase().includes(search.toLowerCase()) ||
      item.merk.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR - Tidak berubah */}
      <div className="w-full bg-green-500 px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-white rounded-full text-xl">☰</div>
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
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredStocks.map((item) => (
              <div
                key={item.id}
                className="border border-gray-300 bg-white p-3 rounded-lg shadow-sm"
              >
                <p className="font-semibold">{item.kode_barang}</p>
                <p>{item.nama_barang}</p>
                <p>
                  Stok: <span className="font-bold">{item.jumlah_stok}</span>
                </p>
                <p>Merk: {item.merk}</p>

                <div className="mt-3 flex gap-2">
                  {/* Tombol Kurangi Stok */}
                  <button
                    onClick={() => openReduceModal(item.id)}
                    className="flex-1 bg-orange-500 text-white px-2 py-1 rounded text-sm hover:bg-orange-600 transition"
                  >
                    Kurangi
                  </button>
                  {/* Tombol Hapus Item */}
                  <button
                    onClick={() => openDeleteModal(item.id)}
                    className="flex-1 bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== MODAL HAPUS ITEM ===== */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus</h2>
            <p className="mb-4">
              Apakah Anda yakin ingin menghapus barang ini secara permanen?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteStock}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL KURANGI STOK ===== */}
      {isReduceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Kurangi Stok</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Jumlah
              </label>
              <input
                type="number"
                min="1"
                value={reduceQuantity}
                onChange={(e) => setReduceQuantity(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsReduceModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleReduceStock}
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
              >
                Kurangi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
