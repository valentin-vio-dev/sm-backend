import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateManufacturerDTO } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDTO } from './dto/update-manufactuer.dto';
import { Manufacturer } from './manufacturer.entity';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
  ) {}

  async findAll(): Promise<Manufacturer[]> {
    return await this.manufacturerRepository.find();
  }

  async findById(id: number): Promise<Manufacturer> {
    const man = await this.manufacturerRepository.findOne(id);
    if (!man) {
      throw new NotFoundException('Manufacturer not found!');
    }
    return man;
  }

  async create(manufacturer: CreateManufacturerDTO) {
    const existingManufacturer = await this.manufacturerRepository.findOne({
      where: {
        name: manufacturer.name,
      },
    });

    if (existingManufacturer) {
      throw new BadRequestException('Manufacturer already exists!');
    }

    return await this.manufacturerRepository.save(manufacturer);
  }

  async delete(id: number): Promise<null> {
    const res: DeleteResult = await this.manufacturerRepository.delete({ id });
    if (res.affected === 0) {
      throw new NotFoundException('Manufactrurer not found!');
    }
    return null;
  }

  async updateManufacturer(
    id: number,
    update: UpdateManufacturerDTO,
  ): Promise<Manufacturer> {
    const manufactuer = await this.manufacturerRepository.findOne(id);
    if (!manufactuer) {
      throw new NotFoundException('Manufacturer not found!');
    }

    const existingManufacturer = await this.manufacturerRepository.findOne({
      where: {
        name: update.name,
      },
    });

    if (existingManufacturer) {
      throw new BadRequestException(
        'Manufacturer already exists with this name!',
      );
    }

    const updated = new Manufacturer({
      ...manufactuer,
      ...update,
      id,
    });
    return await this.manufacturerRepository.save(updated);
  }
}
