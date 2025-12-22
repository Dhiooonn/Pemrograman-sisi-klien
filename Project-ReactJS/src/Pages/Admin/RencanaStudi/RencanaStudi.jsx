import { useEffect, useState } from "react";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import TableRencanaStudi from "./TableRencanaStudi";
import ModalRencanaStudi from "./ModalRencanaStudi";

import { toastError, toastSuccess } from "@/Utils/Helpers/ToastHelpers";
import { confirmDelete } from "@/Utils/Helpers/SwalHelpers";

import { useAuthStateContext } from "@/Pages/Auth/Context/AuthContext";

// API
import {
  getAllKelas,
  storeKelas,
  updateKelas,
  deleteKelas,
} from "@/Utils/Apis/KelasApi";

import { getAllDosen } from "@/Utils/Apis/DosenApi";
import { getAllMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { getAllMataKuliah } from "@/Utils/Apis/MataKuliahApi";

const RencanaStudi = () => {
  const { user } = useAuthStateContext();

  // ROLE & PERMISSION
  const canCreate = user?.permission?.includes("rencana-studi.create");
  const canUpdate = user?.permission?.includes("rencana-studi.update");
  const canDelete = user?.permission?.includes("rencana-studi.delete");

  const isReadOnly = !canUpdate; // mahasiswa = read only

  // STATE
  const [kelas, setKelas] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);

  const [selectedMhs, setSelectedMhs] = useState({});
  const [selectedDsn, setSelectedDsn] = useState({});

  const [form, setForm] = useState({
    mata_kuliah_id: "",
    dosen_id: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // FETCH DATA
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resKelas, resDosen, resMahasiswa, resMataKuliah] =
        await Promise.all([
          getAllKelas(),
          getAllDosen(),
          getAllMahasiswa(),
          getAllMataKuliah(),
        ]);

      setKelas(resKelas.data);
      setDosen(resDosen.data);
      setMahasiswa(resMahasiswa.data);
      setMataKuliah(resMataKuliah.data);
    } catch {
      toastError("Gagal mengambil data");
    }
  };

  // HELPERS
  const getMaxSksMahasiswa = (id) =>
    mahasiswa.find((m) => Number(m.id) === Number(id))?.max_sks || 0;

  const getMaxSksDosen = (id) =>
    dosen.find((d) => Number(d.id) === Number(id))?.max_sks || 0;

  const getTotalSksMahasiswa = (mhsId) => {
    const id = Number(mhsId);

    return kelas
      .filter((k) =>
        (k.mahasiswa_ids || []).map(Number).includes(id)
      )
      .map(
        (k) =>
          mataKuliah.find(
            (mk) => Number(mk.id) === Number(k.mata_kuliah_id)
          )?.sks || 0
      )
      .reduce((a, b) => a + b, 0);
  };

  // TAMBAH MAHASISWA
  const handleAddMahasiswa = async (kelasItem, mhsId) => {
    if (isReadOnly) {
      toastError("Anda tidak memiliki izin");
      return;
    }

    try {
      const mhsIdNum = Number(mhsId);

      if (!mhsId) {
        toastError("Pilih mahasiswa terlebih dahulu");
        return;
      }

      if (kelasItem.mahasiswa_ids.map(Number).includes(mhsIdNum)) {
        toastError("Mahasiswa sudah terdaftar");
        return;
      }

      const sksMatkul =
        mataKuliah.find(
          (m) => Number(m.id) === Number(kelasItem.mata_kuliah_id)
        )?.sks || 0;

      const total = getTotalSksMahasiswa(mhsIdNum);
      const max = getMaxSksMahasiswa(mhsIdNum);

      if (total + sksMatkul > max) {
        toastError(`SKS melebihi batas maksimal (${max})`);
        return;
      }

      await updateKelas(kelasItem.id, {
        ...kelasItem,
        mahasiswa_ids: [
          ...kelasItem.mahasiswa_ids.map(Number),
          mhsIdNum,
        ],
      });

      toastSuccess("Mahasiswa berhasil ditambahkan");
      fetchData();
    } catch {
      toastError("Gagal menambahkan mahasiswa");
    }
  };

  // HAPUS MAHASISWA
  const handleDeleteMahasiswa = (kelasItem, mhsId) => {
    if (isReadOnly) {
      toastError("Anda tidak memiliki izin");
      return;
    }

    confirmDelete(async () => {
      try {
        const id = Number(mhsId);

        await updateKelas(kelasItem.id, {
          ...kelasItem,
          mahasiswa_ids: kelasItem.mahasiswa_ids
            .map(Number)
            .filter((x) => x !== id),
        });

        toastSuccess("Mahasiswa berhasil dihapus");
        fetchData();
      } catch {
        toastError("Gagal menghapus mahasiswa");
      }
    });
  };

  // GANTI DOSEN
  const handleChangeDosen = async (kelasItem) => {
    if (isReadOnly) {
      toastError("Anda tidak memiliki izin");
      return;
    }

    try {
      const dsnIdNum = Number(selectedDsn[kelasItem.id]);

      if (!dsnIdNum) {
        toastError("Pilih dosen terlebih dahulu");
        return;
      }

      const sksKelas =
        mataKuliah.find(
          (m) => Number(m.id) === Number(kelasItem.mata_kuliah_id)
        )?.sks || 0;

      const totalDosen = kelas
        .filter((k) => Number(k.dosen_id) === dsnIdNum)
        .map(
          (k) =>
            mataKuliah.find(
              (mk) => Number(mk.id) === Number(k.mata_kuliah_id)
            )?.sks || 0
        )
        .reduce((a, b) => a + b, 0);

      const max = getMaxSksDosen(dsnIdNum);

      if (totalDosen + sksKelas > max) {
        toastError(`Dosen melebihi batas maksimal (${max})`);
        return;
      }

      await updateKelas(kelasItem.id, {
        ...kelasItem,
        dosen_id: dsnIdNum,
      });

      toastSuccess("Dosen berhasil diperbarui");
      fetchData();
    } catch {
      toastError("Gagal memperbarui dosen");
    }
  };

  // DELETE KELAS
  const handleDeleteKelas = (kelasId) => {
    if (!canDelete) {
      toastError("Anda tidak memiliki izin");
      return;
    }

    confirmDelete(async () => {
      await deleteKelas(kelasId);
      toastSuccess("Kelas berhasil dihapus");
      fetchData();
    });
  };

  // TAMBAH KELAS
  const openAddModal = () => {
    if (!canCreate) {
      toastError("Anda tidak memiliki izin");
      return;
    }

    setForm({ mata_kuliah_id: "", dosen_id: "" });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canCreate) {
      toastError("Anda tidak memiliki izin");
      return;
    }

    if (!form.mata_kuliah_id || !form.dosen_id) {
      toastError("Mata kuliah dan dosen wajib dipilih");
      return;
    }

    await storeKelas({
      mata_kuliah_id: Number(form.mata_kuliah_id),
      dosen_id: Number(form.dosen_id),
      mahasiswa_ids: [],
    });

    toastSuccess("Kelas berhasil ditambahkan");
    setIsModalOpen(false);
    fetchData();
  };

  // RENDER
  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2">Rencana Studi</Heading>

          {canCreate && (
            <Button onClick={openAddModal}>
              + Tambah Kelas
            </Button>
          )}
        </div>

        <TableRencanaStudi
          kelas={kelas}
          mahasiswa={mahasiswa}
          dosen={dosen}
          mataKuliah={mataKuliah}
          selectedMhs={selectedMhs}
          setSelectedMhs={setSelectedMhs}
          selectedDsn={selectedDsn}
          setSelectedDsn={setSelectedDsn}
          handleAddMahasiswa={handleAddMahasiswa}
          handleDeleteMahasiswa={handleDeleteMahasiswa}
          handleChangeDosen={handleChangeDosen}
          handleDeleteKelas={handleDeleteKelas}
          getTotalSksMahasiswa={getTotalSksMahasiswa}
        />
      </Card>

      <ModalRencanaStudi
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChange={handleChange}
        onSubmit={handleSubmit}
        form={form}
        dosen={dosen}
        mataKuliah={mataKuliah}
      />
    </>
  );
};

export default RencanaStudi;
