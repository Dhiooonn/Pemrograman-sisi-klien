import { useQuery } from "@tanstack/react-query";
import { getAllMahasiswa } from "../Apis/MahasiswaApi";


export const useMahasiswa = (query = {}) =>
    useQuery({
        queryKey: ["mahasiswa", query],
        queryFn: () => getAllMahasiswa(query),
        select: (res) => ({
            data: res?.data ?? [],
            total: parseInt(res.headers["x-total-count"] ?? "0"),
        }),
        keepPreviousData: true,
    });