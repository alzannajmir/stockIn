import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function StockIn() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk Modal Tambah Barang Baru
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newStock, setNewStock] = useState({
    kode_barang: "",
    nama_barang: "",
    jumlah_stok: "",
    merk: "",
  });

  // State untuk Modal Tambah Stok Barang
  const [isIncreaseModalOpen, setIsIncreaseModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [increaseQuantity, setIncreaseQuantity] = useState(1);

  // --- Fungsi untuk mengambil data stock (tidak berubah) ---
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

  // --- Fungsi untuk menambah barang baru (DIREFAKTOR) ---
  const handleAddStock = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/stocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStock),
      });

      if (response.ok) {
        toast.success("Barang baru berhasil ditambahkan!");
        setIsNewModalOpen(false);
        setNewStock({
          kode_barang: "",
          nama_barang: "",
          jumlah_stok: "",
          merk: "",
        });
        // Update state secara lokal untuk UI yang lebih cepat
        const addedStock = await response.json();
        setStocks([...stocks, addedStock.data]);
      } else {
        toast.error("Gagal menambah barang baru");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan server");
    }
  };

  // --- Fungsi untuk menambah stok barang yang ada (BARU) ---
  const handleIncreaseStock = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/stocks/${selectedItemId}/increase`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: parseInt(increaseQuantity) }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setIsIncreaseModalOpen(false);
        // Update state secara lokal
        setStocks(
          stocks.map((stock) =>
            stock.id === selectedItemId
              ? {
                  ...stock,
                  jumlah_stok: stock.jumlah_stok + parseInt(increaseQuantity),
                }
              : stock
          )
        );
        setIncreaseQuantity(1); // Reset quantity
      } else {
        toast.error(data.message || "Gagal menambah stok");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan server");
    }
  };

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  // Fungsi untuk membuka modal tambah stok
  const openIncreaseModal = (id) => {
    setSelectedItemId(id);
    setIsIncreaseModalOpen(true);
  };

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
        {/* Search Bar + Add Button */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Tambah Barang
          </button>
        </div>

        {/* GRID BARANG */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {stocks
              .filter(
                (item) =>
                  item.nama_barang
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  item.kode_barang.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => (
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

                  {/* DUA TOMBOL AKSI */}
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => openIncreaseModal(item.id)}
                      className="flex-1 bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600 transition"
                    >
                      Tambah Stok
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* ===== MODAL 1: TAMBAH BARANG BARU ===== */}
      {isNewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Tambah Barang Baru</h2>
            <form onSubmit={handleAddStock}>
              {/* ... semua input untuk barang baru ... */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Kode Barang
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newStock.kode_barang}
                  onChange={(e) =>
                    setNewStock({ ...newStock, kode_barang: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nama Barang
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newStock.nama_barang}
                  onChange={(e) =>
                    setNewStock({ ...newStock, nama_barang: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Jumlah Stok
                </label>
                <input
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newStock.jumlah_stok}
                  onChange={(e) =>
                    setNewStock({ ...newStock, jumlah_stok: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Merk
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newStock.merk}
                  onChange={(e) =>
                    setNewStock({ ...newStock, merk: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL 2: TAMBAH STOK BARANG ===== */}
      {isIncreaseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Tambah Stok</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Jumlah
              </label>
              <input
                type="number"
                min="1"
                value={increaseQuantity}
                onChange={(e) => setIncreaseQuantity(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsIncreaseModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleIncreaseStock}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
