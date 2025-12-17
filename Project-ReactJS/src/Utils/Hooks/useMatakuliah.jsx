import { useQuery } from "@tanstack/react-query";
import { getAllMataKuliah} from "@/Utils/Apis/MataKuliahApi";

export const useMatakuliah = () =>
    useQuery({
        queryKey: ["mata_kuliah"],
        queryFn: getAllMataKuliah,
        select: (res) => res?.data ??[],
    });