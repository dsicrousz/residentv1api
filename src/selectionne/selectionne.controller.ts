import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SelectionneService } from './selectionne.service';
import { CreateSelectionneDto, TYPECODIF } from './dto/create-selectionne.dto';
import { InscriptionService } from 'src/inscription/inscription.service';
import { differenceBy } from 'lodash';
import { AnneeParametreService } from 'src/annee_parametre/annee_parametre.service';
import { DossierService } from 'src/dossier/dossier.service';
import { HttpException } from '@nestjs/common';
import { FormationService } from 'src/formation/formation.service';

@Controller('selectionne')
export class SelectionneController {
  constructor(private readonly selectionneService: SelectionneService,
     private inscriptionService: InscriptionService,
     private anneeParamsService: AnneeParametreService,
     private formationService: FormationService,
     private dossierService: DossierService) {}

  @Post()
  async create(@Body() createSelectionneDto: CreateSelectionneDto) {
    return await this.selectionneService.create(createSelectionneDto);
  }

  @Get('bydepartement/:departement')
  findByDepartement(@Param('departement') departement: string) {
    return this.selectionneService.findByDepartement(departement);
  }
  
  @Get('bysessionandformation/:anneeUniversitaire/:formation')
  async findByTypeAndFormation(@Param('anneeUniversitaire') anneeUniversitaire: string, @Param('formation') formation: string,) {
    const anneeParams = await this.anneeParamsService.findOneByAnneeUniversitaireId(anneeUniversitaire);
    const selectionnees = await this.selectionneService.findByTypeAndFormation(anneeUniversitaire, formation,TYPECODIF.PEDAGOGIQUE);
    const inscrits = await this.inscriptionService.findBySessionAndFormation(anneeParams.pedagogique_session, formation);
    const selt = differenceBy(inscrits,selectionnees,(a:any)=>{
      return selectionnees.some((s:any)=>s.inscription._id.toString() == a._id.toString());
    });
    const diff = differenceBy(inscrits,selt,'_id');
    return {selectionnees,diff};
  }

  @Get('pedagogique/bysession/:anneeUniversitaire')
  async findPedagogiqueBySession(@Param('anneeUniversitaire') anneeUniversitaire: string) {
        const formations = await this.formationService.findAll();
    const selectionnees = await this.selectionneService.findBySession(anneeUniversitaire,TYPECODIF.PEDAGOGIQUE);
    const filteredFormations = [];
    formations.forEach((formation:any)=>{
      if(selectionnees.some((selectionne:any)=>selectionne.formation.toString() === formation._id.toString())){
        filteredFormations.push(formation);
      }
    })
    return {formations:filteredFormations,selectionnees};
  }

  @Get('sociale/bysession/:anneeUniversitaire')
  async findSocialBySession(@Param('anneeUniversitaire') anneeUniversitaire: string) {
    const formations = await this.formationService.findAll();
    const selectionnees = await this.selectionneService.findBySession(anneeUniversitaire,TYPECODIF.SOCIALE);
    const filteredFormations = [];
    formations.forEach((formation:any)=>{
      if(selectionnees.some((selectionne:any)=>selectionne.formation.toString() === formation._id.toString())){
        filteredFormations.push(formation);
      }
    })
    return {formations:filteredFormations,selectionnees};
  }

  @Get('bysession/:anneeUniversitaire')
  findBySession(@Param('anneeUniversitaire') anneeUniversitaire: string) {
    return this.selectionneService.findBySession(anneeUniversitaire);
  }

  @Get('sociale/selection/:anneeUniversitaire')
  async findBySociale(@Param('anneeUniversitaire') anneeUniversitaire: string) {
    const anneeparams = await this.anneeParamsService.findOneByAnneeUniversitaireId(anneeUniversitaire);
    const inscrits = await this.inscriptionService.findBySession(anneeparams.pedagogique_session);
    const selectionnees = await this.selectionneService.findBySession(anneeUniversitaire,TYPECODIF.SOCIALE);
    const selectionneesPedagogiques = await this.selectionneService.findBySession(anneeUniversitaire,TYPECODIF.PEDAGOGIQUE);
    const allSelectionnes = [...selectionnees,...selectionneesPedagogiques];
    const selt = differenceBy(inscrits,allSelectionnes,(a:any)=>{
      return allSelectionnes.some((s:any)=>s.inscription._id.toString() == a._id.toString());
    });
    const diff = differenceBy(inscrits,selt,'_id');
    return {selectionnees,diff};
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selectionneService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSelectionneDto: UpdateSelectionneDto) {
  //   return this.selectionneService.update(id, updateSelectionneDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
   const s = await  this.selectionneService.findOne(id);
   const hasDossier = await this.dossierService.findOneBySelectionneIdAndAnneeUniversitaireId(id,s.anneeUniversitaire.toString());
   if(hasDossier){
     throw new HttpException('Impossible de supprimer un selectionne qui a un dossier', 400);
   }else{
    return await this.selectionneService.remove(id);
   }
  }
}
