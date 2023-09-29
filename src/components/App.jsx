import { Component } from 'react';
import Searchbar from './Searchbar';
import { getImagesBySearch } from 'api/pixabayAPI';
import ImageGallery from './ImageGallery';
import AppStyled from './App.styled';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal';
import LoadMoreButton from './LoadMoreButton';

export class App extends Component {
  state = {
    gallery: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    isShowBtn: false,
    modalImage: '',
  };
  componentDidUpdate(_, prevState) {
    const { searchQuery, currentPage } = this.state;
    if (
      searchQuery !== prevState.searchQuery ||
      currentPage !== prevState.currentPage
    ) {
      this.setState({ isLoading: true });

      getImagesBySearch(searchQuery, currentPage)
        .then(response => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }
          return response.data;
        })
        .then(data => {
          if (data.totalHits === 0) {
            toast.warning(
              `Sorry, can't find any images by this query. Try another one`
            );
            return;
          }
          const totalPages = Math.ceil(data.totalHits / 12);

          if (totalPages > currentPage) this.setState({ isShowBtn: true });
          else {
            toast.info(`These are all images for this query`);
            this.setState({ isShowBtn: false });
          }

          const newImages = data.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          );

          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...newImages],
          }));
        })
        .catch(error => {
          console.log(error);
          return toast.error(`Something wrong. Try later.`);
        })
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
    }
  }
  searchImages = request => {
    const { searchQuery, currentPage } = this.state;

    if (searchQuery === request) {
      this.setState(() => ({
        error: `It allready showing results for this query`,
      }));
    }

    this.setState(() => ({
      isLoading: true,
      gallery: [],
    }));

    getImagesBySearch(request, currentPage)
      .then(response => {
        const { totalHits, hits } = response;

        if (totalHits === 0) {
          this.setState(() => ({ error: 'There are no hits to this query' }));
          return;
        }
        const totalPages = Math.ceil(totalHits / 12);
        console.log(totalPages);
        this.setState(prev => ({
          gallery: [...prev.gallery, ...hits],
          searchQuery: request,
          currentPage: 1,
          totalPages: totalPages,
          isShowBtn: totalPages > 1 ? true : false,
          error: null,
        }));
      })
      .catch(error => console.log(error))
      .finally(() => this.setState(() => ({ isLoading: false })));
  };

  onSubmitSearch = value => {
    if (value === this.state.searchQuery) {
      toast.info(`It's allready results for this query. Try another one`);
      return;
    }
    this.setState({
      searchQuery: value,
      currentPage: 1,
      gallery: [],
      isShowBtn: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prev => ({
      currentPage: prev.currentPage + 1,
    }));
  };

  toggleModal = (modalImage = null) => {
    this.setState({ modalImage });
  };

  render() {
    const { gallery, isLoading, isShowBtn, modalImage } = this.state;
    const { onSubmitSearch, toggleModal, handleLoadMore } = this;
    return (
      <AppStyled>
        <Searchbar onSubmit={onSubmitSearch} />
        {isLoading && <Loader />}
        <ImageGallery gallery={gallery} onClickImage={toggleModal} />
        {gallery.length !== 0 && isShowBtn && (
          <LoadMoreButton handleLoadMore={handleLoadMore} />
        )}
        {modalImage && <Modal modalImage={modalImage} onClose={toggleModal} />}
        <ToastContainer autoClose={4000} />
      </AppStyled>
    );
  }
}
