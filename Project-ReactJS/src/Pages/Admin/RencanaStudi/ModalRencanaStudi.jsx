import Form from "@/Pages/Admin/Components/Form";
import Label from "@/Pages/Admin/Components/Label";
import Button from "@/Pages/Admin/Components/Button";

const ModalRencanaStudi = ({
  isOpen,
  onClose,
  onSubmit,
  onChange,
  form,
  dosen,
  mataKuliah,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            Tambah Kelas Baru
          </h2>
          <button
            onClick={onClose}
            className="text-xl text-gray-600 hover:text-red-500"
          >
            &times;
          </button>
        </div>

        <Form onSubmit={onSubmit} className="p-4 space-y-4">
          <div>
            <Label>Mata Kuliah</Label>
            <select
              name="mata_kuliah_id"
              value={form.mata_kuliah_id}
              onChange={onChange}
              className="w-full border rounded px-2 py-1"
              required
            >
              <option value="">-- Pilih --</option>
              {mataKuliah.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Dosen Pengampu</Label>
            <select
              name="dosen_id"
              value={form.dosen_id}
              onChange={onChange}
              className="w-full border rounded px-2 py-1"
              required
            >
              <option value="">-- Pilih --</option>
              {dosen.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ModalRencanaStudi;
