import { Button } from './LoadMoreButton.styled';

const LoadMoreButton = ({ handleLoadMore }) => {
  return <Button onClick={handleLoadMore}>Load More</Button>;
};

export default LoadMoreButton;
