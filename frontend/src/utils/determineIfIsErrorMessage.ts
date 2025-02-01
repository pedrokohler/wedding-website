import { ErrorResponse, GiftsDto } from "../types";

export function determineIfIsErrorResponse(
  undetermined: GiftsDto | ErrorResponse
): undetermined is ErrorResponse {
  if ((undetermined as ErrorResponse)?.message) {
    return true;
  }
  return false;
}
