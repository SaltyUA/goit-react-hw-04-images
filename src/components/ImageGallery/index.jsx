import GalleryItem from 'components/GalleryItem';
import { useState } from 'react';
import { ImageGalleryGrid } from './ImageGallery.styled';
import Modal from 'components/Modal';
import Context from 'context';

const ImageGallery = ({ gallery }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModal = () => {
    setIsShowModal(prev => !prev);
  };

  return (
    <Context>
      <ImageGalleryGrid>
        {gallery.map(({ id, largeImageURL, webformatURL, tags }) => {
          return (
            <GalleryItem
              key={id}
              largeImageURL={largeImageURL}
              webformatURL={webformatURL}
              alt={tags}
              toggleModal={toggleModal}
            />
          );
        })}
      </ImageGalleryGrid>
      {isShowModal && <Modal toggleModal={toggleModal} />}{' '}
    </Context>
  );
};

export default ImageGallery;
