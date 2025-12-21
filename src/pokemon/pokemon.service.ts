import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) { }


  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {

      const { limit = 50, offset = 0 } = paginationDto;

      const pokemons = ((await this.pokemonModel.find().limit(limit).skip(offset).sort({ no: 1 }).select('-__v')))
      return pokemons;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Can't find Pokemons - Check server logs`);

    }
  }

  async findOne(term: string): Promise<Pokemon> {
    const normalizedTerm = term.toLowerCase().trim();

    let pokemon: Pokemon | null = null;

    if (!isNaN(+normalizedTerm)) {
      pokemon = await this.pokemonModel.findOne({ no: +normalizedTerm });
    } else if (isValidObjectId(normalizedTerm)) {
      pokemon = await this.pokemonModel.findById(normalizedTerm);
    } else {
      pokemon = await this.pokemonModel.findOne({ name: normalizedTerm });
    }

    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon with id, name or no "${term}" not found`,
      );
    }

    return pokemon;
  }


  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }

    return `Pokemon with id "${id}" has been deleted`;
  }


  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }
}
