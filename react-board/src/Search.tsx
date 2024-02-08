import React, { useState, useEffect, useRef, KeyboardEvent } from "react";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);

  // 가상의 검색 API 호출 함수
  const fetchSearchResults = (query: string) => {
    // 여기에서 실제 검색 API 호출 또는 가상의 검색 결과 생성 로직을 추가합니다.
    const results = ["Result 1", "Result 2", "Result 3"]; // 가상의 검색 결과
    setSearchResults(results);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    fetchSearchResults(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp" && selectedResultIndex > 0) {
      setSelectedResultIndex(selectedResultIndex - 1);
    } else if (
      event.key === "ArrowDown" &&
      selectedResultIndex < searchResults.length - 1
    ) {
      setSelectedResultIndex(selectedResultIndex + 1);
    } else if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    // 여기에서 실제 검색 기능 및 최근 검색어 저장 로직을 추가합니다.
    const newRecentSearches = [...recentSearches, searchTerm];
    setRecentSearches(newRecentSearches);

    // 검색 결과를 처리하는 로직을 추가하세요.
    console.log("Search Term:", searchTerm);

    // 검색 완료 후 초기화
    setSearchTerm("");
    setSearchResults([]);
    setSelectedResultIndex(-1);

    // 포커스를 검색 입력란에 다시 맞춥니다.
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleResultClick = (result: string) => {
    setSearchTerm(result);
    handleSearch();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        // 검색 결과를 닫거나 추가적인 로직을 수행할 수 있습니다.
        setSearchResults([]);
        setSelectedResultIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result, index) => (
            <li
              key={result}
              onClick={() => handleResultClick(result)}
              className={index === selectedResultIndex ? "selected" : ""}
            >
              {result}
            </li>
          ))}
        </ul>
      )}
      <div>
        <p>Recent Searches:</p>
        <ul>
          {recentSearches.map((recent, index) => (
            <li key={index} onClick={() => handleResultClick(recent)}>
              {recent}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
