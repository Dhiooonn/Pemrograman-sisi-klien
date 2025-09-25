// json = isinya object atau array

// Object
const mahasiswa = {
    nama: "Dhion Nur Damanhuri",
    nim: "A11.2023.15448",
    umur: 18,
    status: true,
    hobby: ["Sleeping", "Rebahan"],
    matkul: [
        {
            matkulId: 4301,
            matkulNama: "Pemrograman sisi klien",
            sks: 3,
            nilai: 100,
        },
        {
            matkulId: 4302,
            matkulNama: "Pemrograman sisi server",
            sks: 3,
            nilai: 98,
        }
    ]
}

console.log(mahasiswa);

// ES6 - Destructuring Obj
const { nama, nim, status, hobby, matkul } = mahasiswa; // cara baru
console.log("Nama saya: " + nama + " - " + nim);

// ES6 - Destructuring Array
const [ hobi1, hobi2 ] = hobby;
console.log("Hobby sumber cuanku: " + hobi1 + " dan " + hobi2);

// ES6 - Template Literal
console.log(`Hobby sumber cuanku: ${hobi1} dan ${hobi2}`);

// ES6 - Spread Operator
const newHobby = "buzzer";
const updateHobby = [...hobby, newHobby, "roblok"]; // add to Array
console.log(`Menginfokan hobby terbaru saya adalah ${updateHobby}`);

// ES6 - Function
const jumlah = (a,b) => a + b;

console.log(`Berhitung yuk 1 + 2 = ${jumlah(1,2)}`);

// ES6 - Logical => ?:, ||
const statusMhs = status ? "Aktif" : "Non-Aktif"
console.log(`Statusku ${statusMhs}`)

const aktifMhs = mahasiswa.organisasi || "Tidak Ikut";
console.log(`Keikutsetaan organisasi: ${aktifMhs}`)

// ES6 - Array Method (Map, Filter, Reduce)
const namaMatkul = matkul.map((mn) => mn.matkulNama);
console.log(namaMatkul)

const listMhs = [
    { nim: "2025", nama: "Dhion", status: true},
    { nim: "2026", nama: "Ion", status: true},
    { nim: "2027", nama: "Damanhuri", status: false},
]

const mhsValid = listMhs.filter((m) => m.status)
console.log(mhsValid)
  
const totalSks = matkul.reduce((total, m) => total + m.sks, 0);
console.log(totalSks)