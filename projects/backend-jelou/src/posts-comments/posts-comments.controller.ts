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
import { DetailPostCommentDto } from './dto/detail-post-comment.dto';
import { AuthenticatedAccount } from '../common/decorators/auth-user.decorator';
import { PostsCommentsService } from './posts-comments.service';
import { CreatePostCommentInput } from './inputs/create-post-comment.input';
import { UpdatePostCommentInput } from './inputs/update-post-comment.input';
import { PostCommentDto } from './dto/post-comment.dto';

@ApiTags('Posts comments')
@ApiBearerAuth('token')
@Controller('posts-comments')
export class PostsCommentsController {
  constructor(private readonly _postCommentService: PostsCommentsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Get all post comments' })
  @ApiExtraModels(PageDto, PostCommentDto)
  @ApiPaginatedResponse(PostCommentDto)
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<PostCommentDto>> {
    return await this._postCommentService.getAll(pageOptionsDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a post comments according to its ID' })
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
    type: [DetailPostCommentDto],
  })
  async getDetail(@Param('id') id: string): Promise<DetailPostCommentDto> {
    return await this._postCommentService.getDetail(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new post comments' })
  @ApiBody({ type: CreatePostCommentInput })
  @ApiOkResponse({
    status: 201,
    description: 'Success response',
    type: [PostCommentDto],
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  async create(
    @Body() newPostComment: CreatePostCommentInput,
    @AuthenticatedAccount() user,
  ): Promise<PostCommentDto> {
    return await this._postCommentService.create(newPostComment, user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a post comments according to its ID' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    example: '6ec47750-727d-4d44-9f26-73ba303c3f61',
  })
  @ApiBody({ type: UpdatePostCommentInput })
  @ApiOkResponse({
    status: 201,
    description: 'Success response',
    type: [PostCommentDto],
  })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  async update(
    @Param('id') id: string,
    @Body() updatePostComment: UpdatePostCommentInput,
    @AuthenticatedAccount() user,
  ): Promise<PostCommentDto> {
    return await this._postCommentService.update(id, updatePostComment, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a post comments according to its ID' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    example: '6ec47750-727d-4d44-9f26-73ba303c3f61',
  })
  @ApiOkResponse({ status: 200, description: 'Success remove pos commentst' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBadGatewayResponse({ status: 502, description: 'Something happened' })
  async deleteOneByID(@Param('id') id: string) {
    const resp = await this._postCommentService.deleteOneByID(id);

    if (!resp.affected) {
      throw new HttpException('Post comments not found', HttpStatus.NOT_FOUND);
    }

    return { status: 200, message: 'Success remove post comments' };
  }
}
