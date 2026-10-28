import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipementService } from './equipement.service';
import { CreateEquipementDto } from './dto/create-equipement.dto';
import { UpdateEquipementDto } from './dto/update-equipement.dto';

@Controller('equipement')
export class EquipementController {
  constructor(private readonly equipementService: EquipementService) {}

  @Post()
  create(@Body() createEquipementDto: CreateEquipementDto) {
    return this.equipementService.create(createEquipementDto);
  }

  @Get()
  findAll() {
    return this.equipementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipementService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipementDto: UpdateEquipementDto) {
    return this.equipementService.update(id, updateEquipementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipementService.remove(id);
  }
}
