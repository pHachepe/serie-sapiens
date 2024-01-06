export interface GptResponse {
  ot: string;
  ry?: string;
  mt?: MT;
  message?: string;
}

export enum MT {
  Film = 'film',
  Tv = 'tv',
  Reply = 'reply',
}
