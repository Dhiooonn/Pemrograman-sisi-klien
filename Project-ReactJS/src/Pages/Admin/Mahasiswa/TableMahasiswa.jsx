import React from "react";
import { useAuthStateContext } from "../../Auth/Context/AuthContext";

// Komponen Avatar Sederhana (Inisial)
const Avatar = ({ name }) => {
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  const colors = [
    "bg-red-100 text-red-600",
    "bg-green-100 text-green-600",
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-orange-100 text-orange-600",
  ];

  // Pilih warna random berdasarkan panjang nama agar konsisten
  const colorClass = colors[name.length % colors.length];

  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${colorClass} mr-3`}>
      {initial}
    </div>
  );
};

// Komponen Progress Bar SKS
const SksProgressBar = ({ current, max }) => {
  const percentage = Math.min((current / max) * 100, 100);
  let barColor = "bg-blue-500";
  
  if (percentage >= 100) barColor = "bg-red-500";
  else if (percentage > 80) barColor = "bg-yellow-500";
  else barColor = "bg-emerald-500";

  return (
    <div className="w-full max-w-[120px] mx-auto">
      <div className="flex justify-between text-xs mb-1 text-gray-500">
        <span className="font-medium text-gray-700">{current}</span>
        <span>/ {max} SKS</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`${barColor} h-2 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const TableMahasiswa = ({ data = [], onEdit, onDelete, onDetail, getTotalSks }) => {
  const { user } = useAuthStateContext();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          
          {/* HEADER */}
          <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 uppercase text-xs tracking-wider">
            <tr>
              <th className="py-4 px-6 w-32">NIM</th>
              <th className="py-4 px-6">Mahasiswa</th>
              <th className="py-4 px-6 text-center">Status SKS</th>
              <th className="py-4 px-6 text-right">Aksi</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <span className="text-base font-medium">Belum ada data mahasiswa</span>
                    <p className="text-xs mt-1 text-gray-400">Silakan tambahkan data baru</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((mhs) => {
                const totalSks = getTotalSks(mhs.id);
                
                return (
                  <tr
                    key={mhs.nim}
                    className="hover:bg-blue-50/50 transition-colors duration-200 group"
                  >
                    {/* NIM */}
                    <td className="py-4 px-6">
                      <span className="font-mono text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                        {mhs.nim}
                      </span>
                    </td>

                    {/* NAMA + AVATAR */}
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <Avatar name={mhs.name} />
                        <div>
                          <div className="font-medium text-gray-900">{mhs.name}</div>
                          <div className="text-xs text-gray-500">Mahasiswa Aktif</div>
                        </div>
                      </div>
                    </td>

                    {/* SKS VISUALIZATION */}
                    <td className="py-4 px-6 text-center align-middle">
                      <SksProgressBar current={totalSks} max={mhs.max_sks || 24} />
                    </td>

                    {/* AKSI (Floating on hover or static) */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        
                        {/* Tombol Detail */}
                        <button
                          onClick={() => onDetail(mhs.id)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors tooltip-trigger"
                          title="Detail"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>

                        {/* Tombol Edit */}
                        {user.permission.includes("mahasiswa.update") && (
                          <button
                            onClick={() => onEdit(mhs)}
                            className="p-2 text-amber-500 hover:bg-amber-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00 2 2h11a2 2 0 00 2-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                        )}

                        {/* Tombol Hapus */}
                        {user.permission.includes("mahasiswa.delete") && (
                          <button
                            onClick={() => onDelete(mhs.id)}
                            className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableMahasiswa;