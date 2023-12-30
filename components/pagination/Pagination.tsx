"use client";
import Image from "next/image";
import back from "@/public/backward.svg";
import forward from "@/public/forward.svg";

type Props = {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
};

const Pagination: React.FunctionComponent<Props> = ({
  currentPage,
  totalPages,
  paginate,
}) => {
  return (
    <>
      <div>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Image width={50} height={50} alt="backwards icon" src={back} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            style={{
              border: currentPage === i + 1 ? "5px solid green" : "",
            }}
            key={i}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          style={{ backgroundColor: "red" }}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Image width={50} height={50} alt="backwards icon" src={forward} />
        </button>
      </div>
    </>
  );
};

export default Pagination;
