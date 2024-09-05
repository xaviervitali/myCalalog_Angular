export interface ApiOptions {
  language?: string; // ok
  api_key?: string; // ok
  watch_region?: string; // ok
  with_watch_providers?: string; // ok
  sort_by?: string; // ok
  certification?: string;
  certification_gte?: string;
  certification_lte?: string;
  certification_country?: string;
  include_adult?: string;
  include_video?: string;
  primary_release_date_gte?: string;
  primary_release_date_lte?: string;
  region?: string;
  release_date_gte?: string;
  release_date_lte?: string;
  vote_average_gte?: string;
  vote_average_lte?: string;
  vote_count_gte?: string;
  vote_count_lte?: string;
  with_cast?: string;
  with_companies?: string;
  with_crew?: string;
  with_genres?: string;
  with_keywords?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_people?: string;
  with_runtime_gte?: string;
  with_runtime_lte?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  year?: string;
  with_watch_monetization_types?: string;
  first_air_date_gte?: string;
  first_air_date_lte?: string;
  iso_3166_1?: string;
}
