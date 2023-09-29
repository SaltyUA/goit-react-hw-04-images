import { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import { getImagesBySearch } from 'api/pixabayAPI';
import ImageGallery from './ImageGallery';
import AppStyled from './App.styled';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadMoreButton from './LoadMoreButton';

const App = () => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShowBtn, setIsShowBtn] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);

      getImagesBySearch(searchQuery, page)
        .then(data => {
          if (data.totalHits === 0) {
            toast.warning(
              `Sorry, can't find any images by this query. Try another one`
            );
            return;
          }
          const totalPages = Math.ceil(data.totalHits / 12);

          if (totalPages > page) setIsShowBtn(true);
          else {
            toast.info(`These are all images for this query`);
            setIsShowBtn(false);
          }

          const newImages = data.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          );
          setGallery(prev => [...prev, ...newImages]);
        })
        .catch(error => {
          console.log(error);
          return toast.error(`Something wrong. Try later.`);
        })
        .finally(() => setIsLoading(false));
    }
  }, [searchQuery, page]);

  const onSubmitSearch = value => {
    if (value === searchQuery) {
      toast.info(`It's allready results for this query. Try another one`);
      return;
    }
    setSearchQuery(value);
    setPage(1);
    setGallery([]);
    setIsShowBtn(false);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={onSubmitSearch} />
      {isLoading && <Loader />}
      <ImageGallery gallery={gallery} />
      {gallery.length !== 0 && isShowBtn && (
        <LoadMoreButton handleLoadMore={handleLoadMore} />
      )}
      <ToastContainer autoClose={4000} />
    </AppStyled>
  );
};

export default App;
