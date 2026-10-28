import { HttpException, Injectable } from '@nestjs/common';
import { CreateAnneeUniversitaireDto } from './dto/create-annee_universitaire.dto';
import { UpdateAnneeUniversitaireDto } from './dto/update-annee_universitaire.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnneeUniversitaire, AnneeUniversitaireDocument } from './entities/annee_universitaire.entity';
import { CampusService } from '../campus/campus.service';
import { PavillonService } from '../pavillon/pavillon.service';
import { ChambreService } from '../chambre/chambre.service';
import { DossierService } from '../dossier/dossier.service';
import { flattenDeep, round } from "lodash";
import { AnneeParametreService } from '../annee_parametre/annee_parametre.service';
import { InscriptionService } from '../inscription/inscription.service';
import { DepartementService } from '../departement/departement.service';
import { FormationService } from '../formation/formation.service';
import { TypePavillon } from 'src/pavillon/dto/create-pavillon.dto';
import { LitService } from 'src/lit/lit.service';
@Injectable()
export class AnneeUniversitaireService {
  constructor(
    @InjectModel(AnneeUniversitaire.name, 'resident') private anneeUniversitaireModel: Model<AnneeUniversitaireDocument>,
    private readonly campusService: CampusService,
    private readonly pavillonService: PavillonService,
    private readonly chambreService: ChambreService,
    private readonly dossierService: DossierService,
    private readonly anneeParametreService: AnneeParametreService,
    private readonly inscriptionService: InscriptionService,
    private readonly departementService: DepartementService,
    private readonly formationService: FormationService,
    private readonly litService: LitService
  ) {}

  async create(createAnneeUniversitaireDto: CreateAnneeUniversitaireDto) {
    try {
      const anneeUniversitaire = new this.anneeUniversitaireModel(createAnneeUniversitaireDto);
      return await anneeUniversitaire.save();
    } catch (error) {
      throw new HttpException('error creating annee universitaire', 500);
    }
  }

  async findAll() {
    try {
      return await this.anneeUniversitaireModel.find();
    } catch (error) {
      throw new HttpException('error getting annee universitaire', 500);
    }
  }

  async findOne(id: string) {
    try {
      return await this.anneeUniversitaireModel.findById(id);
    } catch (error) {
      throw new HttpException('error getting annee universitaire', 500);
    }
  }

  async findOneActive() {
    try {
      return await this.anneeUniversitaireModel.findOne({isActif:true});
    } catch (error) {
      throw new HttpException('error getting annee universitaire', 500);
    }
  }

  async update(id: string, updateAnneeUniversitaireDto: UpdateAnneeUniversitaireDto) {
    try {
      return await this.anneeUniversitaireModel.findByIdAndUpdate(id, updateAnneeUniversitaireDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string) {
    try {
      return await this.anneeUniversitaireModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException('error deleting annee universitaire', 500);
    }
  }

  async import(importDto: {anneeFrom:string,anneeTo:string}) {
    try {
     const campusesTo = await this.campusService.findAll(importDto.anneeTo);
     if(campusesTo.length == 0){
      const campusesFrom = await this.campusService.findAll(importDto.anneeFrom);
      for(const campus of campusesFrom){
        const {_id,...rest} = campus.toObject();
       const campusCreated = await this.campusService.create({
          ...rest,
          anneeUniversitaireId:importDto.anneeTo
        });
        const pavillonsTo = await this.pavillonService.findAllByAnneeUniversitaire(importDto.anneeTo);
     if(pavillonsTo.length == 0){
      const pavillonsFrom = await this.pavillonService.findAllByAnneeUniversitaire(importDto.anneeFrom);
      for(const pavillon of pavillonsFrom){
        const {_id,...rest} = pavillon.toObject();
        const pavillonCreated = await this.pavillonService.create({
          ...rest,
          campusId: campusCreated._id.toString(),
          anneeUniversitaireId:importDto.anneeTo
        });
        const chambresTo = await this.chambreService.findAllByAnneeUniversitaire(importDto.anneeTo);
        if(chambresTo.length == 0){
         const chambresFrom = await this.chambreService.findAllByAnneeUniversitaire(importDto.anneeFrom);
         for(const chambre of chambresFrom){
           const {_id,...rest} = chambre.toObject();
           const chambreCreated = await this.chambreService.create({
             ...rest,
             anneeUniversitaireId:importDto.anneeTo,
             pavillonId: pavillonCreated._id.toString()
           });
            const litsTo = await this.litService.findAllByAnneeUniversitaire(importDto.anneeTo);
        if(litsTo.length == 0){
         const litsFrom = await this.litService.findAllByAnneeUniversitaire(importDto.anneeFrom);
         for(const lit of litsFrom){
           const {_id,...rest} = lit.toObject();
           await this.litService.create({
             ...rest,
             anneeUniversitaireId:importDto.anneeTo,
             chambreId: chambreCreated._id.toString()
           });
         }
        }
         }
        }
      }
     }
      }
     }
    } catch (error) {
      throw new HttpException('error importing annee universitaire', 500);
    }
  }

  async getStatistiques(anneeId: string) {
   try {
    const dossiers = await this.dossierService.findAllByAnneeUniversitaire(anneeId);
    const campus = await this.campusService.findWithPavillonsWithChambres(anneeId);
    const chambre_par_campus = campus.filter((campus:any)=>campus.anneeUniversitaireId.toString() == anneeId).map((campus:any) => {
      return {
        campus: campus.nom,
        chambres: campus.pavillons.reduce((acc:any, pavillon:any) => {
          return acc + pavillon.chambres.length;
        }, 0),
      };
    });
    const chambre_par_pavillon = campus.map((campus:any) => {
      return {
        campus: campus.nom,
        pavillons: campus.pavillons.reduce((acc:any, pavillon:any) => {
          return [...acc,{pavillon:pavillon.nom,chambres:pavillon.chambres.length}];
        }, []),
      };
    });

    const total_places_par_pavillon = campus.filter((campus:any)=>campus.anneeUniversitaireId.toString() == anneeId).map((campus:any) => {
      return {
        campus: campus.nom,
        pavillons: campus.pavillons.reduce((acc:any, pavillon:any) => {
         return [...acc,{pavillon:pavillon.nom,type:pavillon.type,places:pavillon.chambres.reduce((accc:any, chambre:any) => {
           return accc += chambre.lits.length;
         }, 0),
         places_occupees:pavillon.chambres.reduce((accu:any, chambre:any) => {
          return accu += dossiers.filter((dossier:any)=>{
            return dossier.chambreId._id.toString() == chambre._id.toString();
          }).length;
         }, 0),
        }]; 
       },[]),
      };
    }); 
    
    return {
      dossiers,
      campus,
      chambre_par_campus,
      chambre_par_pavillon,
      total_places_par_pavillon,
    };
   } catch (error) {
    throw new HttpException('error getting statistiques', 500);
   }
  }


  async findResults(id: string): Promise<any> {
    const annneParams = await this.anneeParametreService.findOneByAnneeUniversitaireId(id);
    const inscrits = await this.inscriptionService.findBySession(annneParams.pedagogique_session);
    try {
      const departements = await this.departementService.findBySessionPedagogique(annneParams.pedagogique_session);
      const f = departements.map(d => d.formations);
      const formations = flattenDeep(f);
      const newdeps = await this.inscriptionService.findTotalByDepartment(annneParams.pedagogique_session);
      const niveaus = await this.formationService.findByNiveau();
      const s = await this.getStatistiques(id);
      const r = s.total_places_par_pavillon.map((c) => ({
        pavillons:c.pavillons.map(p => ({
          type:p.type,
          nom:p.pavillon,
          places_occupees:p.places_occupees,
          places:p.places
        }))
      })).flatMap(c=> c.pavillons);
      const totalLits = round(r.reduce((acc,cur) => acc + cur.places,0));
      const totalLitsPavillonGarcon = r.filter(p => p.type === TypePavillon.HOMME).reduce((acc,cur) => acc + cur.places,0);
      const totalLitsPavillonFille = r.filter(p => p.type === TypePavillon.FEMME).reduce((acc,cur) => acc + cur.places,0);
      const pourcentageLitsPavillonGarcon = round((totalLitsPavillonGarcon /totalLits) * 100);
      
      const pourcentageLitsPavillonFille = round((totalLitsPavillonFille /totalLits) * 100);
      const absoluPedagogique = (totalLits * annneParams.pedagogique) / 100;
      const absoluSociale = round(totalLits  - absoluPedagogique);
      const absoluPedGarcon = round((absoluPedagogique * pourcentageLitsPavillonGarcon) / 100);
      const absoluPedFille = round((absoluPedagogique * pourcentageLitsPavillonFille) / 100);
      const absoluSocGarcon = round((absoluSociale * pourcentageLitsPavillonGarcon) / 100);
      const absoluSocFille = round((absoluSociale * pourcentageLitsPavillonFille) / 100);
      const effectifTotal = newdeps.reduce((acc,cur) => acc + cur.total,0)
      const effectifDepartement = newdeps.map(d => {
      const percent = round((d.total / effectifTotal) * 100);
      const nb_lit = round(percent * absoluPedagogique / 100,2);
       return {...d,percent,nb_lit}
      });
      const effectifFormation = formations.map(f => {
      const homme = inscrits.filter(fr => (fr.formation._id.toString() === f._id.toString())).filter(fr => fr.etudiant.genre === "H").length;
      const femme = inscrits.filter(fr => (fr.formation._id.toString() === f._id.toString())).filter(fr => fr.etudiant.genre === "F").length;
      const niv = f.nom.substring(f.nom.length - 8);
      const pcs = this.getPedagogiquePercent(niv,annneParams)
      const nbld = this.getNbLitDepartement(f.departement,effectifDepartement);
      const pf = this.getPourcentage(niv,f.departement,niveaus,pcs);
      const nb_lit = round((nbld * pf) / 100,2);
      const nb_lit_g = round((nb_lit * pourcentageLitsPavillonGarcon) / 100,2);
      const nb_lit_f = round((nb_lit * pourcentageLitsPavillonFille) / 100,2);
        return  {...f,percent: round(pf),nb_lit:round(nb_lit),nb_lit_f,nb_lit_g,homme,femme};
      });
      const calculs = {
        totalLits,
        totalLitsPavillonGarcon,
        totalLitsPavillonFille,
        pourcentageLitsPavillonGarcon,
        pourcentageLitsPavillonFille,
        absoluPedagogique:round(absoluPedagogique),
        absoluSociale,
        absoluPedGarcon,
        absoluPedFille,
        absoluSocGarcon,
        absoluSocFille,
        effectifTotal
      }
      // console.log(effectifDepartement[0]);
      // console.log(effectifFormation[0]);
      const effectifs = effectifDepartement.map(d => {
        const formations = effectifFormation.filter(f => f.departement === d._id.toString());
       return {...d,formations}
      });
      return {totalParDepartement: effectifs,inscrits,calculs,session: annneParams.pedagogique_session};
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  getPourcentage(niveau:string,departement: string,tab: any[],pcs: number) {
    const f = tab.find(t => t._id._id === niveau && t._id.departement === departement);
    if (!f) {
      return 0;
    }
      const p = pcs / f.total;
      return  p;
  }

  getNbLitDepartement(departement: string,tab: any[]) {
    const d = tab.find(t => t.departement._id.toString() === departement);
    if(!d) return 0;
    return d.nb_lit;
  }
  getPedagogiquePercent(niv: string,o: any) {
    if(niv === "NIVEAU 1") {
      return o.licence1;
    }
    else if(niv === "NIVEAU 2") {
      return o.licence2;
    }
    else if(niv === "NIVEAU 3") {
      return o.licence3;
    }else if(niv === "NIVEAU 4") {
      return o.master1;
    }
    else if(niv === "NIVEAU 5") {
      return o.master2;
    }
    else {
      return 0;
    }
  }
  
}
