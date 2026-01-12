
export enum ToolType {
  HOME = 'home',
  COMPRESS = 'compress',
  RESIZE = 'resize',
  CONVERT = 'convert',
  CROP = 'crop',
  QUALITY = 'quality',
  INCREASE_SIZE = 'increase_size'
}

export interface ProcessedImage {
  id: string;
  originalName: string;
  originalSize: number;
  newSize: number;
  url: string;
  blob: Blob;
  type: string;
  width?: number;
  height?: number;
}
