import React, { useState } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <input
      type="text"
      className={css.input}
      placeholder="Search notes"
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default SearchBox;
