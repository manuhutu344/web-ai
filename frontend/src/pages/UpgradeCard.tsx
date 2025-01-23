import {Link} from "react-router-dom"

function UpgradeCard() {
  return (
    <div className="bg-red-100 border-red-500 text-red-700 p-44 rounded-lg mb-4">
        <p className="font-bold">
        Anda telah menyelesaikan semua kredit Anda
        </p>
        <p >
        Harap tingkatkan untuk terus menggunakan fitur ini
        </p>
        <Link to={"/"} className="text-red-500 font-bold hover:underline">
        Tingkatkan sekarang
        </Link>
    </div>
  )
}

export default UpgradeCard