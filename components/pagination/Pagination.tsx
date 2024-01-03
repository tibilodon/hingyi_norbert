"use client";
import styles from "./pagination.module.css";

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
          className={currentPage === 1 ? styles.disabled : styles.btnPagi}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Vissza
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            className={
              currentPage === i + 1
                ? `${styles.btnPage} ${styles.active}`
                : styles.btnPage
            }
            key={i}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className={
            currentPage === totalPages ? styles.disabled : styles.btnPagi
          }
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Tovább
        </button>
      </div>
    </>
  );
};

export default Pagination;
