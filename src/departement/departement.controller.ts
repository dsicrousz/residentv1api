import { Controller } from '@nestjs/common';

@Controller('departement')
export class DepartementController {
  constructor() {}

  // @Post()
  // create(@Body() createDepartementDto: CreateDepartementDto) {
  //   return this.departementService.create(createDepartementDto);
  // }

  // @Get()
  // findAll() {
  //   return this.departementService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.departementService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDepartementDto: UpdateDepartementDto) {
  //   return this.departementService.update(id, updateDepartementDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.departementService.remove(id);
  // }
}
