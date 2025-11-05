import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  confirmDelete,
  confirmUpdate,
} from "@/Utils/Helpers/SwalHelpers";

import { toastSuccess } from "@/Utils/Helpers/ToastHelpers";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import { mahasiswaList } from "@/Data/Dummy";

import TableMahasiswa from "./TableMahasiswa";
import ModalMahasiswa from "./ModalMahasiswa";

const Mahasiswa = () => {
    const navigate = useNavigate();

    // const [mahasiswa, setMahasiswa] = useState([
    //     { nim: "20211001", nama: "Budi Santoso" },
    //     { nim: "20211002", nama: "Siti Aminah" },
    //   ]);

    const [mahasiswa, setMahasiswa] = useState(mahasiswaList);
    const [form, setForm] = useState({ nim: "", nama: "" });
    const [isEdit, setIsEdit] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addMahasiswa = (newData) => {
        setMahasiswa([...mahasiswa, newData]);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openAddModal = () => {
        setIsModalOpen(true);
        setForm({ nim: "", nama: "" });
        setIsEdit(false);
    }

    const handleEdit = (mhs) => {
        setForm({ nim: mhs.nim, nama: mhs.nama });
        setIsEdit(true);
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nim || !form.nama) {
          alert("NIM dan Nama wajib diisi");
          return;
        }
      
        if (isEdit) {
          confirmUpdate(() => {
            updateMahasiswa(form.nim, form);
            toastSuccess("Data berhasil diperbarui");
          });
        } else {
          const exists = mahasiswa.find((m) => m.nim === form.nim);
          if (exists) {
            alert("NIM sudah terdaftar!");
            return;
          }
          addMahasiswa(form);
          toastSuccess("Data berhasil ditambahkan");
        }
      
        setForm({ nim: "", nama: "" });
        setIsEdit(false);
        setIsModalOpen(false);
      }

    const updateMahasiswa = (nim, newData) => {
        const updated = mahasiswa.map((mhs) => 
            mhs.nim === nim ? {...mhs, ...newData} : mhs
        );
        setMahasiswa(updated);
    };

    const deleteMahasiswa = (nim) => {
        const filtered = mahasiswa.filter((mhs) => mhs.nim !== nim);
        setMahasiswa(filtered);
    }

    const handleDelete = (nim) => {
      confirmDelete(() => {
        deleteMahasiswa(nim);
        toastSuccess("Data berhasil dihapus");
      });
    };

  return (
    <>
        <Card>
        <div className="flex justify-between items-center mb-4">
            <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
            <Button onClick={() => openAddModal()}>+ Tambah Mahasiswa</Button>
        </div>

        <TableMahasiswa
            data={mahasiswa}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDetail={(nim) => navigate(`/admin/mahasiswa/${nim}`)}
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