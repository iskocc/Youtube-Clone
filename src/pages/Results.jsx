import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar.jsx';
import VideoCard from '../components/VideoCard.jsx';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api.js';

const Results = () => {
  const [page, setPage] = useState(1);
  const [token, setToken] = useState();
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('search_query');

  useEffect(() => {
    const params = {
      query: query,
      token: page > 1 ? token : undefined,
    };

    api.get('/search', { params }).then((res) => {
      console.log(res);
      // verilerin devamini almamizi saglayacak state
      setToken(res.data.continuation);

      setData((prev) => prev.concat(res.data.data));
    });
  }, [query, page]);
  console.log(page);
  return (
    <div className="flex gap-3">
      <SideBar />
      <div className="overflow-auto mx-auto h-[90vh]">
        <h2 className="text-xl">
          <span>{query} icin sonuclar</span>
        </h2>
        <div className="flex flex-col justify-center">
          {data.map(
            (item) =>
              item.type === 'video' && (
                <VideoCard key={item.id} video={item} isRow={true} />
              )
          )}
          <button
            onClick={() => setPage(page + 1)}
            className=" bg-zinc-600 py-2 px-5 rounded-md my-10 mx-3 hover:bg-zinc-900 transition "
          >
            Daha Fazla
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
