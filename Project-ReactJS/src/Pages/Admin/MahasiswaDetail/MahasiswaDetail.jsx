import { useParams } from "react-router-dom";

function MahasiswaDetail(){
    const { nim } = useParams();

    return <p>Mahasiswa dengan nim: {nim}</p>
}

export default MahasiswaDetail;