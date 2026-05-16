export interface VehicleListDto {
  id: number;
  modelId: number;
  modelName?: string;
  brandName?: string;
  brandId: number;
  status?: string;
  ilanda?: boolean;
  yil?: string;
  km?: string;
  yakitTuru?: string;
  imageUrl?:string;
}
