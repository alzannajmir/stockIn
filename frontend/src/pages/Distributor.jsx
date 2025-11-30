// frontend/src/pages/Distributor.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Distributor() {
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // State untuk modal tambah
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDistributor, setNewDistributor] = useState({
    nama_distributor: "",
    merk_barang: "",
    nomor_telepon: "",
  });

  // State untuk modal edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editDistributor, setEditDistributor] = useState(null);

  // State untuk modal hapus
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDistributorId, setSelectedDistributorId] = useState(null);

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/distributors");
      const data = await response.json();
      setDistributors(data);
    } catch (error) {
      toast.error("Gagal memuat data distributor");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/distributors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDistributor),
      });
      if (response.ok) {
        toast.success("Distributor berhasil ditambahkan!");
        setIsAddModalOpen(false);
        setNewDistributor({
          nama_distributor: "",
          merk_barang: "",
          nomor_telepon: "",
        });
        fetchDistributors(); // Ambil ulang data
      } else {
        toast.error("Gagal menambah distributor");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan server");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/distributors/${editDistributor.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editDistributor),
        }
      );
      if (response.ok) {
        toast.success("Distributor berhasil diperbarui!");
        setIsEditModalOpen(false);
        setEditDistributor(null);
        fetchDistributors(); // Ambil ulang data
      } else {
        toast.error("Gagal memperbarui distributor");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan server");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/distributors/${selectedDistributorId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Distributor berhasil dihapus!");
        setIsDeleteModalOpen(false);
        setSelectedDistributorId(null);
        setDistributors(
          distributors.filter((d) => d.id !== selectedDistributorId)
        );
      } else {
        toast.error("Gagal menghapus distributor");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan server");
    }
  };

  const openEditModal = (distributor) => {
    setEditDistributor(distributor);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (id) => {
    setSelectedDistributorId(id);
    setIsDeleteModalOpen(true);
  };

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-600">
            Manajemen Distributor
          </h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Tambah Distributor
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {distributors.map((dist) => (
              <div
                key={dist.id}
                className="border border-gray-300 bg-white p-4 rounded-lg shadow-sm"
              >
                <h3 className="font-bold text-lg text-gray-800">
                  {dist.nama_distributor}
                </h3>
                <p className="text-gray-600">Merk: {dist.merk_barang}</p>
                <p className="text-gray-600">
                  No. Telp: {dist.nomor_telepon || "-"}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => openEditModal(dist)}
                    className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(dist.id)}
                    className="flex-1 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL TAMBAH */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Tambah Distributor Baru</h2>
            <form onSubmit={handleAdd}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nama Distributor
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newDistributor.nama_distributor}
                  onChange={(e) =>
                    setNewDistributor({
                      ...newDistributor,
                      nama_distributor: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Merk Barang
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newDistributor.merk_barang}
                  onChange={(e) =>
                    setNewDistributor({
                      ...newDistributor,
                      merk_barang: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newDistributor.nomor_telepon}
                  onChange={(e) =>
                    setNewDistributor({
                      ...newDistributor,
                      nomor_telepon: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
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

      {/* MODAL EDIT */}
      {isEditModalOpen && editDistributor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Distributor</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nama Distributor
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={editDistributor.nama_distributor}
                  onChange={(e) =>
                    setEditDistributor({
                      ...editDistributor,
                      nama_distributor: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Merk Barang
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={editDistributor.merk_barang}
                  onChange={(e) =>
                    setEditDistributor({
                      ...editDistributor,
                      merk_barang: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={editDistributor.nomor_telepon}
                  onChange={(e) =>
                    setEditDistributor({
                      ...editDistributor,
                      nomor_telepon: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                >
                  Perbarui
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL HAPUS */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus</h2>
            <p className="mb-4">
              Apakah Anda yakin ingin menghapus distributor ini?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
