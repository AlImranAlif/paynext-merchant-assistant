import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(@Query('status') status?: string) {
    return this.transactionsService.findAll(status);
  }

  @Get('summary')
  getSummary() {
    return this.transactionsService.getSummary();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id/settle')
  settle(@Param('id') id: string) {
    return this.transactionsService.settle(id);
  }
}
