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

  // State
  const [mahasiswa, setMahasiswa] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);

  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);

  const [form, setForm] = useState({
    id: "",
    nim: "",
    name: "",
    max_sks: 0,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Data
  useEffect(() => {
    setTimeout(() => fetchData(), 500);
  }, [page]);

  const fetchData = async () => {
    try {
      const [resMahasiswa, resKelas, resMataKuliah] = await Promise.all([
        getAllMahasiswa({ _page: page, _limit: limit }),
        getAllKelas(),
        getAllMataKuliah(),
      ]);

      setMahasiswa(resMahasiswa.data);
      setKelas(resKelas.data);
      setMataKuliah(resMataKuliah.data);

      const total = resMahasiswa.headers["x-total-count"]
      setTotalPages(Math.ceil(total / limit))
    } catch (err) {
      toastError("Gagal mengambil data");
    }
  };

  // Form
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

  // Submit
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
      const exists = mahasiswa.find((m) => m.nim === form.nim);
      if (exists) {
        toastError("NIM sudah terdaftar!");
        return;
      }

      await storeMahasiswa(form);
      toastSuccess("Data berhasil ditambahkan");
      fetchData();
      resetForm();
    }
  };


  // Delete
  const handleDelete = (id) => {
    confirmDelete(async () => {
      await deleteMahasiswa(id);
      toastSuccess("Data berhasil dihapus");
      fetchData();
    });
  };

  // Total Sks
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

  // Render
  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2">Daftar Mahasiswa</Heading>

          {user?.permission?.includes("mahasiswa.create") && (
            <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
          )}
        </div>

        {user?.permission?.includes("mahasiswa.read") ? (
          <TableMahasiswa
            data={mahasiswa}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
            getTotalSks={getTotalSks}
          />
        ) : (
          <p className="text-sm text-gray-500">
            Anda tidak memiliki izin melihat data mahasiswa.
          </p>
        )}

        {/* UI Button Pagination */}
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
        kelas={kelas}
        mataKuliah={mataKuliah}
      />
    </>
  );
};

export default Mahasiswa;
