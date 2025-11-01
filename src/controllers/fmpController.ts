import { Controller, Get, Route, Path, Tags } from 'tsoa';
import { FMPService } from '../services/fmpService';
import { CompanyProfile } from '../types/fmp';

@Route('stocks')
@Tags('Stocks')
export class FMPController extends Controller {
  private service = new FMPService();

  @Get('{symbol}/profile')
  public async getProfile(@Path() symbol: string): Promise<CompanyProfile> {
    return this.service.getProfile(symbol);
  }
}
