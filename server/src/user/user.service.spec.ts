import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesEnum } from '../access-control/enums/roles.enum';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const USERS: User[] = [new User({ steamId: '123' }), new User({ steamId: '456' }), new User({ steamId: '789' })];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: getRepositoryToken(User), useClass: Repository }],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should get all users', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(USERS);

      const users = await userService.getAllUsers();

      expect(users).toBe(USERS);
      expect(userRepository.find).toBeCalledTimes(1);
      expect(userRepository.find).toBeCalledWith();
    });
  });

  describe('getUser', () => {
    it('should get user', async () => {
      jest.spyOn(userRepository, 'findOneOrFail').mockResolvedValue(USERS[0]);

      const steamId = USERS[0].steamId;
      const user = await userService.getUser(steamId);

      expect(user).toBe(USERS[0]);
      expect(userRepository.findOneOrFail).toBeCalledTimes(1);
      expect(userRepository.findOneOrFail).toBeCalledWith({ steamId });
    });
  });

  describe('createUser', () => {
    it('should create user', async () => {
      jest.spyOn(userRepository, 'insert').mockResolvedValue(null);

      await userService.createUser(USERS[0]);

      expect(userRepository.insert).toBeCalledTimes(1);
      expect(userRepository.insert).toBeCalledWith({ ...USERS[0], roles: [RolesEnum.User] });
    });
  });

  describe('updateUser', () => {
    it('should update user', async () => {
      jest.spyOn(userRepository, 'update').mockResolvedValue(null);

      const steamId = USERS[0].steamId;
      await userService.updateUser(steamId, USERS[0]);

      expect(userRepository.update).toBeCalledTimes(1);
      expect(userRepository.update).toBeCalledWith({ steamId }, USERS[0]);
    });
  });

  describe('deleteUser', () => {
    it('should delete user', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue(null);

      const steamId = USERS[0].steamId;
      await userService.deleteUser(steamId);

      expect(userRepository.delete).toBeCalledTimes(1);
      expect(userRepository.delete).toBeCalledWith({ steamId });
    });
  });
});
