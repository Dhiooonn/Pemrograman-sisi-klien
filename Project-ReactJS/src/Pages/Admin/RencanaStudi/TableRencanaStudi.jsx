import React from "react";
import Button from "@/Pages/Admin/Components/Button";
import Select from "@/Pages/Admin/Components/Select";

// Sub-Component: Avatar Kecil 
const AvatarSmall = ({ name }) => {

  const initial = name ? name.charAt(0).toUpperCase() : "?";
  // Pilihan warna background avatar
  const colors = [
    "bg-indigo-100 text-indigo-600",
    "bg-pink-100 text-pink-600",
    "bg-teal-100 text-teal-600",
    "bg-orange-100 text-orange-600"
  ];
  const colorClass = colors[name.length % colors.length];

  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${colorClass} ring-2 ring-white`}>
      {initial}
    </div>
  );
};

// Main Component 
export default function TableRencanaStudi({
  kelas,
  mahasiswa,
  dosen,
  mataKuliah,
  getTotalSksMahasiswa,
  selectedMhs,
  setSelectedMhs,
  selectedDsn,
  setSelectedDsn,
  handleAddMahasiswa,
  handleDeleteMahasiswa,
  handleChangeDosen,
  handleDeleteKelas,
}) {
  return (
    <div className="space-y-8">

      {/* State: Jika data kelas kosong */}
      {kelas.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">Belum ada kelas yang dibentuk.</p>
        </div>
      )}

      {/* Looping Data Kelas */}
      {kelas.map((kls) => {
        // Helper: Cari data relasi
        const matkul = mataKuliah.find((m) => Number(m.id) === Number(kls.mata_kuliah_id));
        const dosenPengampu = dosen.find((d) => Number(d.id) === Number(kls.dosen_id));
        
        const mhsInClass = (kls.mahasiswa_ids || [])
          .map((id) => mahasiswa.find((m) => Number(m.id) === Number(id)))
          .filter(Boolean);

        return (
          <div 
            key={kls.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-shadow hover:shadow-md"
          >
            {/* --- HEADER KELAS (Gradient Background) --- */}
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              
              {/* Info Kiri: Matkul & Dosen */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-blue-100 text-blue-700">
                    Mata Kuliah
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {matkul?.name || "Mata Kuliah Tidak Ditemukan"}
                </h3>
                
                <div className="mt-2 flex items-center text-sm text-gray-600 gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  <span className="font-medium">Dosen Pengampu:</span>
                  <span className="text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                    {dosenPengampu?.name || "-"}
                  </span>
                </div>
              </div>

              {/* Ganti Dosen & Hapus Kelas */}
              <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Select
                    value={selectedDsn[kls.id] || ""}
                    onChange={(e) =>
                      setSelectedDsn({ ...selectedDsn, [kls.id]: e.target.value })
                    }
                    size="sm"
                    className="w-full md:w-48 text-xs"
                  >
                    <option value="">-- Ganti Dosen --</option>
                    {dosen.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </Select>
                  
                  <Button
                    size="sm"
                    className="whitespace-nowrap"
                    disabled={!selectedDsn[kls.id]}
                    onClick={() => handleChangeDosen(kls)}
                  >
                    Update
                  </Button>
                </div>

                {/* Tombol Hapus Kelas (Hanya muncul jika kelas kosong) */}
                {mhsInClass.length === 0 && (
                   <button
                   onClick={() => handleDeleteKelas(kls.id)}
                   className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors flex items-center gap-1"
                 >
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                   Hapus Kelas Kosong
                 </button>
                )}
              </div>
            </div>

            {/* --- BODY (TABEL MAHASISWA) --- */}
            <div className="bg-white">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  Mahasiswa Terdaftar
                  <span className="bg-gray-100 text-gray-600 text-xs py-0.5 px-2 rounded-full">
                    {mhsInClass.length}
                  </span>
                </h4>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-400 uppercase bg-white border-b border-gray-100">
                    <tr>
                      <th className="py-3 px-5 font-medium w-12 text-center">#</th>
                      <th className="py-3 px-5 font-medium">Nama Mahasiswa</th>
                      <th className="py-3 px-5 font-medium">NIM</th>
                      <th className="py-3 px-5 font-medium text-center">Beban SKS</th>
                      <th className="py-3 px-5 font-medium text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {mhsInClass.length > 0 ? (
                      mhsInClass.map((m, i) => {
                        const totalSks = getTotalSksMahasiswa(m.id);
                        return (
                          <tr key={m.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="py-3 px-5 text-center text-gray-400 text-xs">{i + 1}</td>
                            <td className="py-3 px-5">
                              <div className="flex items-center gap-3">
                                <AvatarSmall name={m.name} />
                                <span className="font-medium text-gray-700">{m.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-5 font-mono text-xs text-gray-500">{m.nim}</td>
                            <td className="py-3 px-5 text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                {totalSks} SKS
                              </span>
                            </td>
                            <td className="py-3 px-5 text-right">
                              {/* 🔴 TOMBOL HAPUS (MERAH) 🔴 */}
                              <button
                                onClick={() => handleDeleteMahasiswa(kls, m.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-md transition-all"
                                title="Keluarkan Mahasiswa"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-gray-400 text-sm italic">
                           Kelas ini belum memiliki mahasiswa.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* --- FOOTER (Form Tambah Mahasiswa) --- */}
            <div className="bg-gray-50 px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
              <div className="text-xs font-medium text-gray-500 whitespace-nowrap">
                Tambah Mahasiswa ke Kelas:
              </div>
              <div className="flex-1 w-full flex gap-2">
                <Select
                  value={selectedMhs[kls.id] || ""}
                  onChange={(e) =>
                    setSelectedMhs({ ...selectedMhs, [kls.id]: e.target.value })
                  }
                  size="sm"
                  className="w-full"
                >
                  <option value="">-- Pilih Mahasiswa --</option>
                  {mahasiswa.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.nim})
                    </option>
                  ))}
                </Select>
                
                <Button
                  size="sm"
                  variant="primary"
                  disabled={!selectedMhs[kls.id]}
                  onClick={() => handleAddMahasiswa(kls, selectedMhs[kls.id])}
                  className="flex items-center gap-1 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  Tambah
                </Button>
              </div>
            </div>
            
          </div>
        );
      })}
    </div>
  );
}