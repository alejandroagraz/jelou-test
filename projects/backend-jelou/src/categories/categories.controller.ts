import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auths/guards/jwt-auth.guard';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PageDto } from '../common/dto/page.dto';
import { ApiPaginatedResponse } from '../common/dto/api-pagination-response';
import { PageOptionsDto } from '../common/dto/page-options.dto';
import { CategoryDto } from './dto/category.dto';
import { DetailCategoryDto } from './dto/detail-category.dto';
import { CreateCategoryInput } from './inputs/create-category.input';
import { UpdateCategoryInput } from './inputs/update-category.input';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './entity/category.entity';

@ApiTags('Categories')
@ApiBearerAuth('token')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly _categoryService: CategoriesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Get all categories' })
  @ApiExtraModels(PageDto, CategoryDto)
  @ApiPaginatedResponse(CategoryDto)
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CategoryDto>> {
    return await this._categoryService.getAll(pageOptionsDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a category according to its ID' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    example: '6ec47750-727d-4d44-9f26-73ba303c3f61',
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  @ApiOkResponse({
    status: 200,
    description: 'Success response',
    type: [DetailCategoryDto],
  })
  async getDetail(@Param('id') id: string): Promise<CategoryEntity> {
    return await this._categoryService.getDetail(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new category' })
  @ApiBody({ type: CreateCategoryInput })
  @ApiOkResponse({
    status: 201,
    description: 'Success response',
    type: [CategoryDto],
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  async create(@Body() newCategory: CreateCategoryInput): Promise<CategoryDto> {
    return await this._categoryService.create(newCategory);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a category according to its ID' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    example: '6ec47750-727d-4d44-9f26-73ba303c3f61',
  })
  @ApiBody({ type: UpdateCategoryInput })
  @ApiOkResponse({
    status: 201,
    description: 'Success response',
    type: [CategoryDto],
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  async update(
    @Param('id') id: string,
    @Body() updateCategory: UpdateCategoryInput,
  ): Promise<CategoryDto> {
    return await this._categoryService.update(id, updateCategory);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a category according to its ID' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    example: '6ec47750-727d-4d44-9f26-73ba303c3f61',
  })
  @ApiOkResponse({ status: 200, description: 'Success remove post' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  async deleteOneByID(@Param('id') id: string) {
    const resp = await this._categoryService.deleteOneByID(id);

    if (!resp.affected) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return { status: 200, message: 'Success remove category' };
  }
}
