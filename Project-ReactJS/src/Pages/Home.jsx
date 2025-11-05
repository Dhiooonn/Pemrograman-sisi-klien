// React itu bungkus HTML ke dalam javascript
// 1 file jsx itu punya 1 function utama
// 1 function utama dinyatakan dengan default
// 1 function harus return 1 tag, tidak boleh lebih

function Home (){
    return  <>
        <Judul />
        <Isi />
        <Footer
            nama = "wantor"
        />
    </>
}

function Judul(){
    return <h1>Berita heboh</h1>;
}

function Isi(){
    return <p>Semarang, hari ini telah lahir banyak programmer frontend jago dari kelas D2I</p>
}

function Footer( {nama} ){
    return <p>Penulis: {nama}</p>
}

export default Home;