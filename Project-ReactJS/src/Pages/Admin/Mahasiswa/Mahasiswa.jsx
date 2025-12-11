import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "@/Utils/Apis/MahasiswaApi";

import { toastError, toastSuccess } from "@/Utils/Helpers/ToastHelpers";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import TableMahasiswa from "./TableMahasiswa";
import ModalMahasiswa from "./ModalMahasiswa";

const Mahasiswa = () => {
  const navigate = useNavigate();

  const [mahasiswa, setMahasiswa] = useState([]);
  const [form, setForm] = useState({ nim: "", nama: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

// FETCH DATA DARI API
  const fetchMahasiswa = async () => {
  try {
    const res = await getAllMahasiswa();
    console.log("DATA API:", res.data); // DEBUG
    setMahasiswa(res.data);
  } catch (err) {
    toastError("Gagal mengambil data mahasiswa");
  }
};


  useEffect(() => {
    fetchMahasiswa();
  }, []);

  // FORM HANLDE CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD MODAL
  const openAddModal = () => {
    setForm({ id: "", nim: "", nama: "" });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  // EDIT MODAL
  const openEditModal = (mhs) => {
    setForm({
      id: mhs.id,
      nim: mhs.nim,
      nama: mhs.nama,
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };


  // VALIDASI FORM
  const validateForm = () => {
    if (!form.nim || !form.nama) {
      toastError("NIM dan Nama wajib diisi!");
      return false;
    }

    if (!isEdit) {
      const exists = mahasiswa.some((m) => m.nim === form.nim);
      if (exists) {
        toastError("NIM sudah terdaftar!");
        return false;
      }
    }

    return true;
  };

  // SUBMIT (TAMBAH / UPDATE)
  const handleSubmit = async () => {
  if (!validateForm()) return;

  if (isEdit) {
    confirmUpdate(async () => {
      await updateMahasiswa(form.id, { nim: form.nim, nama: form.nama });
      toastSuccess("Data berhasil diupdate");
      setIsModalOpen(false);
      fetchMahasiswa();
    });
  } else {
    try {
      await storeMahasiswa({ nim: form.nim, nama: form.nama }); // ← id DIHAPUS
      toastSuccess("Data berhasil ditambahkan");
      setIsModalOpen(false);
      fetchMahasiswa();
    } catch {
      toastError("Gagal menambahkan data");
    }
  }
};

  // DELETE DATA
  const handleDelete = async (id) => {
    confirmDelete(async () => {
      await deleteMahasiswa(id);
      toastSuccess("Data berhasil dihapus");
      fetchMahasiswa();
    });
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>
          <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
        </div>

        <TableMahasiswa
          data={mahasiswa}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
        />
      </Card>

      <ModalMahasiswa
        isOpen={isModalOpen}
        isEdit={isEdit}
        form={form}
        onChange={handleChange}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Mahasiswa;
