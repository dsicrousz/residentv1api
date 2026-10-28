import { Controller, Get, Param} from '@nestjs/common';
import { SessionEtudiantService } from './session-etudiant.service';
// import { CreateSessionDto } from './dto/create-session.dto';
// import { UpdateSessionDto } from './dto/update-session.dto';

@Controller('session_etudiant')
export class SessionEtudiantController {
  constructor(private readonly sessionService: SessionEtudiantService) {}


  @Get()
  findAll() {
    return this.sessionService.findAll();
  }
  
  @Get('/activate')
  findAllActivate() {
    return this.sessionService.findAllActivate();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionService.findOne(id);
  }
}
