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
  // ======================
  // STATE & CONTEXT
  // ======================
  const { user } = useAuthStateContext();

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

  // ======================
  // FETCH DATA
  // ======================
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        resKelas,
        resDosen,
        resMahasiswa,
        resMataKuliah,
      ] = await Promise.all([
        getAllKelas(),
        getAllDosen(),
        getAllMahasiswa(),
        getAllMataKuliah(),
      ]);

      setKelas(resKelas.data);
      setDosen(resDosen.data);
      setMahasiswa(resMahasiswa.data);
      setMataKuliah(resMataKuliah.data);
    } catch (err) {
      toastError("Gagal mengambil data");
    }
  };

  // ======================
  // HELPERS
  // ======================
  const getMaxSksMahasiswa = (id) =>
    mahasiswa.find((m) => Number(m.id) === Number(id))?.max_sks || 0;

  const getMaxSksDosen = (id) =>
    dosen.find((d) => Number(d.id) === Number(id))?.max_sks || 0;

  // 🔥 TOTAL SKS MAHASISWA (AMAN STRING / NUMBER)
  const getTotalSksMahasiswa = (mhsId) => {
    const mhsIdNum = Number(mhsId);

    return kelas
      .filter((k) =>
        (k.mahasiswa_ids || [])
          .map(Number)
          .includes(mhsIdNum)
      )
      .map(
        (k) =>
          mataKuliah.find(
            (mk) => Number(mk.id) === Number(k.mata_kuliah_id)
          )?.sks || 0
      )
      .reduce((a, b) => a + b, 0);
  };

  // ======================
  // TAMBAH MAHASISWA KE KELAS
  // ======================
  const handleAddMahasiswa = async (kelasItem, mhsId) => {
    try {
      if (!mhsId) {
        toastError("Pilih mahasiswa terlebih dahulu");
        return;
      }

      const mhsIdNum = Number(mhsId);

      if (kelasItem.mahasiswa_ids.map(Number).includes(mhsIdNum)) {
        toastError("Mahasiswa sudah terdaftar");
        return;
      }

      const sksMatkul =
        mataKuliah.find(
          (m) => Number(m.id) === Number(kelasItem.mata_kuliah_id)
        )?.sks || 0;

      const totalSks = getTotalSksMahasiswa(mhsIdNum);
      const maxSks = getMaxSksMahasiswa(mhsIdNum);

      if (totalSks + sksMatkul > maxSks) {
        toastError(`SKS melebihi batas maksimal (${maxSks})`);
        return;
      }

      await updateKelas(kelasItem.id, {
        ...kelasItem,
        mahasiswa_ids: [
          ...kelasItem.mahasiswa_ids.map(Number),
          mhsIdNum,
        ],
      });

      toastSuccess("Mahasiswa berhasil ditambahkan ke kelas");

      setSelectedMhs((prev) => ({
        ...prev,
        [kelasItem.id]: "",
      }));

      fetchData();
    } catch (error) {
      toastError("Gagal menambahkan mahasiswa ke kelas");
    }
  };

  // HAPUS MAHASISWA DARI KELAS
  const handleDeleteMahasiswa = async (kelasItem, mhsId) => {
    const mhsIdNum = Number(mhsId);

    await updateKelas(kelasItem.id, {
      ...kelasItem,
      mahasiswa_ids: kelasItem.mahasiswa_ids
        .map(Number)
        .filter((id) => id !== mhsIdNum),
    });

    toastSuccess("Mahasiswa dihapus");
    fetchData();
  };

  // GANTI DOSEN
  const handleChangeDosen = async (kelasItem) => {
    const dsnId = selectedDsn[kelasItem.id];

    if (!dsnId) {
      toastError("Pilih dosen terlebih dahulu");
      return;
    }

    const dsnIdNum = Number(dsnId);

    const sksKelas =
      mataKuliah.find(
        (m) => Number(m.id) === Number(kelasItem.mata_kuliah_id)
      )?.sks || 0;

    const totalSksDosen = kelas
      .filter((k) => Number(k.dosen_id) === dsnIdNum)
      .map(
        (k) =>
          mataKuliah.find(
            (mk) => Number(mk.id) === Number(k.mata_kuliah_id)
          )?.sks || 0
      )
      .reduce((a, b) => a + b, 0);

    const maxSks = getMaxSksDosen(dsnIdNum);

    if (totalSksDosen + sksKelas > maxSks) {
      toastError(`Dosen melebihi batas maksimal SKS (${maxSks})`);
      return;
    }

    await updateKelas(kelasItem.id, {
      ...kelasItem,
      dosen_id: dsnIdNum,
    });

    toastSuccess("Dosen berhasil diperbarui");
    fetchData();
  };

  // ======================
  // DELETE KELAS
  // ======================
  const handleDeleteKelas = (kelasId) => {
    confirmDelete(async () => {
      await deleteKelas(kelasId);
      toastSuccess("Kelas berhasil dihapus");
      fetchData();
    });
  };

  // ======================
  // MODAL TAMBAH KELAS
  // ======================
  const openAddModal = () => {
    setForm({ mata_kuliah_id: "", dosen_id: "" });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  // ======================
  // RENDER
  // ======================
  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2">Rencana Studi</Heading>

          {user?.permission?.includes("rencana-studi.page") && (
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