import Button from "@/Pages/Admin/Components/Button";
import { useAuthStateContext } from "../../Auth/Context/AuthContext";

const TableMahasiswa = ({ data = [], onEdit, onDelete, onDetail }) => {
  const { user } = useAuthStateContext

  // helper permission
  const can = (permissions) => user.permissions.includes(permissions)
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">NIM</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>

      <tbody>
        {/* {data.map((mhs, index) => (
          <tr key={mhs.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} hover:bg-blue-50 transition-colors duration-200`}>
            <td className="py-2 px-4">{mhs.nim}</td>
            <td className="py-2 px-4">{mhs.nama}</td>
            <td className="py-2 px-4 text-center space-x-2">
              <Button size="sm" onClick={() => onDetail(mhs.id)}>Detail</Button>
              <Button size="sm" variant="warning" onClick={() => onEdit(mhs)}>
                Edit
              </Button>
              <Button size="sm" variant="danger" onClick={() => onDelete(mhs.id)}>
                Hapus
              </Button>
            </td>
          </tr>
        ))} */}
        {data.length === 0 && (
          <tr>
            <td colSpan="3" className="py-4 text-center text-gray-500">
              Data mahasiswa belum tersedia
            </td>
          </tr>
        )}

        {data.map((mhs, index) => (
          <tr
            key={mhs.id}
            className={`${
              index % 2 === 0 ? "bg-white" : "bg-gray-100"
            } hover:bg-blue-50 transition-colors duration-200`}
          >
            <td className="py-2 px-4">{mhs.nim}</td>
            <td className="py-2 px-4">{mhs.nama}</td>

            <td className="py-2 px-4 text-center space-x-2">
              
              {/* DETAIL  */}
              <Button size="sm" onClick={() => onDetail(mhs.id)}>
                Detail
              </Button>

              {/* UPDATE */}
              {can("mahasiswa.update") && (
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => onEdit(mhs)}
                >
                  Edit
                </Button>
              )}

              {/* DELETE */}
              {can("mahasiswa.delete") && (
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(mhs.id)}
                >
                  Hapus
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableMahasiswa;