// 1. 1 FIle jsx itu punya 1 function utama
// 1. 1 function utama dinyatakan dengan default
// 1. 1 function harus return 1 tag, tidak boleh lebih

function Home (){
    return <div>
            <Judul />
            <Isi />
        </div>
}

function Judul (){
    return <h1 className="text-3xl font-bold underline">Berita heboh</h1>
}


function Isi (){
    return <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex fugiat praesentium accusamus quibusdam! Reiciendis error consequuntur autem nihil, rerum ab necessitatibus incidunt. Tempora magnam nulla distinctio quos eos pariatur magni?</p>
}

export default Home;