import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';
import { TiArrowSortedDown } from 'react-icons/ti';

const Comments = ({ data }) => {
  console.log(data);
  return (
    <div className="my-6">
      <h2 className="text-xl font-bold ps-2">{data?.commentsCount}</h2>
      <input
        type="text"
        className="w-full border-b bg-transparent outline-none mb-5 p-2"
        placeholder="Yorum Ekleyiniz"
      />
      {data?.data.map((i, index) => (
        <div key={index} className="flex gap-2 items-center px-1 py-4">
          <img src={i.authorThumbnail[0].url} className="rounded-full" alt="" />
          <div className="flex flex-col gap-2">
            <h5 className="flex gap-2 items-center">
              <span className="text-semibold  ">{i.authorText}</span>
              <span className="text-small text-gray-400">
                {i.publishedTimeText}
              </span>
            </h5>

            <p>{i.textDisplay}</p>

            <div className="flex items-center gap-5 cursor-pointer">
              <div className="flex gap-1 items-center hover:bg-gray-700 rounded p-2">
                <AiFillLike />
                <span>{i.likesCount}</span>
              </div>
              <div className="items-center hover:bg-gray-700 rounded p-2">
                <AiFillDislike />
              </div>

              <span className=" hover:bg-gray-700  p-1 rounded cursor-pointer">
                Yanitla
              </span>
            </div>
            {i.replyCount > 0 && (
              <div className="flex w-fit rounded items-center p-1 pe-3 gap-2 text-blue-500 hover:bg-blue-900 hover:text-white cursor-pointer ">
                <TiArrowSortedDown />
                {i.replyCount} Yanit
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
