import Button from "@/Pages/Admin/Components/Button";
import Select from "@/Pages/Admin/Components/Select";

export default function TableRencanaStudi({
  kelas = [],
  mahasiswa = [],
  dosen = [],
  mataKuliah = [],
  selectedMhs,
  setSelectedMhs,
  selectedDsn,
  setSelectedDsn,
  handleAddMahasiswa,
  handleDeleteMahasiswa,
  handleChangeDosen,
  handleDeleteKelas,
}) {
  if (kelas.length === 0)
    return (
      <p className="text-sm text-gray-500 italic">
        Belum ada kelas tersedia
      </p>
    );

  return (
    <div className="space-y-6">
      {kelas.map((kls) => {
        const matkul = mataKuliah.find(
          (m) => m.id === kls.mata_kuliah_id
        );
        const dosenPengampu = dosen.find(
          (d) => d.id === kls.dosen_id
        );
        const mhsInClass = (kls.mahasiswa_ids || [])
          .map((id) => mahasiswa.find((m) => m.id === id))
          .filter(Boolean);

        return (
          <div
            key={kls.id}
            className="rounded-lg bg-white shadow-sm overflow-hidden"
          >
            {/* HEADER + ACTION */}
            <div className="px-4 py-4 bg-gray-50 border-b space-y-3">
              
              {/* Info Matkul + Dosen */}
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {matkul?.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Dosen: <strong>{dosenPengampu?.name}</strong>
                  </p>
                </div>

                <div className="flex gap-2">
                  <Select
                    size="sm"
                    value={selectedDsn[kls.id] || ""}
                    onChange={(e) =>
                      setSelectedDsn({
                        ...selectedDsn,
                        [kls.id]: e.target.value,
                      })
                    }
                  >
                    <option value="">Ganti Dosen</option>
                    {dosen.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </Select>

                  <Button
                    size="sm"
                    onClick={() => handleChangeDosen(kls)}
                  >
                    Simpan
                  </Button>

                  {mhsInClass.length === 0 && (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() =>
                        handleDeleteKelas(kls.id)
                      }
                    >
                      Hapus
                    </Button>
                  )}
                </div>
              </div>

              {/* Tambah Mahasiswa (PINDAH KE ATAS) */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Select
                  size="sm"
                  value={selectedMhs[kls.id] || ""}
                  onChange={(e) =>
                    setSelectedMhs({
                      ...selectedMhs,
                      [kls.id]: Number(e.target.value),
                    })
                  }
                  className="flex-1"
                >
                  <option value="">Pilih Mahasiswa</option>
                  {mahasiswa.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </Select>

                <Button
                  size="sm"
                  onClick={() =>
                    handleAddMahasiswa(
                      kls,
                      selectedMhs[kls.id]
                    )
                  }
                >
                  Tambah
                </Button>
              </div>
            </div>

            {/* TABLE MAHASISWA */}
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Nama</th>
                  <th className="py-2 px-4 text-left">NIM</th>
                  <th className="py-2 px-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {mhsInClass.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="py-4 text-center text-gray-500"
                    >
                      Belum ada mahasiswa
                    </td>
                  </tr>
                )}

                {mhsInClass.map((m, index) => (
                  <tr
                    key={m.id}
                    className={`${
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-100"
                    } hover:bg-blue-50 transition-colors duration-200`}
                  >
                    <td className="py-2 px-4">{m.name}</td>
                    <td className="py-2 px-4">{m.nim}</td>
                    <td className="py-2 px-4 text-center">
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() =>
                          handleDeleteMahasiswa(
                            kls,
                            m.id
                          )
                        }
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}