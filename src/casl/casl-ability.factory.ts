import {
  PureAbility,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  mongoQueryMatcher,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User, USER_ROLE } from 'src/user/entities/user.entity';
import { AnneeUniversitaire } from 'src/annee_universitaire/entities/annee_universitaire.entity';
import { Chambre } from 'src/chambre/entities/chambre.entity';
import { Etudiant } from 'src/etudiant/entities/etudiant.entity';
import { Dossier } from 'src/dossier/entities/dossier.entity';
import { Inscription } from 'src/inscription/entities/inscription.entity';
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | InferSubjects<typeof AnneeUniversitaire> |
 InferSubjects<typeof Chambre> | InferSubjects<typeof Etudiant> 
  | InferSubjects<typeof Inscription>
 | InferSubjects<typeof Dossier> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can,cannot, build } = new AbilityBuilder<PureAbility<[Action, Subjects]>>(
      PureAbility as AbilityClass<AppAbility>,
    );

    if (user.role.includes(USER_ROLE.SUPERADMIN)) {
      can(Action.Manage, 'all'); // read-write access to everything
    }
    else if(user.role.includes(USER_ROLE.ADMIN)) {
      can(Action.Read, User, {_id: {$eq: user._id}});
      cannot(Action.Update, User, {_id: {$eq:user._id}});
      cannot(Action.Delete, User, {_id: {$eq:user._id}});
      can(Action.Create,Chambre);
      can(Action.Create,Dossier);
      can(Action.Update,Dossier);
      can(Action.Read,Chambre);
      can(Action.Update,Chambre);
      can(Action.Read,AnneeUniversitaire);
      can(Action.Update,AnneeUniversitaire);
      can(Action.Delete,AnneeUniversitaire);
      can(Action.Read,Etudiant);
      can(Action.Read,Inscription);
      can(Action.Read,Dossier);
      cannot(Action.Delete,Dossier);
      cannot(Action.Delete,Etudiant);
      cannot(Action.Delete,Chambre);
      cannot(Action.Delete,AnneeUniversitaire);
      cannot(Action.Delete,Inscription);
    }
     else {
      can(Action.Read, User, {_id: {$eq: user._id}});
      cannot(Action.Delete, User, {_id: {$eq:user._id}});
      cannot(Action.Update, User, {_id: {$eq:user._id}});
      cannot(Action.Update, User, {_id: {$eq:user._id}});
      cannot(Action.Delete, User, {_id: {$eq:user._id}});
      cannot(Action.Create,Chambre);
      can(Action.Read,Chambre);
      cannot(Action.Update,Chambre);
      cannot(Action.Delete,Chambre);
      can(Action.Read,Etudiant);
      can(Action.Read,Inscription);
      can(Action.Read,Dossier);
      cannot(Action.Delete,Dossier);
      cannot(Action.Delete,Etudiant);
    }

    return build({
      conditionsMatcher: mongoQueryMatcher,
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
