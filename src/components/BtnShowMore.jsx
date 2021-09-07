import { useState } from "react";

const BtnShowMore = ({ number }) => {
  const [showMore, setShowMore] = useState(true);
  const selectedUl = ".right-people-ul.col-no" + number;
  const iniShowMore = "right-people-show-more-text sCol-no" + number;
  const iniDownArrow = "bi bi-chevron-compact-down arrow" + number;
  const iniUpArrow = "bi bi-chevron-compact-up arrow" + number;

  const btnShowMore = () => {
    const uls = document.querySelectorAll(selectedUl + "> li:nth-child(n + 6)");

    uls.forEach((ul) => {
      showMore ? ul.classList.add("d-flex") : ul.classList.remove("d-flex");
    });

    if (showMore) {
      document.querySelector(
        `.right-people-show-more-text.sCol-no${number}`
      ).innerHTML = "Show less";
      document
        .querySelector(`.bi.bi-chevron-compact-up.arrow${number}`)
        .classList.add("d-flex");
      document
        .querySelector(`.bi.bi-chevron-compact-down.arrow${number}`)
        .classList.add("display-none");
    } else {
      document.querySelector(
        `.right-people-show-more-text.sCol-no${number}`
      ).innerHTML = "Show more";
      document
        .querySelector(`.bi.bi-chevron-compact-up.arrow${number}`)
        .classList.remove("d-flex");
      document
        .querySelector(`.bi.bi-chevron-compact-down.arrow${number}`)
        .classList.remove("display-none");
    }
  };

  return (
    <div
      className="right-people-show-more"
      onClick={() => btnShowMore(setShowMore(!showMore))}
    >
      <div className="right-people-show-more-container">
        <span className={iniShowMore}>Show more</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className={iniDownArrow}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className={iniUpArrow}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"
          />
        </svg>
      </div>
    </div>
  );
};

export default BtnShowMore;
