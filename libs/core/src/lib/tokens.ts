import { InjectionToken } from '@angular/core';

export const LTO_PUBLIC_NODE_HOST = new InjectionToken<string>('LTO_PUBLIC_NODE_HOST');
export const LTO_NETWORK_BYTE = new InjectionToken<'L' | 'T'>('LTO_NETWORK_BYTE');
