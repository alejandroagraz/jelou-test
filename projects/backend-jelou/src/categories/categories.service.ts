import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../categories/entity/category.entity';
import { Repository } from 'typeorm';
import { PageOptionsDto } from '../common/dto/page-options.dto';
import { PageDto } from '../common/dto/page.dto';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { CreateCategoryInput } from './inputs/create-category.input';
import { CategoryDto } from './dto/category.dto';
import { UpdateCategoryInput } from './inputs/update-category.input';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CategoryEntity>> {
    const queryBuilder =
      this.categoryRepository.createQueryBuilder('categories');

    queryBuilder
      .orderBy('categories.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getDetail(id: string): Promise<CategoryEntity> {
    try {
      const category = await this.categoryRepository
        .createQueryBuilder('categories')
        .leftJoinAndSelect('categories.post', 'post')
        .where('categories.id = :id', { id: id })
        .getOne();

      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      return category;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(data: CreateCategoryInput): Promise<CategoryDto> {
    const createCategory = new CategoryEntity();

    createCategory.title = data.title;
    createCategory.context = data.context;

    try {
      return await this.categoryRepository.save(createCategory);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async update(id: string, data: UpdateCategoryInput): Promise<CategoryDto> {
    const date: Date = new Date();
    const updateCategory = await this.findOneByID(id);

    if (!updateCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    updateCategory.title = data.title || updateCategory.title;
    updateCategory.context = data.context || updateCategory.context;
    updateCategory.updated_at = date;

    try {
      return await this.categoryRepository.save(updateCategory);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async deleteOneByID(id: string): Promise<any> {
    try {
      return await this.categoryRepository
        .createQueryBuilder('categories')
        .softDelete()
        .from(CategoryEntity)
        .where('categories.id = :id', { id: id })
        .execute();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneByID(id: string): Promise<CategoryEntity> {
    return await this.categoryRepository
      .createQueryBuilder('categories')
      .where('categories.id = :id', { id: id })
      .getOne();
  }
}
