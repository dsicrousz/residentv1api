import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { AnneeUniversitaireService } from './annee_universitaire.service';
import { CreateAnneeUniversitaireDto } from './dto/create-annee_universitaire.dto';
import { UpdateAnneeUniversitaireDto } from './dto/update-annee_universitaire.dto';
import { CheckAbility } from 'src/casl/policy.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CaslGuard } from 'src/casl/casl.guard';
import { Action } from 'src/casl/casl-ability.factory';
import { UseGuards } from '@nestjs/common';
import { AnneeUniversitaire } from './entities/annee_universitaire.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('annee-universitaire')
export class AnneeUniversitaireController {
  constructor(private readonly anneeUniversitaireService: AnneeUniversitaireService) {}

  @Post()
  @CheckAbility({ action: Action.Create, subject: AnneeUniversitaire })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  create(@Body() createAnneeUniversitaireDto: CreateAnneeUniversitaireDto) {
    return this.anneeUniversitaireService.create(createAnneeUniversitaireDto);
  }

  @Post('import')
  @CheckAbility({ action: Action.Create, subject: AnneeUniversitaire })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  import(@Body() importDto: {anneeFrom:string,anneeTo:string}) {
    return this.anneeUniversitaireService.import(importDto);
  }

  @Get()
  @CheckAbility({ action: Action.Read, subject: AnneeUniversitaire })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findAll() {
    return this.anneeUniversitaireService.findAll();
  }

  @Get('results/:id')
  @CheckAbility({ action: Action.Read, subject: AnneeUniversitaire })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findResults(@Param('id') id: string) {
    return this.anneeUniversitaireService.findResults(id);
  }

  @Get('active')
  @CheckAbility({ action: Action.Read, subject: AnneeUniversitaire })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findOneActive() {
    return this.anneeUniversitaireService.findOneActive();
  }

  @Get(':id')
  @CheckAbility({ action: Action.Read, subject: AnneeUniversitaire })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findOne(@Param('id') id: string) {
    return this.anneeUniversitaireService.findOne(id);
  }


  @Patch(':id') 
  @CheckAbility({ action: Action.Update, subject: AnneeUniversitaire })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  update(@Param('id') id: string, @Body() updateAnneeUniversitaireDto: UpdateAnneeUniversitaireDto) {
    return this.anneeUniversitaireService.update(id, updateAnneeUniversitaireDto);
  }

  @Delete(':id')
  @CheckAbility({ action: Action.Delete, subject: AnneeUniversitaire })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  remove(@Param('id') id: string) {
    return this.anneeUniversitaireService.remove(id);
  }
  
  @Get('statistiques/:id')
  @CheckAbility({ action: Action.Read, subject: AnneeUniversitaire })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  getStatistiquesByAnnee(@Param('id') id: string) {
    return this.anneeUniversitaireService.getStatistiques(id);
  }
}
