import Form from "@/Pages/Admin/Components/Form";
import Input from "@/Pages/Admin/Components/Input";
import Label from "@/Pages/Admin/Components/Label";
import Button from "@/Pages/Admin/Components/Button";

const ModalMahasiswa = ({
  isOpen,
  isEdit,
  form,
  onChange,
  onClose,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transition-all duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <Form
          onSubmit={(e) => {
            e.preventDefault(); 
            onSubmit(); // panggil function update/tambah
          }}
          className="px-6 py-5 space-y-4"
        >
          
          {/* Input NIM */}
          <div>
            <Label htmlFor="nim" className="text-sm font-medium text-gray-700">
              NIM
            </Label>
            <Input
              type="text"
              name="nim"
              value={form.nim}
              onChange={onChange}
              readOnly={isEdit}
              placeholder="Masukkan NIM"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Input Nama */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nama
            </Label>
            <Input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Masukkan Nama"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <Label htmlFor="nama"> Max SKS </Label>
              <Input
                type="number"
                name="max_sks"
                value={form.max_sks}
                onChange={onChange}
                placeholder="Masukkan Max SKS"
                required
              />
          </div>

          {/* Buttons */}
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
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Simpan
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ModalMahasiswa;