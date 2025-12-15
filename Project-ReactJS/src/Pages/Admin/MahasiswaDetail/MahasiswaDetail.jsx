import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

function MahasiswaDetail() {
  const { id } = useParams();
  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMahasiswa();
  }, [id]);

  const fetchMahasiswa = async () => {
    try {
      const res = await getMahasiswa(id);
      setMahasiswa(res.data);
    } catch (err) {
      toastError("Gagal mengambil data mahasiswa");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center">Memuat data...</p>;
  }

  if (!mahasiswa) {
    return <p className="text-center">Data tidak ditemukan</p>;
  }

  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Detail Mahasiswa</h2>
      <p>
        <strong>NIM:</strong> {mahasiswa.nim}
      </p>
      <p>
        <strong>Nama:</strong> {mahasiswa.nama}
      </p>
    </div>
  );
}

export default MahasiswaDetail;
