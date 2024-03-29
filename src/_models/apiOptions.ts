export interface ApiOptions {
  language?: string; // ok
  api_key: string; // ok
  watch_region?: string; // ok
  with_watch_providers?: string; // ok
  sort_by?: string; // ok
  certification?: string;
  'certification.gte'?: string;
  'certification.lte'?: string;
  certification_country?: string;
  include_adult?: boolean;
  include_video?: boolean;
  'primary_release_date.gte'?: Date;
  'primary_release_date.lte'?: Date;
  region?: string;
  'release_date.gte'?: Date;
  'release_date.lte'?: Date;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;
  with_cast?: string;
  with_companies?: string;
  with_crew?: string;
  with_genres?: string;
  with_keywords?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_people?: string;
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  year?: number;
  [key: string]: string | number | boolean | Date | undefined;
}
