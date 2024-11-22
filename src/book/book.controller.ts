import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('books')
@ApiTags('books') // Groups all endpoints under 'books' in Swagger UI
export class BookController {
  constructor(private BookService: BookService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'List of all books.' })
  async getAllBooks(): Promise<Book[]> {
    return this.BookService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  async createBook(
    @Body()
    book: CreateBookDto,
  ): Promise<Book> {
    return this.BookService.create(book);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({ name: 'id', description: 'The unique ID of the book' })
  @ApiResponse({
    status: 200,
    description: 'Book details retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.BookService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiParam({ name: 'id', description: 'The unique ID of the book' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  async updateById(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.BookService.updateById(id, book);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiParam({ name: 'id', description: 'The unique ID of the book' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  async deleteById(@Param('id') id: string): Promise<Book> {
    return this.BookService.deleteById(id);
  }
}
