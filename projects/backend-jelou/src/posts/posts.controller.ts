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
import { PostsService } from '../posts/posts.service';
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
import { AuthenticatedAccount } from '../common/decorators/auth-user.decorator';
import { CreatePostInput } from './inputs/create-post.input';
import { UpdatePostInput } from './inputs/update-post.input';
import { PostDto } from './dto/post.dto';
import { DetailPostDto } from './dto/detail-post.dto';
import { TagUserPostInput } from './inputs/tag-user-post.input';
import { TagUserPostDto } from './dto/tag-user-post.dto';
import { PostEntity } from './entity/post.entity';
import { SearchPostOptionInput } from './inputs/search-post-option.input';

@ApiTags('Posts')
@ApiBearerAuth('token')
@Controller('posts')
export class PostsController {
  constructor(private readonly _postService: PostsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Get all post' })
  @ApiExtraModels(PageDto, PostDto)
  @ApiPaginatedResponse(PostDto)
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() searchOptions: SearchPostOptionInput,
  ): Promise<PageDto<PostDto>> {
    return await this._postService.getAll(pageOptionsDto, searchOptions);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a post according to its ID' })
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
    type: [DetailPostDto],
  })
  async getDetail(@Param('id') id: string): Promise<DetailPostDto> {
    return await this._postService.getDetail(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new post' })
  @ApiBody({ type: CreatePostInput })
  @ApiOkResponse({
    status: 201,
    description: 'Success response',
    type: [PostDto],
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  async create(
    @Body() newPost: CreatePostInput,
    @AuthenticatedAccount() user,
  ): Promise<PostDto> {
    return await this._postService.create(newPost, user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a post according to its ID' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    example: '6ec47750-727d-4d44-9f26-73ba303c3f61',
  })
  @ApiBody({ type: UpdatePostInput })
  @ApiOkResponse({
    status: 201,
    description: 'Success response',
    type: [PostDto],
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  async update(
    @Param('id') id: string,
    @Body() updatePost: UpdatePostInput,
    @AuthenticatedAccount() user,
  ): Promise<PostDto> {
    return await this._postService.update(id, updatePost, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a post according to its ID' })
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
    const resp = await this._postService.deleteOneByID(id);

    if (!resp.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return { status: 200, message: 'Success remove post' };
  }

  @Post('/tag-user')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Tag user post' })
  @ApiBody({ type: TagUserPostInput })
  @ApiOkResponse({
    status: 201,
    description: 'Success response',
    type: [TagUserPostDto],
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  async tagUserPost(
    @Body() tagUserPost: TagUserPostInput,
  ): Promise<PostEntity> {
    return await this._postService.tagUserPost(tagUserPost);
  }
}
