import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: [] ) {}

  // CREATE
  async create(data: CreateUserDto) {
    return this.prisma.users.create({
      data,
    });
  }

  // FIND ALL
  async findAll() {
    return this.prisma.users.findMany({
      include: {
        carts: true,
        orders: true,
      },
    });
  }

  // FIND ONE
  async findOne(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id },
      include: {
        carts: true,
        orders: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  // UPDATE
  async update(id: string, data: UpdateUserDto) {
    await this.findOne(id); // garante que existe

    return this.prisma.users.update({
      where: { id },
      data,
    });
  }

  // DELETE
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.users.delete({
      where: { id },
    });
  }
}
