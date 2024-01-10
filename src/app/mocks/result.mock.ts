import { Result } from 'src/app/models/result.model';

export const mockResult: Result = {
  adult: false,
  backdrop_path: 'path/to/image',
  genre_ids: [1, 2, 3],
  id: 123,
  original_language: 'en',
  original_title: 'Original Title',
  overview: 'This is a movie overview.',
  popularity: 8.5,
  poster_path: 'path/to/poster',
  release_date: '2022-01-01',
  title: 'Movie Title',
  name: 'Movie Name',
  vote_average: 9,
  vote_count: 100,
  media_type: 'movie',
  first_air_date: '2022-01-01',
};
