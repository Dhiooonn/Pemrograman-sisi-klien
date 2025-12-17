import axios from "@/Utils/AxiosInstance";

export const getAllMahasiswa = (params = {}) => 
    axios.get("/mahasiswa", { params });

// get detail
export const getMahasiswa = (id) =>
  axios.get(`/mahasiswa/${id}`);

// create
export const storeMahasiswa = (data) =>
  axios.post("/mahasiswa", data);

// update
export const updateMahasiswa = (id, data) =>
  axios.put(`/mahasiswa/${id}`, data);

// Delete 
export const deleteMahasiswa = (id) =>
  axios.delete(`/mahasiswa/${id}`);

//  Di sini, params akan diisi dengan kombinasi query seperti:
// {
//   q: "keyword",         // Pencarian
//   _sort: "name",        // Urut berdasarkan kolom
//   _order: "asc",        // Arah pengurutan
//   _page: 1,             // Halaman ke-1
//   _limit: 5             // 5 data per halaman
// }