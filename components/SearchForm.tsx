import React from "react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { SearchIcon } from "lucide-react";

const SearchForm = ({ querry }: { querry?: string }) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        className="search-input"
        type="search"
        name="querry"
        id=""
        defaultValue={querry}
        placeholder="Search Startup "
      />
      <div className="flex gap-2">
        {querry && <SearchFormReset />}
        <button type="submit" className="search-btn text-white">
          <SearchIcon className="size-5"></SearchIcon>
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
