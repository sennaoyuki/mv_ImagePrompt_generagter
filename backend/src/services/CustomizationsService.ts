import { UserCustomizationsModel } from '../models/UserCustomizationsModel';
import { SaveCustomizationRequest, UserCustomization, PaginationParams, PaginatedResponse } from '../types';

export class CustomizationsService {
  private userCustomizationsModel: UserCustomizationsModel;

  constructor() {
    this.userCustomizationsModel = new UserCustomizationsModel();
  }

  async saveCustomization(request: SaveCustomizationRequest): Promise<UserCustomization> {
    return this.userCustomizationsModel.create(request);
  }

  async getCustomizations(
    userId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<UserCustomization>> {
    return this.userCustomizationsModel.findByUserId(userId, pagination);
  }

  async getCustomizationById(id: string): Promise<UserCustomization | null> {
    return this.userCustomizationsModel.findById(id);
  }

  async updateCustomization(
    id: string,
    request: SaveCustomizationRequest
  ): Promise<UserCustomization | null> {
    return this.userCustomizationsModel.update(id, request);
  }

  async deleteCustomization(id: string): Promise<boolean> {
    return this.userCustomizationsModel.delete(id);
  }
}