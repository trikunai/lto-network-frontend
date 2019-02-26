import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  LtoPublicNodeService,
  EncoderService,
  LTO_PUBLIC_NODE_HOST,
  LTO_STATS_HOST,
  StatisticsService
} from './services';

export interface CoreModuleConfig {
  publicNodeHost: string;
}

@NgModule({
  providers: [LtoPublicNodeService.provider, EncoderService.provider, StatisticsService.provider]
})
export class CoreModule {
  static forRoot(config: CoreModuleConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: LTO_PUBLIC_NODE_HOST,
          useValue: config.publicNodeHost
        },
        {
          provide: LTO_STATS_HOST,
          useValue: ''
        }
      ]
    };
  }
}
