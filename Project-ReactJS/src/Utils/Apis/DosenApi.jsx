import axios from "@/Utils/AxiosInstance";

// Ambil semua dosen
export const getAllDosen = () => axios.get("/dosen");

// ambil 1 dosen
export const getDosen = (id) => axios.get(`/dosen/${id}`);

// tambah dosen
export const storeDosen = (data) => axios.post("/dosen", data);

// update dosen
export const updateDosen = (id, data) => axios.put(`/dosen/${id}`, data);

// hapus dosen
export const deleteDosen = (id) => axios.delete(`/dosen/${id}`, data);