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
    mataKuliah
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-balck/40 backdrop-black-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transition-all duration-300">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Tambah Kelas Baru</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors duration-200 text-2xl leading-none">
            &times;
          </button>
        </div>

        {/* Form */}
        <Form onSubmit={(e) => {
          e.prevenDefault();
          onSubmit(e);
        }} 
        className="px-6 py-6 space-y-4"
        >
          {/* Mata Kuliah */}
          <div>
            <Label 
              htmlFor="mata_kuliah_id"
              className="text-sm font-medium text-gray-700"
            >
                Mata Kuliah
            </Label>
            <select
              name="mata_kuliah_id"
              value={form.mata_kuliah_id}
              onChange={onChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

          {/* Dosen Pengampu */}
          <div>
            <Label 
              htmlFor="dosen_id"
              className="text-sm font-medium text-gray-700"
            >
                Dosen Pengampu
            </Label>
            <select
              name="dosen_id"
              value={form.dosen_id}
              onChange={onChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">-- Pilih --</option>
              {dosen.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Buttons*/}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 bg-gray-400 hover:bg-gray-500 transition-colors"
            >
              Batal
            </Button>
            <Button 
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transitions-colors"
            >
              Simpan
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ModalRencanaStudi;