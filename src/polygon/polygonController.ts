import { Controller, Get, Route, Path, Query } from 'tsoa';
import { PolygonService } from './polygonService';
import { PolygonResponse } from './polygon';

@Route('stocks')
export class PolygonController extends Controller {
  private service = new PolygonService();

  @Get('{ticker}/aggs')
  public async getAggs(
    @Path() ticker: string
  ): Promise<PolygonResponse> {
    return this.service.getAggs(ticker);
  }
}
