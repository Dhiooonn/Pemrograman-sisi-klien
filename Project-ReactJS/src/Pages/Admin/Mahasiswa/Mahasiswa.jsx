import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import TableMahasiswa from "./TableMahasiswa";
import ModalMahasiswa from "./ModalMahasiswa";

import { toastError, toastSuccess } from "@/Utils/Helpers/ToastHelpers";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";

import { useAuthStateContext } from "@/Pages/Auth/Context/AuthContext";

// API
import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "@/Utils/Apis/MahasiswaApi";

import { getAllKelas } from "@/Utils/Apis/KelasApi";
import { getAllMataKuliah } from "@/Utils/Apis/MataKuliahApi";

const Mahasiswa = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  // STATE
  const [mahasiswa, setMahasiswa] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);

  // 🔍 Search & Sort
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Form
  const [form, setForm] = useState({
    id: "",
    nim: "",
    name: "",
    max_sks: 0,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FETCH
  useEffect(() => {
    fetchData();
  }, [page, search, sortBy, sortOrder]);

  const fetchData = async () => {
    try {
      const [resMahasiswa, resKelas, resMataKuliah] = await Promise.all([
        getAllMahasiswa({
          _page: page,
          _limit: limit,
          q: search,
          _sort: sortBy,
          _order: sortOrder,
        }),
        getAllKelas(),
        getAllMataKuliah(),
      ]);

      setMahasiswa(resMahasiswa.data);
      setKelas(resKelas.data);
      setMataKuliah(resMataKuliah.data);

      const total = resMahasiswa.headers["x-total-count"];
      setTotalPages(Math.ceil(total / limit));
    } catch (err) {
      toastError("Gagal mengambil data mahasiswa");
    }
  };

  // FORM
  const resetForm = () => {
    setForm({ id: "", nim: "", name: "", max_sks: 0 });
    setIsEdit(false);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setForm({
      id: mhs.id,
      nim: mhs.nim,
      name: mhs.name,
      max_sks: mhs.max_sks,
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  // SUBMIT
  const handleSubmit = async () => {
    if (!form.nim || !form.name || !form.max_sks) {
      toastError("NIM, Nama, dan Max SKS wajib diisi!");
      return;
    }

    if (isEdit) {
      confirmUpdate(async () => {
        await updateMahasiswa(form.id, form);
        toastSuccess("Data berhasil diupdate");
        fetchData();
        resetForm();
      });
    } else {
      await storeMahasiswa(form);
      toastSuccess("Data berhasil ditambahkan");
      fetchData();
      resetForm();
    }
  };

  // DELETE
  const handleDelete = (id) => {
    confirmDelete(async () => {
      await deleteMahasiswa(id);
      toastSuccess("Data berhasil dihapus");
      fetchData();
    });
  };

  // TOTAL SKS
  const getTotalSks = (mhsId) => {
    return kelas
      .filter((k) => (k.mahasiswa_ids || []).includes(mhsId))
      .map(
        (k) =>
          mataKuliah.find(
            (mk) => Number(mk.id) === Number(k.mata_kuliah_id)
          )?.sks || 0
      )
      .reduce((a, b) => a + b, 0);
  };

  // RENDER
  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2">Daftar Mahasiswa</Heading>

          {user?.permission?.includes("mahasiswa.create") && (
            <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
          )}
        </div>

        {/* 🔍 SEARCH & SORT UI */}
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            placeholder="Cari nama / NIM..."
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700 px-3 py-1 rounded flex-grow"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700 px-3 py-1 rounded"
          >
            <option value="name">Sort by Nama</option>
            <option value="nim">Sort by NIM</option>
            <option value="max_sks">Sort by Max SKS</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700 px-3 py-1 rounded"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        {/* TABLE */}
        <TableMahasiswa
          data={mahasiswa}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
          getTotalSks={getTotalSks}
        />

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Halaman {page} dari {totalPages}
          </p>

          <div className="flex gap-2">
            <Button
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>

            <Button
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      <Outlet />

      <ModalMahasiswa
        isOpen={isModalOpen}
        isEdit={isEdit}
        form={form}
        onChange={handleChange}
        onClose={resetForm}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Mahasiswa;
