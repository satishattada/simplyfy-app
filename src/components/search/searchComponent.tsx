import React, { useState } from "react";
import "./styles.css";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch, FaTimes } from "react-icons/fa";
interface SearchBoxProps {
  onSearch: (query: string) => void; // Function type for the onSearch prop
}
const SearchComponent: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchField = (e: any) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery(""); // Clears the input field
    if (onSearch) {
      onSearch("");
    }
  };
  return (
    <>
        <div className="search-box">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchField}
            />

            {searchQuery ? (
              <Button
                variant="outline-secondary"
                onClick={handleClearSearch}
                className="input-clear-btn btn-outline"
              >
                <FaTimes />
              </Button>
            ) : (
              <Button
                variant="outline-secondary"
                className="btn-outline"
                onClick={handleSearchField}
              >
                <FaSearch />
              </Button>
            )}
          </InputGroup>
        </div>
    </>
  );
};

export default SearchComponent;
