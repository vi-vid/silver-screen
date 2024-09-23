import { Movie } from "../../interfaces/movie.interface";

export interface SearchFormVM {
    isLoading: boolean;
    hasError: boolean;
    items: Movie[];
  }