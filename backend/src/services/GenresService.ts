import { GenresModel } from '../models/GenresModel';
import { GenreSpecificItemsModel } from '../models/GenreSpecificItemsModel';
import { Genre, GenreSpecificItem, PaginationParams, PaginatedResponse, GenreCategory } from '../types';

export class GenresService {
  private genresModel: GenresModel;
  private genreSpecificItemsModel: GenreSpecificItemsModel;

  constructor() {
    this.genresModel = new GenresModel();
    this.genreSpecificItemsModel = new GenreSpecificItemsModel();
  }

  async getGenres(
    filters: { category?: GenreCategory },
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Genre>> {
    return this.genresModel.findWithPagination(filters, pagination);
  }

  async getGenreById(id: string): Promise<Genre | null> {
    return this.genresModel.findById(id);
  }

  async getGenreItems(genreId: string): Promise<GenreSpecificItem[]> {
    return this.genreSpecificItemsModel.findByGenreId(genreId);
  }
}