import { RegionsModel } from '../models/RegionsModel';
import { RegionSpecificItemsModel } from '../models/RegionSpecificItemsModel';
import { Region, RegionSpecificItem, PaginationParams, PaginatedResponse } from '../types';

export class RegionsService {
  private regionsModel: RegionsModel;
  private regionSpecificItemsModel: RegionSpecificItemsModel;

  constructor() {
    this.regionsModel = new RegionsModel();
    this.regionSpecificItemsModel = new RegionSpecificItemsModel();
  }

  async getRegions(
    filters: { prefecture?: string },
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Region>> {
    return this.regionsModel.findWithPagination(filters, pagination);
  }

  async getRegionById(id: string): Promise<Region | null> {
    return this.regionsModel.findById(id);
  }

  async getRegionItems(regionId: string): Promise<RegionSpecificItem[]> {
    return this.regionSpecificItemsModel.findByRegionId(regionId);
  }
}