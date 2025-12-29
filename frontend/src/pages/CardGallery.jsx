import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getIDCards } from "../services/IDCardServices";
import { useQuery } from "@tanstack/react-query";
import IDCard from "../components/IDCard";

const CardGallery = () => {
  const {
    data: idCards,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: getIDCards,
    queryKey: ["getIDCards"],
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    console.log("idCards", idCards);
  }, [idCards]);

  return (
    <div className="bg-gray-200 min-h-screen h-full p-4">
      <div className="bg-black/60 text-white backdrop-blur-2xl px-4 py-2 rounded-md mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ID Card Gallery</h1>
          <p>All ID cards are displayed here.</p>
        </div>
        <Link
          to={"/create"}
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-white/80 hover:scale-105 hover:font-semibold transition duration-300 ease-in-out"
        >
          Create ID Card
        </Link>
      </div>

      {isLoading && (
        <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
          Loading ID Cards...
        </div>
      )}

      {isError && (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-red-600 font-semibold">Failed to load ID Cards</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-black text-white rounded-md hover:opacity-80"
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {idCards?.cards?.map((card) => (
          <IDCard key={card?._id} cardInfo={card} />
        ))}
      </div>
    </div>
  );
};

export default CardGallery;
