import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AllocationService } from './allocation.service';
import { CreateAllocationDto } from './dto/create-allocation.dto';
import { UpdateAllocationDto } from './dto/update-allocation.dto';

@Controller('allocation')
export class AllocationController {
  constructor(private readonly allocationService: AllocationService) {}

  @Post()
  create(@Body() createAllocationDto: CreateAllocationDto) {
    return this.allocationService.create(createAllocationDto);
  }

  @Get()
  findAll() {
    return this.allocationService.findAll();
  } 

  @Get("byDossier/:id")
  findAllByDossier(@Param('id') id: string) {
    return this.allocationService.findAllByDossier(id);
  }

  @Get("anneeUniversitaire/:id")
  findAllByAnneeUniversitaire(@Param('id') id: string) {
    return this.allocationService.findAllByAnneeUniversitaire(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allocationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAllocationDto: UpdateAllocationDto) {
    return this.allocationService.update(id, updateAllocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allocationService.remove(id);
  }
}
