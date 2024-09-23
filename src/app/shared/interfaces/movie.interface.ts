export interface Movie {
  title: string;
  year: string;
  image?: string;
  id: string;
}

export interface MovieDetails extends Movie {
  rated: string;
  releaseDate?: Date;
  runtime: string;
  genres: string[];
  directors: string[];
  writers: string[];
  actors: string[];
  plot: string;
  languages: string[];
  rating: number;
  votes: number;
}