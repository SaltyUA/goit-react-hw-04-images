import { useCallback, useEffect } from 'react';
import { Overlay, Popup } from './Modal.style';
import { useModalContext } from 'context';

const Modal = ({ toggleModal }) => {
  const {
    modalImage: { src, alt },
  } = useModalContext();

  const handlePressEsc = useCallback(
    e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    },
    [toggleModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', handlePressEsc);
  }, [handlePressEsc]);

  useEffect(() => {
    return () => {
      document.removeEventListener('keydown', handlePressEsc);
    };
  }, [handlePressEsc]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <Popup>
        <img src={src} alt={alt} />
      </Popup>
    </Overlay>
  );
};

export default Modal;
