const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzU1NThiZWJiMjIyNzc2MDVjNjU5YmEwZmI3NTAzYiIsIm5iZiI6MTcyMjUwMzM0NC43NTM4MDcsInN1YiI6IjY2YTM4ZGQwNjZiMzMyYzczMTE2NDQzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TpcB6N19D4soTsNVtiSRplf0NSTFmERV9aiASdFiv08',
  },
};

export const getApiData = async (page, query) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
    options
  );

  return response.json();
};

export const getApijanary = async () => {
  const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);

  return response.json();
};
