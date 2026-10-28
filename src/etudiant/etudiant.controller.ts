import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { CheckAbility } from 'src/casl/policy.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CaslGuard } from 'src/casl/casl.guard';
import { Action } from 'src/casl/casl-ability.factory';
import { Etudiant } from './entities/etudiant.entity';

@Controller('etudiant')
export class EtudiantController {
  constructor(private readonly etudiantService: EtudiantService) {}

  @Get()
  @CheckAbility({ action: Action.Read, subject: Etudiant })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findAll() {
    return this.etudiantService.findAll();
  }
  
  @Get('count')
  count() {
    return this.etudiantService.count();
  }

  @Get('inscription/:id')
  @CheckAbility({ action: Action.Read, subject: Etudiant })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findOneInscription(@Param('id') id: string) {
    return this.etudiantService.findInscription(id);
  }

  @Get(':id')
  @CheckAbility({ action: Action.Read, subject: Etudiant })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findOne(@Param('id') id: string) {
    return this.etudiantService.findOne(id);
  }

  @Get('ncs/:ncs')
  @CheckAbility({ action: Action.Read, subject: Etudiant })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findOneByNce(@Param('ncs') ncs: string) {
    return this.etudiantService.findOneByNce(ncs);
  }

  
}
