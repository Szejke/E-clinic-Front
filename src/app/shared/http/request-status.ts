export const HTTP_STATUS_OK = 200;
export const HTTP_STATUS_CREATED = 201;
export const HTTP_STATUS_OK_MSG = 'OK';

export const isRequestSuccess = function (data: any): boolean {
  return data != null &&
    data !== undefined &&
    data.ok &&
    (data.status === HTTP_STATUS_OK || data.status === HTTP_STATUS_CREATED) &&
    data.statusText === HTTP_STATUS_OK_MSG;
}
