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
        <p>제가 생각한 것과는 다름 검색결과를 활용하는 방식을 알아야할듯</p>
        <h1>설날</h1>
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

/*
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Title from '../components/Title'

const wholeTextArray = [
  'apple',
  'banana',
  'coding',
  'javascript',
  '원티드',
  '프리온보딩',
  '프론트엔드',
]

const AutoComplete = () => {
  const [inputValue, setInputValue] = useState('')
  const [isHaveInputValue, setIsHaveInputValue] = useState(false)
  const [dropDownList, setDropDownList] = useState(wholeTextArray)
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1)

  const showDropDownList = () => {
    if (inputValue === '') {
      setIsHaveInputValue(false)
      setDropDownList([])
    } else {
      const choosenTextList = wholeTextArray.filter(textItem =>
        textItem.includes(inputValue)
      )
      setDropDownList(choosenTextList)
    }
  }

  const changeInputValue = event => {
    setInputValue(event.target.value)
    setIsHaveInputValue(true)
  }

  const clickDropDownItem = clickedItem => {
    setInputValue(clickedItem)
    setIsHaveInputValue(false)
  }

  const handleDropDownKey = event => {
    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (
        event.key === 'ArrowDown' &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1)
      }

      if (event.key === 'ArrowUp' && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1)
      if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex])
        setDropDownItemIndex(-1)
      }
    }
  }

  useEffect(showDropDownList, [inputValue])

  return (
    <WholeBox>
      <Title text='AutoComplete' />
      <InputBox isHaveInputValue={isHaveInputValue}>
        <Input
          type='text'
          value={inputValue}
          onChange={changeInputValue}
          onKeyUp={handleDropDownKey}
        />
        <DeleteButton onClick={() => setInputValue('')}>&times;</DeleteButton>
      </InputBox>
      {isHaveInputValue && (
        <DropDownBox>
          {dropDownList.length === 0 && (
            <DropDownItem>해당하는 단어가 없습니다</DropDownItem>
          )}
          {dropDownList.map((dropDownItem, dropDownIndex) => {
            return (
              <DropDownItem
                key={dropDownIndex}
                onClick={() => clickDropDownItem(dropDownItem)}
                onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                className={
                  dropDownItemIndex === dropDownIndex ? 'selected' : ''
                }
              >
                {dropDownItem}
              </DropDownItem>
            )
          })}
        </DropDownBox>
      )}
    </WholeBox>
  )
}

const activeBorderRadius = '16px 16px 0 0'
const inactiveBorderRadius = '16px 16px 16px 16px'

const WholeBox = styled.div`
  padding: 10px;
`

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: ${props =>
    props.isHaveInputValue ? activeBorderRadius : inactiveBorderRadius};
  z-index: 3;

  &:focus-within {
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  }
`

const Input = styled.input`
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`

const DeleteButton = styled.div`
  cursor: pointer;
`

const DropDownBox = styled.ul`
  display: block;
  margin: 0 auto;
  padding: 8px 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
`

const DropDownItem = styled.li`
  padding: 0 16px;

  &.selected {
    background-color: lightgray;
  }
`

export default AutoComplete
*/
