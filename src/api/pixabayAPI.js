import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '38645785-6e0112a930fc9fb3ed87273a1',
  per_page: 12,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export const getImagesBySearch = async (search, page) => {
  const response = await axios({
    params: {
      q: search,
      page: page,
    },
  });
  return response.data;
};
