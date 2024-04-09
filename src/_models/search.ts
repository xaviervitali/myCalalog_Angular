export interface SearchMulti {
  page: number;
  results: SearchMultiResult[];
  total_pages: number;
  total_results: number;
}

export interface SearchMultiResult {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  name?: string;
  original_language?: string;
  original_name?: string;
  overview?: string;
  poster_path?: string;
  media_type: 'tv' | 'movie' | 'person';
  genre_ids?: number[];
  popularity: number;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  origin_country?: string[];
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
  gender?: number;
  known_for_department?: string;
  profile_path: any;
  known_for?: KnownFor[];
  error?: boolean;
}

export interface KnownFor {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  name?: string;
  original_language: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
}
