import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository as RepositoryOrm } from 'typeorm';

import { Repository } from '../../../src/modules/repository/repository.entity';
import { RepositoryService } from '../../../src/modules/repository/repository.service';
import {
  itemRepository,
  itemRepositoryDto,
  itemTribuDto,
  listRepositories,
} from '../values-test';
import { Tribe } from '../../../src/modules/tribe/tribe.entity';
import { lastValueFrom, of } from 'rxjs';
import { BadRequestException } from '@nestjs/common';
import { MessageValues } from '../../../src/constansts/MessageValues';

describe('RepositoryService', () => {
  let service: RepositoryService;
  let repository: RepositoryOrm<Repository>;
  let tribu: RepositoryOrm<Tribe>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepositoryService,
        {
          provide: getRepositoryToken(Repository),
          useFactory: () => ({
            findOne: jest.fn(() => Promise.resolve(itemRepository)),
            find: jest.fn(() => Promise.resolve(listRepositories)),
            save: jest.fn(() => Promise.resolve(listRepositories)),
          }),
        },
        {
          provide: getRepositoryToken(Tribe),
          useFactory: () => ({
            findOne: jest.fn(() => Promise.resolve(itemTribuDto)),
          }),
        },
      ],
    }).compile();

    service = module.get<RepositoryService>(RepositoryService);
    repository = module.get(getRepositoryToken(Repository));
    tribu = module.get(getRepositoryToken(Tribe));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(tribu).toBeDefined();
  });

  describe('When getRepositoryById is called - ', () => {
    it(' and return a list repositories', async () => {
      const resp = await lastValueFrom(service.getItemById(7));

      expect(resp).toEqual(itemRepository);

      expect(repository.findOne).toBeCalledTimes(1);
      expect(repository.findOne).toBeCalledWith({ id_repository: 7 });
      expect(repository.findOne).not.toBeCalledWith({ id_repository: 8 });
    });

    it(' and not exist the repository and return message: El Repositorio no se encuentra registrado..', async () => {
      repository.findOne = jest.fn().mockImplementation(() => of(''));

      await expect(lastValueFrom(service.getItemById(7))).rejects.toThrow(
        new BadRequestException(MessageValues.MESSAGE_R404),
      );
    });
  });

  describe('When getRepositoryByTribeId is called - ', () => {
    it('and return all list of repositories ', async () => {
      const resp = await lastValueFrom(service.getAllItems());

      expect(resp).toEqual([itemRepositoryDto, itemRepositoryDto]);
      expect(resp).not.toEqual([
        itemRepositoryDto,
        itemRepositoryDto,
        itemRepositoryDto,
      ]);

      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).not.toBeCalledTimes(2);
    });
  });

  describe('When getItemsByTribeId is called - ', () => {
    it('and tribe exists than should return list of repositories with tribeId equal', async () => {
      const resp = await lastValueFrom(service.getItemsByTribeId(7));

      expect(resp).toEqual([itemRepositoryDto, itemRepositoryDto]);
      expect(resp).not.toEqual([
        itemRepositoryDto,
        itemRepositoryDto,
        itemRepositoryDto,
      ]);

      expect(tribu.findOne).toBeCalledTimes(1);
      expect(tribu.findOne).not.toBeCalledTimes(2);

      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).not.toBeCalledTimes(2);
    });

    it('and tribe not exists than not should return list of repositories', async () => {
      tribu.findOne = jest.fn().mockImplementation(() => of([]));

      try {
        await lastValueFrom(service.getItemsByTribeId(7));
      } catch (e) {
        expect(tribu.findOne).toBeCalledTimes(1);
        expect(tribu.findOne).not.toBeCalledTimes(2);

        expect(repository.find).not.toBeCalled();
      }
    });
  });
});