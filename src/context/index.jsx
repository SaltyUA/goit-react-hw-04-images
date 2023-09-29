import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

const Context = ({ children }) => {
  const [modalImage, setModalImage] = useState({});
  const setModalImageFn = modalImage => {
    setModalImage(modalImage);
  };

  return (
    <ModalContext.Provider value={{ modalImage, setModalImageFn }}>
      {children}
    </ModalContext.Provider>
  );
};

export default Context;
