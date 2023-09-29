import React, { Component } from 'react';
import {
  SearchButton,
  SearchForm,
  SearchInput,
  SearchbarContainer,
} from './Searchbar.styled';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState(() => ({
      search: value,
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      toast.info('Please type your search query');
      return;
    }
    const { search } = this.state;
    this.props.onSubmit(search);
    this.reset();
  };

  reset = () =>
    this.setState({
      value: '',
    });

  render() {
    const { search } = this.state;

    return (
      <SearchbarContainer>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchInput
            onChange={this.handleChange}
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
  }
}

export default Searchbar;
