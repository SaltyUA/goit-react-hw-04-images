import GalleryItem from 'components/GalleryItem';
import React from 'react';
import { ImageGalleryGrid } from './ImageGallery.styled';

const ImageGallery = ({ gallery, onClickImage }) => {
  return (
    <ImageGalleryGrid>
      {gallery.map(({ id, largeImageURL, webformatURL, tags }) => {
        return (
          <GalleryItem
            key={id}
            largeImageURL={largeImageURL}
            webformatURL={webformatURL}
            onClickImage={onClickImage}
            alt={tags}
          />
        );
      })}
    </ImageGalleryGrid>
  );
};

export default ImageGallery;
