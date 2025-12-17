import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import TableMahasiswa from "./TableMahasiswa";
import ModalMahasiswa from "./ModalMahasiswa";

import { toastError, toastSuccess } from "@/Utils/Helpers/ToastHelpers";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";

import { useAuthStateContext } from "@/Pages/Auth/Context/AuthContext";

// React Query Hooks
import { useMahasiswa } from "@/Utils/Hooks/useMahasiswa";
import { useKelas } from "@/Utils/Hooks/useKelas";
import { useMatakuliah } from "@/Utils/Hooks/useMatakuliah";

// API langsung
import {
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "@/Utils/Apis/MahasiswaApi";

const Mahasiswa = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  // UI STATE
  const [form, setForm] = useState({ id: "", nim: "", name: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // TABLE STATE
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  // DATA (React Query)
  const {
    data: result = { data: [], total: 0 },
    isLoading: isLoadingMahasiswa,
  } = useMahasiswa({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: limit,
  });

  const { data: mahasiswa = [] } = result;
  const totalCount = result.total;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const { data: kelas = [] } = useKelas();
  const { data: mataKuliah = [] } = useMatakuliah();

  // HELPERS
  const resetForm = () => {
    setForm({ id: "", nim: "", name: "" });
    setIsEdit(false);
    setIsModalOpen(false);
  };

  // FORM HANDLER
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setForm(mhs);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  // SUBMIT
  const handleSubmit = async () => {
    if (!form.nim || !form.name) {
      toastError("NIM dan Nama wajib diisi!");
      return;
    }

    if (isEdit) {
      confirmUpdate(async () => {
        await updateMahasiswa(form.id, form);
        toastSuccess("Data berhasil diupdate");
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
      resetForm();
    }
  };

  // DELETE
  const handleDelete = (id) => {
    confirmDelete(async () => {
      await deleteMahasiswa(id);
      toastSuccess("Data berhasil dihapus");
    });
  };

  // PAGINATION
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2">Daftar Mahasiswa</Heading>

          {user?.permission?.includes("mahasiswa.create") && (
            <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
          )}
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari nama atau NIM..."
              className="
                w-full
                h-10
                rounded-lg
                border border-gray-300
                pl-10 pr-3
                text-sm
                text-gray-700
                placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                transition
              "
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>

          {/* Sort By */}
          <div className="relative w-full md:w-44">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="
                w-full
                h-10
                appearance-none
                rounded-lg
                border border-gray-300
                px-3 pr-8
                text-sm
                text-gray-700
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                transition
              "
            >
              <option value="name">Nama</option>
              <option value="nim">NIM</option>
              <option value="max_sks">Max SKS</option>
            </select>

            {/* Arrow */}
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ▼
            </span>
          </div>

          {/* Sort Order */}
          <div className="relative w-full md:w-32">
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setPage(1);
              }}
              className="
                w-full
                h-10
                appearance-none
                rounded-lg
                border border-gray-300
                px-3 pr-8
                text-sm
                text-gray-700
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                transition
              "
            >
              <option value="asc">⬆ Asc</option>
              <option value="desc">⬇ Desc</option>
            </select>

            {/* Arrow */}
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ▼
            </span>
          </div>
        </div>

        {/* TABLE */}
        {user?.permission?.includes("mahasiswa.read") ? (
          <TableMahasiswa
            data={mahasiswa}
            isLoading={isLoadingMahasiswa}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
          />
        ) : (
          <p className="text-gray-500 text-sm">
            Anda tidak memiliki izin untuk melihat data mahasiswa.
          </p>
        )}

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm">
            Halaman {page} dari {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handlePrev}
              disabled={page === 1}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleNext}
              disabled={page === totalPages}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
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
