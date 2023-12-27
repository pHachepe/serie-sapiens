export interface ApiResult {
  page: number;
  results: any[];
  total_results: number;
  total_pages: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  first_air_date: string;
  title: string;
  name: string;
  vote_average: number;
  vote_count: number;

  media_type?: string;
}

/*
{
"belongs_to_collection": null,
"budget": 0,
"homepage": "",
"imdb_id": null,
"production_companies": [],
"production_countries": [],
"revenue": 0,
"runtime": 0,
"spoken_languages": [],
"status": "In Production",
"tagline": ""
}
*/