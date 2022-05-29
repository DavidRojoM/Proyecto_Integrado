import { ErrorPayload, Result } from '@proyecto-integrado/shared';

export type ImageUploadResponse = Result<
  ImageUploadSuccessfulResponse,
  ErrorPayload
>;

export interface ImageUploadSuccessfulResponse {
  url: string;
}

export interface ImageInput {
  mimeType: string;
  size: number;
  buffer: Buffer;
}
