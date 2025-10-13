// Class Mahasiswa
class Mahasiswa {
    constructor(nim, nama, statusAktif, nilaiTugas, nilaiUTS, nilaiUAS) {
        this.nim = nim;
        this.nama = nama;
        this.statusAktif = statusAktif;
        this.nilaiTugas = nilaiTugas;
        this.nilaiUTS = nilaiUTS;
        this.nilaiUAS = nilaiUAS;
    }

    // Menampilkan data Mahasiswa
    show() {
        console.log(`NIM: ${this.nim}`)
        console.log(`Nama: ${this.nama}`)
        console.log(`Status: ${this.statusAktif}`)
        console.log(`Nilai Tugas: ${this.nilaiTugas}, UTS ${this.nilaiUTS}, UAS ${this.nilaiUAS}`)
        console.log(`Total Nilai: ${this.totalNilai()}`)
        console.log(`Kategori Nilai: ${this.kategoriNilai()}`)
        console.log(`IPS: ${this.IPS().toFixed(2)}`)
    }

    // Menambah Mahasiswa Baru
    static add(mahasiswa, mahasiswaList) {
        mahasiswaList.push(mahasiswa);
    }
    

    // Update Mahasiswa Baru berdasarkan nim
    static update(mahasiswaList, nim, dataBaru) {
    const mhs = mahasiswaList.find((m) => m.nim === nim);
    if (mhs) {
      Object.assign(mhs, dataBaru);
      console.log(`Data mahasiswa ${nim} berhasil diupdate.`);
    } else {
      console.log(`Mahasiswa dengan NIM ${nim} tidak ditemukan.`);
    }
  }

    // Menghapus Mahasiswa berdasarkan NIM
    static clear(mahasiswaList) {
        mahasiswaList.length = 0;
        console.log("Semua Data Mahasiswa telah Dihapus")
    }

    // Menghitung Total Nilai
    totalNilai() {
        return this.nilaiTugas * 0.3 + this.nilaiUTS * 0.3 + this.nilaiUAS * 0.4;
    }

    // Mengelompokkan Kategori Nilai
    kategoriNilai() {
        const total = this.totalNilai();
        if (total >= 85) return "A";
        else if (total >= 70) return "B";
        else if (total >= 55) return "C";
        else if (total >= 40) return "D";
        else return "E";
    }

    // Menghitung IPS
    IPS() {
        const grade = this.kategoriNilai();
        switch (grade) {
            case "A": return 4.0;
            case "B": return 3.0;
            case "C": return 2.0;
            case "D": return 1.0;
            default: return 0.0
        }
    }
}

// Class List Mahasiswa
class ListMahasiswa {
    constructor() {
        this.daftarMahasiswa = [];
    }

    // Menampilkan Semua Data Mahasiswa
    showAll() {
        if (this.daftarMahasiswa.length === 0) {
            console.log("Belum Ada Mahasiswa");
            return;
        }
        this.daftarMahasiswa.forEach((mhs) => mhs.show());
    }

    // Menghitung Jumlah Mahasiswa
    jumlahMahasiswa() {
        return this.daftarMahasiswa.length;
    }

    // Mengurutkan Berdasarkan NIM
    sortByNim() {
        this.daftarMahasiswa.sort((a, b) => a.nim.localeCompare(b.nim));
        console.log("Data Mahasiswa telah diurutkan berdasarkan NIM");
    }

    // Mengurutkan Berdasarkan status aktif
    sortByStatus() {
        this.daftarMahasiswa.sort((a, b) => b.statusAktif - a.statusAktif);
        console.log("Data Mahasiswa telah diurutkan berdasarkan STATUS")
    }

    // Menghitung jumlah mahasiswa aktif dan tidak aktif.
    jumlahAktifTidak() {
        const aktif = this.daftarMahasiswa.filter((m) => m.statusAktif).length;
        const tidakAktif = this.daftarMahasiswa.length - aktif;
        return { aktif, tidakAktif };
    }

    // Menghapus semua data mahasiswa dari array
    clearArray() {
        this.daftarMahasiswa.length = 0;
        console.log("Semua Data Mahasiswa dihapus dari Array")
    }
}

const list = new ListMahasiswa();

const mhs1 = new Mahasiswa("A11.2023.11111", "Dhion", true, 99, 95, 100)
const mhs2 = new Mahasiswa("A11.2023.22222", "Dio", false, 85, 100, 80)
const mhs3 = new Mahasiswa("A11.2023.12345", "Randy", true, 90, 80, 80)

mahasiswa.add(daftarMahasiswa, mhs1)
mahasiswa.add(daftarMahasiswa, mhs2)
mahasiswa.add(daftarMahasiswa, mhs3)

console.log("Semua Data Mahasiswa")
list.showAll();

console.log("Jumlah Mahasiswa: ", list.jumlahMahasiswa());
console.log("Jumlah Aktif/Tidak Aktif: ", list.jumlahAktifTidak());

list.sortByNim();
list.sortByStatus();