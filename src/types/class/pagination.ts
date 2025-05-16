export class Pagination {
  page: number;
  limit: number;
  total: number;
  constructor(page?: number, limit?: number, total?: number) {
      this.page = page || 1;
      this.limit = limit || 10;
      this.total = total || 0;
  }
}
