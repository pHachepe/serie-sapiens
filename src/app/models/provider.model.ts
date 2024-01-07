export interface Provider {
  link: string;
  rent: StreamingServiceOffer[];
  buy: StreamingServiceOffer[];
  flatrate?: StreamingServiceOffer[];
  free?: StreamingServiceOffer[];
  ads?: StreamingServiceOffer[];
}

export interface StreamingServiceOffer {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}
