import { RequestMethod, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DossierModule } from './dossier/dossier.module';
import { PayementModule } from './payement/payement.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { EtudiantModule } from './etudiant/etudiant.module';
import { InscriptionModule } from './inscription/inscription.module';
import { AnneeUniversitaireModule } from './annee_universitaire/annee_universitaire.module';
import { CampusModule } from './campus/campus.module';
import { PavillonModule } from './pavillon/pavillon.module';
import { ChambreModule } from './chambre/chambre.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AllocationModule } from './allocation/allocation.module';
import { EquipementModule } from './equipement/equipement.module';
import { AnneeParametreModule } from './annee_parametre/annee_parametre.module';
import { SessionEtudiantModule } from './session-etudiant/session-etudiant.module';
import { SelectionneModule } from './selectionne/selectionne.module';
import { LitModule } from './lit/lit.module';
import { FormationModule } from './formation/formation.module';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    CacheModule.register({ttl: 3000,isGlobal:true}),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGODB_URL_ETUDIANT'),
        autoCreate: true,
      }),
      connectionName: 'etudiant',
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGODB_URL_RESIDENT'),
        autoCreate: true,
      }),
      connectionName: 'resident',
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    EtudiantModule,
    InscriptionModule,
    DossierModule,
    PayementModule,
    AnneeUniversitaireModule,
    CampusModule,
    PavillonModule,
    ChambreModule,
    AllocationModule,
    EquipementModule,
    AnneeParametreModule,
    SessionEtudiantModule,
    SelectionneModule,
    LitModule,
    FormationModule,
  ],
  controllers: [AppController],
  providers: [AppService,{
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'user/login', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
