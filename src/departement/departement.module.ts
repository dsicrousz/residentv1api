import { Module } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Departement, DepartementSchema } from './entities/departement.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: Departement.name, schema: DepartementSchema}],"etudiant"),],
  providers: [DepartementService],
  exports:[DepartementService]
})
export class DepartementModule {}
