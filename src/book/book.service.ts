import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './schemas/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  async findById(id: string): Promise<Book> {
    if (!mongoose.isValidObjectId(id)) {
      throw new NotFoundException('Invalid ID format');
    }

    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException('Book Not Found.');
    }
    return book;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true, // Returns the updated document
      runValidators: true, // Ensures that validation is applied
    });
  }

  async deleteById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
