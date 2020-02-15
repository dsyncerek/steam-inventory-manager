import { Test, TestingModule } from '@nestjs/testing';
import { AccessControlService } from './access-control.service';
import { ROLES_CONFIG_TOKEN } from './decorators/inject-roles-config.decorator';

describe('AccessControlService', () => {
  let service: AccessControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessControlService, { provide: ROLES_CONFIG_TOKEN, useValue: {} }],
    }).compile();

    service = module.get<AccessControlService>(AccessControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
