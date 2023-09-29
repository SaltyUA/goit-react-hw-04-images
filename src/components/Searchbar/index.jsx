import { useState } from 'react';
import {
  SearchButton,
  SearchForm,
  SearchInput,
  SearchbarContainer,
} from './Searchbar.styled';
import { toast } from 'react-toastify';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target: { value } }) => setSearch(value);

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      toast.info('Please type your search query');
      return;
    }
    onSubmit(search);
    reset();
  };

  const reset = () => setSearch('');

  return (
    <SearchbarContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
        />
        <SearchButton type="submit">
          <span></span>
        </SearchButton>
      </SearchForm>
    </SearchbarContainer>
  );
};

export default Searchbar;
