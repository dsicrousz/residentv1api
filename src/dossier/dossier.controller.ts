import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DossierService } from './dossier.service';
import { CreateDossierDto } from './dto/create-dossier.dto';
import { UpdateDossierDto } from './dto/update-dossier.dto';
import { Action } from 'src/casl/casl-ability.factory';
import { Dossier } from './entities/dossier.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CaslGuard } from 'src/casl/casl.guard';
import { CheckAbility } from 'src/casl/policy.decorator';
@Controller('dossier')
export class DossierController {
  constructor(private readonly dossierService: DossierService) {}

  @Post()
  @CheckAbility({ action: Action.Create, subject: Dossier })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  create(@Body() createDossierDto: CreateDossierDto) {
    return this.dossierService.create(createDossierDto);
  }

  @Get()
  @CheckAbility({ action: Action.Read, subject: Dossier })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findAll() {
    return this.dossierService.findAll();
  }

  @Get('byEtudiant/:id')
  @CheckAbility({ action: Action.Read, subject: Dossier })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findAllByEtudiant(@Param('id') id: string) {
    return this.dossierService.findAllByEtudiant(id);
  }

  @Get('byChambre/:id')
  @CheckAbility({ action: Action.Read, subject: Dossier })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findAllByChambre(@Param('id') id: string) {
    return this.dossierService.findAllByChambre(id);
  }

  @Get('byAnneeUniversitaire/:id')
  @CheckAbility({ action: Action.Read, subject: Dossier })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findAllByAnneeUniversitaire(@Param('id') id: string) {
    return this.dossierService.findAllByAnneeUniversitaire(id);
  }

  @Get(':id')
  @CheckAbility({ action: Action.Read, subject: Dossier })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findOne(@Param('id') id: string) {
    return this.dossierService.findOne(id);
  }

  @Patch(':id')
  @CheckAbility({ action: Action.Update, subject: Dossier })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  update(@Param('id') id: string, @Body() updateDossierDto: UpdateDossierDto) {
    return this.dossierService.update(id, updateDossierDto);
  }

  @Delete(':id')
  @CheckAbility({ action: Action.Delete, subject: Dossier })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  remove(@Param('id') id: string) {
    return this.dossierService.remove(id);
  }
}
