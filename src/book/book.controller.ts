import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book.dto';
@Controller('books')
export class BookController {
  constructor(private BookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.BookService.findAll();
  }

  @Post()
  async createBook(
    @Body()
    book: CreateBookDto,
  ): Promise<Book> {
    return this.BookService.create(book);
  }

  @Get(':id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.BookService.findById(id);
  }

  @Put(':id')
  async updateById(@Param('id') id: string, @Body() book: Book): Promise<Book> {
    return this.BookService.updateById(id, book);
  }

  @Put(':id')
  async deleteById(@Param('id') id: string): Promise<Book> {
    return this.BookService.deleteById(id);
  }
}
