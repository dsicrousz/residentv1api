import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayementService } from './payement.service';
import { CreatePayementDto } from './dto/create-payement.dto';
import { UpdatePayementDto } from './dto/update-payement.dto';

@Controller('payement')
export class PayementController {
  constructor(private readonly payementService: PayementService) {}

  @Post()
  create(@Body() createPayementDto: CreatePayementDto) {
    return this.payementService.create(createPayementDto);
  }

  @Get('anneeUniversitaire/:id')
  findAllByAnneeUniversitaire(@Param('id') id: string) {
    return this.payementService.findAllByAnneeUniversitaire(id);
  }

  @Get('dossier/:id')
  findByDossier(@Param('id') id: string) {
    return this.payementService.findByDossier(id);
  }


   @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payementService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayementDto: UpdatePayementDto) {
    return this.payementService.update(id, updatePayementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payementService.remove(id);
  }
}
