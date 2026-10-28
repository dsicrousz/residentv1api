import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LitService } from './lit.service';
import { CreateLitDto } from './dto/create-lit.dto';
import { UpdateLitDto } from './dto/update-lit.dto';

@Controller('lit')
export class LitController {
  constructor(private readonly litService: LitService) {}

  @Post()
  create(@Body() createLitDto: CreateLitDto) {
    return this.litService.create(createLitDto);
  }

  @Get()
  findAll() {
    return this.litService.findAll();
  }

  @Get('annee-universitaire/:anneeUniversitaireId')
  findAllByAnneeUniversitaire(@Param('anneeUniversitaireId') anneeUniversitaireId: string) {
    return this.litService.findAllByAnneeUniversitaire(anneeUniversitaireId);
  }

  @Get('by_chambre/:id')
  findAllByChambre(@Param('id') id: string) {
    return this.litService.findAllByChambre(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.litService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLitDto: UpdateLitDto) {
    return this.litService.update(id, updateLitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.litService.remove(id);
  }
}
