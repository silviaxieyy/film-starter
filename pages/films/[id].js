import { useRouter } from "next/router";
import FilmDetail from "@/components/FilmDetail";

const FilmDetailPage = () => {
  const router = useRouter ();
  const { id } = router.query;

  return (
    <div>
      {id && <FilmDetail id={id} />}
    </div> 

  )
}

export default FilmDetailPage;