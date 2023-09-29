import { SearchLoader } from './Loader.styled';
import { MagnifyingGlass } from 'react-loader-spinner';

const Loader = () => {
  return (
    <SearchLoader>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="transparent"
        color="#000"
      />
    </SearchLoader>
  );
};

export default Loader;
