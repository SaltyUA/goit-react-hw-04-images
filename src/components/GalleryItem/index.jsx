import { useModalContext } from 'context';
import { GalleryImage, GalleryItemStyled } from './GalleryImage.styled';

const GalleryItem = ({ largeImageURL, webformatURL, alt, toggleModal }) => {
  const { setModalImageFn } = useModalContext();

  const handleClick = () => {
    setModalImageFn({ src: largeImageURL, alt });
    toggleModal();
  };
  return (
    <GalleryItemStyled onClick={handleClick}>
      <GalleryImage src={webformatURL} alt={alt} />
    </GalleryItemStyled>
  );
};

export default GalleryItem;
