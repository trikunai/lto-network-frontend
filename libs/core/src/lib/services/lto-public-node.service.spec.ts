import { TestBed } from '@angular/core/testing';
import { CoreTestingModule } from '../testing';
import { LTO_PUBLIC_NODE_HOST, LtoPublicNodeService } from './lto-public-node.service';
import { HttpTestingController } from '@angular/common/http/testing';

describe('core/LtoPublicNodeService', () => {
  let publicNodeService: LtoPublicNodeService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule],
      providers: [
        {
          provide: LTO_PUBLIC_NODE_HOST,
          useValue: 'https://test.com'
        },
        LtoPublicNodeService.provider
      ]
    });

    publicNodeService = TestBed.get(LtoPublicNodeService);
    backend = TestBed.get(HttpTestingController);
  });

  describe('#blockHeaders', () => {
    it('should request sequence', () => {
      publicNodeService.blockHeaders(100, 20).subscribe();
      const req = backend.expectOne('https://test.com/blocks/headers/seq/80/100');
      req.flush([]);
    });

    it('should not request negative "from"', () => {
      publicNodeService.blockHeaders(10, 20).subscribe();
      const req = backend.expectOne('https://test.com/blocks/headers/seq/0/10');
      req.flush([]);
    });
  });
});
