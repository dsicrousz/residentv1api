import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnneeParametreService } from './annee_parametre.service';
import { CreateAnneeParametreDto } from './dto/create-annee_parametre.dto';
import { UpdateAnneeParametreDto } from './dto/update-annee_parametre.dto';

@Controller('annee-parametre')
export class AnneeParametreController {
  constructor(private readonly anneeParametreService: AnneeParametreService) {}

  @Post()
  create(@Body() createAnneeParametreDto: CreateAnneeParametreDto) {
    return this.anneeParametreService.create(createAnneeParametreDto);
  }


  @Get('byanneeUniversitaireId/:id')
  findOne(@Param('id') id: string) {
    return this.anneeParametreService.findOneByAnneeUniversitaireId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnneeParametreDto: UpdateAnneeParametreDto) {
    return this.anneeParametreService.update(id, updateAnneeParametreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anneeParametreService.remove(id);
  }
}
