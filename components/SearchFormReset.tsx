"use client";

import { X } from "lucide-react";
import Link from "next/link";

const reset = () => {
  const form = document.querySelector(".search-form") as HTMLFormElement;
  if (form) form.reset();
};

const SearchFormReset = () => {
  return (
    <div>
      <button onClick={reset}>
        <Link href="/" className="search-btn text-white">
          <X className="size-5"></X>
        </Link>
      </button>
    </div>
  );
};

export default SearchFormReset;
