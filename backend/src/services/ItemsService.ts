import { CommonItemsModel } from '../models/CommonItemsModel';
import { GenreSpecificItemsModel } from '../models/GenreSpecificItemsModel';
import { RegionSpecificItemsModel } from '../models/RegionSpecificItemsModel';
import { ComplianceItemsModel } from '../models/ComplianceItemsModel';
import { GenresModel } from '../models/GenresModel';
import { RegionsModel } from '../models/RegionsModel';
import { ComplianceRulesModel } from '../models/ComplianceRulesModel';
import {
  GenerateRequest,
  GenerateResponse,
  PaginationParams,
  PaginatedResponse,
  CommonItem,
  GenreSpecificItem,
  RegionSpecificItem,
  ComplianceItem,
  Priority,
} from '../types';

export class ItemsService {
  private commonItemsModel: CommonItemsModel;
  private genreSpecificItemsModel: GenreSpecificItemsModel;
  private regionSpecificItemsModel: RegionSpecificItemsModel;
  private complianceItemsModel: ComplianceItemsModel;
  private genresModel: GenresModel;
  private regionsModel: RegionsModel;
  private complianceRulesModel: ComplianceRulesModel;

  constructor() {
    this.commonItemsModel = new CommonItemsModel();
    this.genreSpecificItemsModel = new GenreSpecificItemsModel();
    this.regionSpecificItemsModel = new RegionSpecificItemsModel();
    this.complianceItemsModel = new ComplianceItemsModel();
    this.genresModel = new GenresModel();
    this.regionsModel = new RegionsModel();
    this.complianceRulesModel = new ComplianceRulesModel();
  }

  async generateItems(request: GenerateRequest): Promise<GenerateResponse> {
    const { genres, region, seoOptimized, includeCompliance } = request;

    // Get common items
    const commonItems = await this.commonItemsModel.findAll({
      seoOptimized,
    });

    // Get genre-specific items
    const genreSpecificItems: GenreSpecificItem[] = [];
    for (const genreName of genres) {
      const genre = await this.genresModel.findByName(genreName);
      if (genre) {
        const items = await this.genreSpecificItemsModel.findByGenreId(genre.id, {
          seoOptimized,
        });
        genreSpecificItems.push(...items);
      }
    }

    // Get region-specific items
    let regionSpecificItems: RegionSpecificItem[] = [];
    if (region) {
      const regionData = await this.regionsModel.findByName(region);
      if (regionData) {
        regionSpecificItems = await this.regionSpecificItemsModel.findByRegionId(
          regionData.id
        );
      }
    }

    // Get compliance items
    let complianceItems: ComplianceItem[] = [];
    if (includeCompliance) {
      const genreIds = await Promise.all(
        genres.map(async (genreName) => {
          const genre = await this.genresModel.findByName(genreName);
          return genre?.id;
        })
      );

      const validGenreIds = genreIds.filter(Boolean) as string[];
      complianceItems = await this.complianceItemsModel.findByGenreIds(validGenreIds);
    }

    // Calculate metadata
    const allItems = [...commonItems, ...genreSpecificItems, ...regionSpecificItems, ...complianceItems];
    const priorityDistribution = this.calculatePriorityDistribution(allItems);

    return {
      commonItems,
      genreSpecificItems,
      regionSpecificItems,
      complianceItems,
      metadata: {
        totalCount: allItems.length,
        priorityDistribution,
      },
    };
  }

  async getItems(
    filters: {
      type?: string;
      genre?: string;
      region?: string;
      priority?: Priority;
    },
    pagination: PaginationParams
  ): Promise<PaginatedResponse<any>> {
    // This would combine results from all item types based on filters
    // For now, returning common items as default
    return this.getCommonItems(filters, pagination);
  }

  async getItemById(id: string): Promise<any> {
    // Try to find in all item types
    let item = await this.commonItemsModel.findById(id);
    if (item) return { ...item, type: 'common' };

    item = await this.genreSpecificItemsModel.findById(id);
    if (item) return { ...item, type: 'genre_specific' };

    item = await this.regionSpecificItemsModel.findById(id);
    if (item) return { ...item, type: 'region_specific' };

    item = await this.complianceItemsModel.findById(id);
    if (item) return { ...item, type: 'compliance' };

    return null;
  }

  async getCommonItems(
    filters: { priority?: Priority },
    pagination: PaginationParams
  ): Promise<PaginatedResponse<CommonItem>> {
    return this.commonItemsModel.findWithPagination(filters, pagination);
  }

  async getGenreSpecificItems(
    genreId: string,
    filters: { priority?: Priority },
    pagination: PaginationParams
  ): Promise<PaginatedResponse<GenreSpecificItem>> {
    return this.genreSpecificItemsModel.findWithPagination(genreId, filters, pagination);
  }

  async getRegionSpecificItems(
    regionId: string,
    filters: { priority?: Priority },
    pagination: PaginationParams
  ): Promise<PaginatedResponse<RegionSpecificItem>> {
    return this.regionSpecificItemsModel.findWithPagination(regionId, filters, pagination);
  }

  async getComplianceItems(
    filters: { priority?: Priority },
    pagination: PaginationParams
  ): Promise<PaginatedResponse<ComplianceItem>> {
    return this.complianceItemsModel.findWithPagination(filters, pagination);
  }

  private calculatePriorityDistribution(items: any[]): Record<Priority, number> {
    return items.reduce(
      (acc, item) => {
        acc[item.priority] = (acc[item.priority] || 0) + 1;
        return acc;
      },
      { required: 0, recommended: 0, optional: 0 } as Record<Priority, number>
    );
  }
}