import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Ambil semua mahasiswa
export const useMahasiswa = () =>
    useQuery({
        queryKey: ["mahasiswa"],
        queryFn: getAllMahasiswa,
        select: (res) => res?.data ?? [],
    });

// Tambah
export const useStoreMahasiswa = () => {
    const queryClient = useQueryClient();
    return useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
            toastSuccess("Mahasiswa berhasil ditambhakan!");
        },
        onError: () => toastError("Gagal menambahkan mahasiswa"),
    });
};

// Edit
export const useUpdateMahasiswa = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => useUpdateMahasiswa(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
            toastSuccess("Mahasiswa berhasil diperbarui!")
        },
        onError: () => toastError("Gagal memperbarui mahasiswa."),
    });
};

// Hapus
export const useDeleteMahasiswa = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMahasiswa,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
            toastSuccess("Mahasiswa berhasil dihapus!");
        },
        onError: () => toastError("Gagal menghapus mahasiswa."),
    });
};