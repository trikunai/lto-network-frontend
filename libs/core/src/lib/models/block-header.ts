export class BlockHeader {
  static fromJSON(apiData: LTO.API.BlockHeader[]): BlockHeader[];
  static fromJSON(apiData: LTO.API.BlockHeader): BlockHeader;
  static fromJSON(apiData: LTO.API.BlockHeader | LTO.API.BlockHeader[]): BlockHeader | BlockHeader[] {
    if (Array.isArray(apiData)) {
      return apiData.map(headerData => new BlockHeader(headerData));
    }

    return new BlockHeader(apiData);
  }

  get height() {
    return this._apiData.height;
  }

  get generator() {
    return this._apiData.generator;
  }

  get blockSize() {
    return this._apiData.blocksize;
  }

  get transactionsCount() {
    return this._apiData.transactionCount;
  }

  protected constructor(protected _apiData: LTO.API.BlockHeader) {}
}
