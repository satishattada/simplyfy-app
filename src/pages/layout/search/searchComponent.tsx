import React, { useState } from "react";
import "./styles.css";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch, FaTimes } from "react-icons/fa";
interface SearchBoxProps {
  onSearch: (query: string) => void; // Function type for the onSearch prop
}
const SearchComponent: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: any) => {
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
      <div className="row mt-5 mb-4">
        <div className="col-md-5">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
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
                onClick={handleSearchChange}
              >
                <FaSearch />
              </Button>
            )}
          </InputGroup>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
