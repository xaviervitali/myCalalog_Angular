export interface ApiOptions {
  language?: string; // ok
  api_key?: string; // ok
  watch_region?: string; // ok
  with_watch_providers?: string; // ok
  sort_by?: string; // ok
  certification?: string;
  'certification.gte'?: string;
  'certification.lte'?: string;
  certification_country?: string;
  include_adult?: string;
  include_video?: string;
  'primary_release_date.gte'?: string;
  'primary_release_date.lte'?: string;
  region?: string;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  'vote_average.gte'?: string;
  'vote_average.lte'?: string;
  'vote_count.gte'?: string;
  'vote_count.lte'?: string;
  with_cast?: string;
  with_companies?: string;
  with_crew?: string;
  with_genres?: string;
  with_keywords?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_people?: string;
  'with_runtime.gte'?: string;
  'with_runtime.lte'?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  year?: string;
  with_watch_monetization_types?:string;
  'first_air_date.gte'?:string
  "first_air_date.lte"?:string
}
