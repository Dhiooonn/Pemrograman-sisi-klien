import axios from "@/Utils/AxiosInstance";

// Ambil semua mahasiswa
export const getAllMahasiswa = () => axios.get("/mahasiswa");

// Ambil 1 Mahasiswa
export const getMahasiswa = (id) => axios.get(`/mahasiswa/${id}`);

// Tambah Mahasiswa
export const storeMahasiswa = (data) => axios.post("/mahasiswa/", data);

// Update Mahasiswa
export const updateMahasiswa = (id, data) => axios.put(`/mahasiswa/${id}`, data);

// Hapus Mahasiswa
export const deleteMahasiswa = (id) => axios.delete(`/mahasiswa/${id}`);