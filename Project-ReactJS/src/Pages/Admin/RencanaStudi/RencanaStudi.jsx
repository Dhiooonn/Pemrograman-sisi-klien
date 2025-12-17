import { useEffect, useState } from "react";
import { useAuthStateContext } from "@/Pages/Auth/Context/AuthContext";

import {
  getAllKelas,
  storeKelas,
  updateKelas,
  deleteKelas,
} from "@/Utils/Apis/KelasApi";
import { getAllDosen } from "@/Utils/Apis/DosenApi";
import { getAllMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { getAllMataKuliah } from "@/Utils/Apis/MataKuliahApi";

import TableRencanaStudi from "./TableRencanaStudi";
import ModalRencanaStudi from "./ModalRencanaStudi";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import { toastError, toastSuccess } from "@/Utils/Helpers/ToastHelpers";
import { confirmDelete } from "@/Utils/Helpers/SwalHelpers";

const RencanaStudi = () => {
  const { user } = useAuthStateContext();

  const [kelas, setKelas] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);

  const [selectedMhs, setSelectedMhs] = useState({});
  const [selectedDsn, setSelectedDsn] = useState({});
  const [form, setForm] = useState({ mata_kuliah_id: "", dosen_id: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [resKelas, resDosen, resMahasiswa, resMatkul] =
      await Promise.all([
        getAllKelas(),
        getAllDosen(),
        getAllMahasiswa(),
        getAllMataKuliah(),
      ]);

    setKelas(resKelas.data);
    setDosen(resDosen.data);
    setMahasiswa(resMahasiswa.data);
    setMataKuliah(resMatkul.data);
  };

  const getMaxSksMahasiswa = (id) =>
    mahasiswa.find((m) => m.id === id)?.max_sks || 0;

  const getMaxSksDosen = (id) =>
    dosen.find((d) => d.id === id)?.max_sks || 0;

  const handleAddMahasiswa = async (kls, mhsId) => {
    if (!mhsId) return;

    const sksMatkul =
      mataKuliah.find((m) => m.id === kls.mata_kuliah_id)?.sks || 0;

    const totalSks = kelas
      .filter((k) => k.mahasiswa_ids.includes(mhsId))
      .reduce(
        (sum, k) =>
          sum +
          (mataKuliah.find((m) => m.id === k.mata_kuliah_id)?.sks || 0),
        0
      );

    if (totalSks + sksMatkul > getMaxSksMahasiswa(mhsId)) {
      toastError("SKS mahasiswa melebihi batas");
      return;
    }

    if (kls.mahasiswa_ids.includes(mhsId)) {
      toastError("Mahasiswa sudah terdaftar");
      return;
    }

    await updateKelas(kls.id, {
      ...kls,
      mahasiswa_ids: [...kls.mahasiswa_ids, mhsId],
    });

    toastSuccess("Mahasiswa ditambahkan");
    setSelectedMhs((prev) => ({ ...prev, [kls.id]: "" }));
    fetchData();
  };

  const handleDeleteMahasiswa = async (kls, mhsId) => {
    await updateKelas(kls.id, {
      ...kls,
      mahasiswa_ids: kls.mahasiswa_ids.filter((id) => id !== mhsId),
    });
    toastSuccess("Mahasiswa dihapus");
    fetchData();
  };

  const handleChangeDosen = async (kls) => {
    const dsnId = selectedDsn[kls.id];
    if (!dsnId) return;

    const kelasSks =
      mataKuliah.find((m) => m.id === kls.mata_kuliah_id)?.sks || 0;

    const totalSks = kelas
      .filter((k) => k.dosen_id === dsnId)
      .reduce(
        (sum, k) =>
          sum +
          (mataKuliah.find((m) => m.id === k.mata_kuliah_id)?.sks || 0),
        0
      );

    if (totalSks + kelasSks > getMaxSksDosen(dsnId)) {
      toastError("SKS dosen melebihi batas");
      return;
    }

    await updateKelas(kls.id, { ...kls, dosen_id: dsnId });
    toastSuccess("Dosen diperbarui");
    fetchData();
  };

  const handleDeleteKelas = (id) => {
    confirmDelete(async () => {
      await deleteKelas(id);
      toastSuccess("Kelas dihapus");
      fetchData();
    });
  };

  const handleSubmit = async () => {
    if (!form.mata_kuliah_id || !form.dosen_id) {
      toastError("Form belum lengkap");
      return;
    }

    await storeKelas({ ...form, mahasiswa_ids: [] });
    toastSuccess("Kelas ditambahkan");
    setIsModalOpen(false);
    fetchData();
  };

  const mataKuliahBelumAdaKelas = mataKuliah.filter(
    (m) => !kelas.map((k) => k.mata_kuliah_id).includes(m.id)
  );

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2">Rencana Studi</Heading>

          {user?.permission?.includes("rencana-studi.create") && (
            <Button onClick={() => setIsModalOpen(true)}>
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
        />
      </Card>

      <ModalRencanaStudi
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        onChange={(e) =>
          setForm({ ...form, [e.target.name]: e.target.value })
        }
        form={form}
        dosen={dosen}
        mataKuliah={mataKuliahBelumAdaKelas}
      />
    </>
  );
};

export default RencanaStudi;
