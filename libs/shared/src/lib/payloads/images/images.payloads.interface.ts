import { ErrorPayload, Result } from '@proyecto-integrado/shared';

export type ImageUploadResponse = Result<
  ImageUploadSuccessfulResponse,
  ErrorPayload
>;

export interface ImageUploadSuccessfulResponse {
  url: string;
}

export interface ImageInput {
  userId: string;
  mimeType: string;
  size: number;
  buffer: Buffer;
}
