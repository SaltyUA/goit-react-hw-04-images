import { GalleryImage, GalleryItemStyled } from './GalleryImage.styled';

const GalleryItem = ({ largeImageURL, webformatURL, onClickImage, alt }) => {
  const onClickItem = () => {
    onClickImage({ src: largeImageURL, alt: alt });
  };

  return (
    <GalleryItemStyled onClick={onClickItem}>
      <GalleryImage src={webformatURL} alt={alt} />
    </GalleryItemStyled>
  );
};

export default GalleryItem;
