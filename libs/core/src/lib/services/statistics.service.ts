import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Stats, TransactionType } from '../models';
import { map } from 'rxjs/operators';

export const LTO_STATS_HOST = new InjectionToken<string>('LTO_STATS_HOST');

interface TransactionsStatsConfig {
  startdate: string;
  enddate: string;
  granularity?: 'sec' | 'hour' | 'day';
  type?: TransactionType;
}

const DUMMY: LTO.API.Stats[] = [
  {
    transactions: 4,
    date: '2019-01-12T14:00:00.000Z'
  },
  {
    transactions: 2,
    date: '2019-01-12T16:00:00.000Z'
  },
  {
    transactions: 3,
    date: '2019-01-13T18:00:00.000Z'
  },
  {
    transactions: 79,
    date: '2019-01-13T22:00:00.000Z'
  },
  {
    transactions: 15,
    date: '2019-01-13T23:00:00.000Z'
  },
  {
    transactions: 22,
    date: '2019-01-14T00:00:00.000Z'
  },
  {
    transactions: 29,
    date: '2019-01-14T01:00:00.000Z'
  },
  {
    transactions: 18,
    date: '2019-01-14T02:00:00.000Z'
  },
  {
    transactions: 39,
    date: '2019-01-14T03:00:00.000Z'
  },
  {
    transactions: 27,
    date: '2019-01-14T04:00:00.000Z'
  },
  {
    transactions: 29,
    date: '2019-01-14T05:00:00.000Z'
  },
  {
    transactions: 21,
    date: '2019-01-14T06:00:00.000Z'
  },
  {
    transactions: 49,
    date: '2019-01-14T07:00:00.000Z'
  },
  {
    transactions: 71,
    date: '2019-01-14T08:00:00.000Z'
  },
  {
    transactions: 120,
    date: '2019-01-14T09:00:00.000Z'
  },
  {
    transactions: 95,
    date: '2019-01-14T10:00:00.000Z'
  },
  {
    transactions: 69,
    date: '2019-01-14T11:00:00.000Z'
  },
  {
    transactions: 64,
    date: '2019-01-14T12:00:00.000Z'
  },
  {
    transactions: 89,
    date: '2019-01-14T13:00:00.000Z'
  },
  {
    transactions: 83,
    date: '2019-01-14T14:00:00.000Z'
  },
  {
    transactions: 105,
    date: '2019-01-14T15:00:00.000Z'
  },
  {
    transactions: 172,
    date: '2019-01-14T16:00:00.000Z'
  },
  {
    transactions: 241,
    date: '2019-01-14T17:00:00.000Z'
  },
  {
    transactions: 205,
    date: '2019-01-14T18:00:00.000Z'
  },
  {
    transactions: 183,
    date: '2019-01-14T19:00:00.000Z'
  },
  {
    transactions: 124,
    date: '2019-01-14T20:00:00.000Z'
  },
  {
    transactions: 73,
    date: '2019-01-14T21:00:00.000Z'
  },
  {
    transactions: 45,
    date: '2019-01-14T22:00:00.000Z'
  },
  {
    transactions: 46,
    date: '2019-01-14T23:00:00.000Z'
  },
  {
    transactions: 24,
    date: '2019-01-15T00:00:00.000Z'
  },
  {
    transactions: 30,
    date: '2019-01-15T01:00:00.000Z'
  },
  {
    transactions: 51,
    date: '2019-01-15T02:00:00.000Z'
  },
  {
    transactions: 29,
    date: '2019-01-15T03:00:00.000Z'
  },
  {
    transactions: 37,
    date: '2019-01-15T04:00:00.000Z'
  },
  {
    transactions: 19,
    date: '2019-01-15T05:00:00.000Z'
  },
  {
    transactions: 26,
    date: '2019-01-15T06:00:00.000Z'
  },
  {
    transactions: 52,
    date: '2019-01-15T07:00:00.000Z'
  },
  {
    transactions: 43,
    date: '2019-01-15T08:00:00.000Z'
  },
  {
    transactions: 76,
    date: '2019-01-15T09:00:00.000Z'
  },
  {
    transactions: 89,
    date: '2019-01-15T10:00:00.000Z'
  },
  {
    transactions: 82,
    date: '2019-01-15T11:00:00.000Z'
  },
  {
    transactions: 100,
    date: '2019-01-15T12:00:00.000Z'
  },
  {
    transactions: 87,
    date: '2019-01-15T13:00:00.000Z'
  },
  {
    transactions: 133,
    date: '2019-01-15T14:00:00.000Z'
  },
  {
    transactions: 106,
    date: '2019-01-15T15:00:00.000Z'
  },
  {
    transactions: 96,
    date: '2019-01-15T16:00:00.000Z'
  },
  {
    transactions: 87,
    date: '2019-01-15T17:00:00.000Z'
  },
  {
    transactions: 85,
    date: '2019-01-15T18:00:00.000Z'
  },
  {
    transactions: 76,
    date: '2019-01-15T19:00:00.000Z'
  },
  {
    transactions: 75,
    date: '2019-01-15T20:00:00.000Z'
  },
  {
    transactions: 86,
    date: '2019-01-15T21:00:00.000Z'
  },
  {
    transactions: 60,
    date: '2019-01-15T22:00:00.000Z'
  },
  {
    transactions: 43,
    date: '2019-01-15T23:00:00.000Z'
  },
  {
    transactions: 30,
    date: '2019-01-16T00:00:00.000Z'
  },
  {
    transactions: 38,
    date: '2019-01-16T01:00:00.000Z'
  },
  {
    transactions: 24,
    date: '2019-01-16T02:00:00.000Z'
  },
  {
    transactions: 18,
    date: '2019-01-16T03:00:00.000Z'
  },
  {
    transactions: 25,
    date: '2019-01-16T04:00:00.000Z'
  },
  {
    transactions: 28,
    date: '2019-01-16T05:00:00.000Z'
  },
  {
    transactions: 22,
    date: '2019-01-16T06:00:00.000Z'
  },
  {
    transactions: 47,
    date: '2019-01-16T07:00:00.000Z'
  },
  {
    transactions: 81,
    date: '2019-01-16T08:00:00.000Z'
  },
  {
    transactions: 126,
    date: '2019-01-16T09:00:00.000Z'
  },
  {
    transactions: 102,
    date: '2019-01-16T10:00:00.000Z'
  },
  {
    transactions: 111,
    date: '2019-01-16T11:00:00.000Z'
  },
  {
    transactions: 98,
    date: '2019-01-16T12:00:00.000Z'
  },
  {
    transactions: 116,
    date: '2019-01-16T13:00:00.000Z'
  },
  {
    transactions: 132,
    date: '2019-01-16T14:00:00.000Z'
  },
  {
    transactions: 181,
    date: '2019-01-16T15:00:00.000Z'
  },
  {
    transactions: 111,
    date: '2019-01-16T16:00:00.000Z'
  },
  {
    transactions: 77,
    date: '2019-01-16T17:00:00.000Z'
  },
  {
    transactions: 75,
    date: '2019-01-16T18:00:00.000Z'
  },
  {
    transactions: 73,
    date: '2019-01-16T19:00:00.000Z'
  },
  {
    transactions: 78,
    date: '2019-01-16T20:00:00.000Z'
  },
  {
    transactions: 67,
    date: '2019-01-16T21:00:00.000Z'
  },
  {
    transactions: 64,
    date: '2019-01-16T22:00:00.000Z'
  },
  {
    transactions: 43,
    date: '2019-01-16T23:00:00.000Z'
  },
  {
    transactions: 40,
    date: '2019-01-17T00:00:00.000Z'
  },
  {
    transactions: 29,
    date: '2019-01-17T01:00:00.000Z'
  },
  {
    transactions: 27,
    date: '2019-01-17T02:00:00.000Z'
  },
  {
    transactions: 21,
    date: '2019-01-17T03:00:00.000Z'
  },
  {
    transactions: 33,
    date: '2019-01-17T04:00:00.000Z'
  },
  {
    transactions: 25,
    date: '2019-01-17T05:00:00.000Z'
  },
  {
    transactions: 18,
    date: '2019-01-17T06:00:00.000Z'
  },
  {
    transactions: 36,
    date: '2019-01-17T07:00:00.000Z'
  },
  {
    transactions: 91,
    date: '2019-01-17T08:00:00.000Z'
  },
  {
    transactions: 94,
    date: '2019-01-17T09:00:00.000Z'
  },
  {
    transactions: 116,
    date: '2019-01-17T10:00:00.000Z'
  },
  {
    transactions: 110,
    date: '2019-01-17T11:00:00.000Z'
  },
  {
    transactions: 104,
    date: '2019-01-17T12:00:00.000Z'
  },
  {
    transactions: 196,
    date: '2019-01-17T13:00:00.000Z'
  },
  {
    transactions: 122,
    date: '2019-01-17T14:00:00.000Z'
  },
  {
    transactions: 192,
    date: '2019-01-17T15:00:00.000Z'
  },
  {
    transactions: 152,
    date: '2019-01-17T16:00:00.000Z'
  },
  {
    transactions: 99,
    date: '2019-01-17T17:00:00.000Z'
  },
  {
    transactions: 79,
    date: '2019-01-17T18:00:00.000Z'
  },
  {
    transactions: 92,
    date: '2019-01-17T19:00:00.000Z'
  },
  {
    transactions: 118,
    date: '2019-01-17T20:00:00.000Z'
  },
  {
    transactions: 91,
    date: '2019-01-17T21:00:00.000Z'
  },
  {
    transactions: 54,
    date: '2019-01-17T22:00:00.000Z'
  },
  {
    transactions: 37,
    date: '2019-01-17T23:00:00.000Z'
  },
  {
    transactions: 31,
    date: '2019-01-18T00:00:00.000Z'
  },
  {
    transactions: 23,
    date: '2019-01-18T01:00:00.000Z'
  },
  {
    transactions: 20,
    date: '2019-01-18T02:00:00.000Z'
  },
  {
    transactions: 25,
    date: '2019-01-18T03:00:00.000Z'
  },
  {
    transactions: 18,
    date: '2019-01-18T04:00:00.000Z'
  },
  {
    transactions: 23,
    date: '2019-01-18T05:00:00.000Z'
  },
  {
    transactions: 27,
    date: '2019-01-18T06:00:00.000Z'
  },
  {
    transactions: 45,
    date: '2019-01-18T07:00:00.000Z'
  },
  {
    transactions: 89,
    date: '2019-01-18T08:00:00.000Z'
  },
  {
    transactions: 119,
    date: '2019-01-18T09:00:00.000Z'
  },
  {
    transactions: 128,
    date: '2019-01-18T10:00:00.000Z'
  },
  {
    transactions: 128,
    date: '2019-01-18T11:00:00.000Z'
  },
  {
    transactions: 108,
    date: '2019-01-18T12:00:00.000Z'
  },
  {
    transactions: 122,
    date: '2019-01-18T13:00:00.000Z'
  },
  {
    transactions: 135,
    date: '2019-01-18T14:00:00.000Z'
  },
  {
    transactions: 171,
    date: '2019-01-18T15:00:00.000Z'
  },
  {
    transactions: 104,
    date: '2019-01-18T16:00:00.000Z'
  },
  {
    transactions: 81,
    date: '2019-01-18T17:00:00.000Z'
  },
  {
    transactions: 67,
    date: '2019-01-18T18:00:00.000Z'
  },
  {
    transactions: 79,
    date: '2019-01-18T19:00:00.000Z'
  },
  {
    transactions: 66,
    date: '2019-01-18T20:00:00.000Z'
  },
  {
    transactions: 55,
    date: '2019-01-18T21:00:00.000Z'
  },
  {
    transactions: 53,
    date: '2019-01-18T22:00:00.000Z'
  },
  {
    transactions: 33,
    date: '2019-01-18T23:00:00.000Z'
  },
  {
    transactions: 29,
    date: '2019-01-19T00:00:00.000Z'
  },
  {
    transactions: 17,
    date: '2019-01-19T01:00:00.000Z'
  },
  {
    transactions: 17,
    date: '2019-01-19T02:00:00.000Z'
  },
  {
    transactions: 18,
    date: '2019-01-19T03:00:00.000Z'
  },
  {
    transactions: 8,
    date: '2019-01-19T04:00:00.000Z'
  },
  {
    transactions: 16,
    date: '2019-01-19T05:00:00.000Z'
  },
  {
    transactions: 6,
    date: '2019-01-19T06:00:00.000Z'
  },
  {
    transactions: 17,
    date: '2019-01-19T07:00:00.000Z'
  },
  {
    transactions: 15,
    date: '2019-01-19T08:00:00.000Z'
  },
  {
    transactions: 23,
    date: '2019-01-19T09:00:00.000Z'
  },
  {
    transactions: 19,
    date: '2019-01-19T10:00:00.000Z'
  },
  {
    transactions: 48,
    date: '2019-01-19T11:00:00.000Z'
  },
  {
    transactions: 20,
    date: '2019-01-19T12:00:00.000Z'
  },
  {
    transactions: 31,
    date: '2019-01-19T13:00:00.000Z'
  },
  {
    transactions: 18,
    date: '2019-01-19T14:00:00.000Z'
  },
  {
    transactions: 22,
    date: '2019-01-19T15:00:00.000Z'
  },
  {
    transactions: 25,
    date: '2019-01-19T16:00:00.000Z'
  },
  {
    transactions: 29,
    date: '2019-01-19T17:00:00.000Z'
  },
  {
    transactions: 21,
    date: '2019-01-19T18:00:00.000Z'
  },
  {
    transactions: 20,
    date: '2019-01-19T19:00:00.000Z'
  },
  {
    transactions: 27,
    date: '2019-01-19T20:00:00.000Z'
  },
  {
    transactions: 19,
    date: '2019-01-19T21:00:00.000Z'
  },
  {
    transactions: 22,
    date: '2019-01-19T22:00:00.000Z'
  },
  {
    transactions: 6,
    date: '2019-01-19T23:00:00.000Z'
  },
  {
    transactions: 8,
    date: '2019-01-20T00:00:00.000Z'
  },
  {
    transactions: 10,
    date: '2019-01-20T01:00:00.000Z'
  },
  {
    transactions: 3,
    date: '2019-01-20T02:00:00.000Z'
  },
  {
    transactions: 4,
    date: '2019-01-20T03:00:00.000Z'
  },
  {
    transactions: 12,
    date: '2019-01-20T04:00:00.000Z'
  },
  {
    transactions: 4,
    date: '2019-01-20T05:00:00.000Z'
  },
  {
    transactions: 6,
    date: '2019-01-20T06:00:00.000Z'
  },
  {
    transactions: 12,
    date: '2019-01-20T07:00:00.000Z'
  },
  {
    transactions: 16,
    date: '2019-01-20T08:00:00.000Z'
  },
  {
    transactions: 10,
    date: '2019-01-20T09:00:00.000Z'
  },
  {
    transactions: 12,
    date: '2019-01-20T10:00:00.000Z'
  },
  {
    transactions: 18,
    date: '2019-01-20T11:00:00.000Z'
  },
  {
    transactions: 26,
    date: '2019-01-20T12:00:00.000Z'
  },
  {
    transactions: 21,
    date: '2019-01-20T13:00:00.000Z'
  },
  {
    transactions: 17,
    date: '2019-01-20T14:00:00.000Z'
  },
  {
    transactions: 33,
    date: '2019-01-20T15:00:00.000Z'
  },
  {
    transactions: 32,
    date: '2019-01-20T16:00:00.000Z'
  },
  {
    transactions: 25,
    date: '2019-01-20T17:00:00.000Z'
  },
  {
    transactions: 29,
    date: '2019-01-20T18:00:00.000Z'
  },
  {
    transactions: 29,
    date: '2019-01-20T19:00:00.000Z'
  },
  {
    transactions: 31,
    date: '2019-01-20T20:00:00.000Z'
  },
  {
    transactions: 31,
    date: '2019-01-20T21:00:00.000Z'
  },
  {
    transactions: 17,
    date: '2019-01-20T22:00:00.000Z'
  },
  {
    transactions: 12,
    date: '2019-01-20T23:00:00.000Z'
  },
  {
    transactions: 19,
    date: '2019-01-21T00:00:00.000Z'
  },
  {
    transactions: 17,
    date: '2019-01-21T01:00:00.000Z'
  },
  {
    transactions: 26,
    date: '2019-01-21T02:00:00.000Z'
  },
  {
    transactions: 10,
    date: '2019-01-21T03:00:00.000Z'
  },
  {
    transactions: 13,
    date: '2019-01-21T04:00:00.000Z'
  },
  {
    transactions: 22,
    date: '2019-01-21T05:00:00.000Z'
  },
  {
    transactions: 29,
    date: '2019-01-21T06:00:00.000Z'
  },
  {
    transactions: 43,
    date: '2019-01-21T07:00:00.000Z'
  },
  {
    transactions: 82,
    date: '2019-01-21T08:00:00.000Z'
  },
  {
    transactions: 118,
    date: '2019-01-21T09:00:00.000Z'
  },
  {
    transactions: 144,
    date: '2019-01-21T10:00:00.000Z'
  },
  {
    transactions: 123,
    date: '2019-01-21T11:00:00.000Z'
  },
  {
    transactions: 134,
    date: '2019-01-21T12:00:00.000Z'
  },
  {
    transactions: 139,
    date: '2019-01-21T13:00:00.000Z'
  },
  {
    transactions: 153,
    date: '2019-01-21T14:00:00.000Z'
  },
  {
    transactions: 176,
    date: '2019-01-21T15:00:00.000Z'
  },
  {
    transactions: 136,
    date: '2019-01-21T16:00:00.000Z'
  },
  {
    transactions: 89,
    date: '2019-01-21T17:00:00.000Z'
  },
  {
    transactions: 68,
    date: '2019-01-21T18:00:00.000Z'
  },
  {
    transactions: 75,
    date: '2019-01-21T19:00:00.000Z'
  },
  {
    transactions: 79,
    date: '2019-01-21T20:00:00.000Z'
  },
  {
    transactions: 74,
    date: '2019-01-21T21:00:00.000Z'
  },
  {
    transactions: 60,
    date: '2019-01-21T22:00:00.000Z'
  },
  {
    transactions: 33,
    date: '2019-01-21T23:00:00.000Z'
  },
  {
    transactions: 38,
    date: '2019-01-22T00:00:00.000Z'
  },
  {
    transactions: 23,
    date: '2019-01-22T01:00:00.000Z'
  },
  {
    transactions: 26,
    date: '2019-01-22T02:00:00.000Z'
  },
  {
    transactions: 26,
    date: '2019-01-22T03:00:00.000Z'
  },
  {
    transactions: 25,
    date: '2019-01-22T04:00:00.000Z'
  },
  {
    transactions: 23,
    date: '2019-01-22T05:00:00.000Z'
  },
  {
    transactions: 22,
    date: '2019-01-22T06:00:00.000Z'
  },
  {
    transactions: 52,
    date: '2019-01-22T07:00:00.000Z'
  },
  {
    transactions: 76,
    date: '2019-01-22T08:00:00.000Z'
  },
  {
    transactions: 115,
    date: '2019-01-22T09:00:00.000Z'
  },
  {
    transactions: 127,
    date: '2019-01-22T10:00:00.000Z'
  },
  {
    transactions: 131,
    date: '2019-01-22T11:00:00.000Z'
  },
  {
    transactions: 147,
    date: '2019-01-22T12:00:00.000Z'
  },
  {
    transactions: 153,
    date: '2019-01-22T13:00:00.000Z'
  },
  {
    transactions: 114,
    date: '2019-01-22T14:00:00.000Z'
  },
  {
    transactions: 137,
    date: '2019-01-22T15:00:00.000Z'
  },
  {
    transactions: 143,
    date: '2019-01-22T16:00:00.000Z'
  },
  {
    transactions: 147,
    date: '2019-01-22T17:00:00.000Z'
  },
  {
    transactions: 93,
    date: '2019-01-22T18:00:00.000Z'
  },
  {
    transactions: 81,
    date: '2019-01-22T19:00:00.000Z'
  },
  {
    transactions: 78,
    date: '2019-01-22T20:00:00.000Z'
  },
  {
    transactions: 64,
    date: '2019-01-22T21:00:00.000Z'
  },
  {
    transactions: 55,
    date: '2019-01-22T22:00:00.000Z'
  },
  {
    transactions: 44,
    date: '2019-01-22T23:00:00.000Z'
  },
  {
    transactions: 39,
    date: '2019-01-23T00:00:00.000Z'
  },
  {
    transactions: 35,
    date: '2019-01-23T01:00:00.000Z'
  },
  {
    transactions: 13,
    date: '2019-01-23T02:00:00.000Z'
  },
  {
    transactions: 21,
    date: '2019-01-23T03:00:00.000Z'
  },
  {
    transactions: 15,
    date: '2019-01-23T04:00:00.000Z'
  },
  {
    transactions: 24,
    date: '2019-01-23T05:00:00.000Z'
  },
  {
    transactions: 30,
    date: '2019-01-23T06:00:00.000Z'
  },
  {
    transactions: 43,
    date: '2019-01-23T07:00:00.000Z'
  },
  {
    transactions: 107,
    date: '2019-01-23T08:00:00.000Z'
  },
  {
    transactions: 154,
    date: '2019-01-23T09:00:00.000Z'
  },
  {
    transactions: 136,
    date: '2019-01-23T10:00:00.000Z'
  },
  {
    transactions: 122,
    date: '2019-01-23T11:00:00.000Z'
  },
  {
    transactions: 140,
    date: '2019-01-23T12:00:00.000Z'
  },
  {
    transactions: 146,
    date: '2019-01-23T13:00:00.000Z'
  },
  {
    transactions: 146,
    date: '2019-01-23T14:00:00.000Z'
  },
  {
    transactions: 140,
    date: '2019-01-23T15:00:00.000Z'
  },
  {
    transactions: 152,
    date: '2019-01-23T16:00:00.000Z'
  },
  {
    transactions: 104,
    date: '2019-01-23T17:00:00.000Z'
  },
  {
    transactions: 97,
    date: '2019-01-23T18:00:00.000Z'
  },
  {
    transactions: 107,
    date: '2019-01-23T19:00:00.000Z'
  },
  {
    transactions: 78,
    date: '2019-01-23T20:00:00.000Z'
  },
  {
    transactions: 56,
    date: '2019-01-23T21:00:00.000Z'
  },
  {
    transactions: 67,
    date: '2019-01-23T22:00:00.000Z'
  },
  {
    transactions: 56,
    date: '2019-01-23T23:00:00.000Z'
  },
  {
    transactions: 29,
    date: '2019-01-24T00:00:00.000Z'
  },
  {
    transactions: 38,
    date: '2019-01-24T01:00:00.000Z'
  },
  {
    transactions: 37,
    date: '2019-01-24T02:00:00.000Z'
  },
  {
    transactions: 39,
    date: '2019-01-24T03:00:00.000Z'
  },
  {
    transactions: 31,
    date: '2019-01-24T04:00:00.000Z'
  },
  {
    transactions: 20,
    date: '2019-01-24T05:00:00.000Z'
  },
  {
    transactions: 14,
    date: '2019-01-24T06:00:00.000Z'
  },
  {
    transactions: 49,
    date: '2019-01-24T07:00:00.000Z'
  },
  {
    transactions: 126,
    date: '2019-01-24T08:00:00.000Z'
  },
  {
    transactions: 120,
    date: '2019-01-24T09:00:00.000Z'
  },
  {
    transactions: 170,
    date: '2019-01-24T10:00:00.000Z'
  },
  {
    transactions: 149,
    date: '2019-01-24T11:00:00.000Z'
  },
  {
    transactions: 124,
    date: '2019-01-24T12:00:00.000Z'
  },
  {
    transactions: 137,
    date: '2019-01-24T13:00:00.000Z'
  },
  {
    transactions: 183,
    date: '2019-01-24T14:00:00.000Z'
  },
  {
    transactions: 133,
    date: '2019-01-24T15:00:00.000Z'
  },
  {
    transactions: 114,
    date: '2019-01-24T16:00:00.000Z'
  },
  {
    transactions: 98,
    date: '2019-01-24T17:00:00.000Z'
  },
  {
    transactions: 128,
    date: '2019-01-24T18:00:00.000Z'
  },
  {
    transactions: 90,
    date: '2019-01-24T19:00:00.000Z'
  },
  {
    transactions: 11,
    date: '2019-01-24T20:00:00.000Z'
  },
  {
    transactions: 7,
    date: '2019-01-24T21:00:00.000Z'
  },
  {
    transactions: 96,
    date: '2019-01-24T22:00:00.000Z'
  },
  {
    transactions: 77,
    date: '2019-01-24T23:00:00.000Z'
  },
  {
    transactions: 10,
    date: '2019-01-25T00:00:00.000Z'
  },
  {
    transactions: 147,
    date: '2019-01-25T01:00:00.000Z'
  },
  {
    transactions: 34,
    date: '2019-01-25T02:00:00.000Z'
  },
  {
    transactions: 27,
    date: '2019-01-25T03:00:00.000Z'
  },
  {
    transactions: 25,
    date: '2019-01-25T04:00:00.000Z'
  },
  {
    transactions: 37,
    date: '2019-01-25T05:00:00.000Z'
  },
  {
    transactions: 28,
    date: '2019-01-25T06:00:00.000Z'
  },
  {
    transactions: 57,
    date: '2019-01-25T07:00:00.000Z'
  },
  {
    transactions: 69,
    date: '2019-01-25T08:00:00.000Z'
  },
  {
    transactions: 154,
    date: '2019-01-25T09:00:00.000Z'
  },
  {
    transactions: 117,
    date: '2019-01-25T10:00:00.000Z'
  },
  {
    transactions: 105,
    date: '2019-01-25T11:00:00.000Z'
  },
  {
    transactions: 134,
    date: '2019-01-25T12:00:00.000Z'
  },
  {
    transactions: 140,
    date: '2019-01-25T13:00:00.000Z'
  },
  {
    transactions: 141,
    date: '2019-01-25T14:00:00.000Z'
  },
  {
    transactions: 145,
    date: '2019-01-25T15:00:00.000Z'
  },
  {
    transactions: 131,
    date: '2019-01-25T16:00:00.000Z'
  },
  {
    transactions: 83,
    date: '2019-01-25T17:00:00.000Z'
  },
  {
    transactions: 83,
    date: '2019-01-25T18:00:00.000Z'
  },
  {
    transactions: 71,
    date: '2019-01-25T19:00:00.000Z'
  },
  {
    transactions: 53,
    date: '2019-01-25T20:00:00.000Z'
  },
  {
    transactions: 54,
    date: '2019-01-25T21:00:00.000Z'
  },
  {
    transactions: 44,
    date: '2019-01-25T22:00:00.000Z'
  },
  {
    transactions: 38,
    date: '2019-01-25T23:00:00.000Z'
  },
  {
    transactions: 19,
    date: '2019-01-26T00:00:00.000Z'
  },
  {
    transactions: 28,
    date: '2019-01-26T01:00:00.000Z'
  },
  {
    transactions: 30,
    date: '2019-01-26T02:00:00.000Z'
  },
  {
    transactions: 15,
    date: '2019-01-26T03:00:00.000Z'
  },
  {
    transactions: 14,
    date: '2019-01-26T04:00:00.000Z'
  },
  {
    transactions: 10,
    date: '2019-01-26T05:00:00.000Z'
  },
  {
    transactions: 11,
    date: '2019-01-26T06:00:00.000Z'
  },
  {
    transactions: 15,
    date: '2019-01-26T07:00:00.000Z'
  },
  {
    transactions: 28,
    date: '2019-01-26T08:00:00.000Z'
  },
  {
    transactions: 14,
    date: '2019-01-26T09:00:00.000Z'
  },
  {
    transactions: 24,
    date: '2019-01-26T10:00:00.000Z'
  },
  {
    transactions: 21,
    date: '2019-01-26T11:00:00.000Z'
  },
  {
    transactions: 20,
    date: '2019-01-26T12:00:00.000Z'
  },
  {
    transactions: 31,
    date: '2019-01-26T13:00:00.000Z'
  },
  {
    transactions: 13,
    date: '2019-01-26T14:00:00.000Z'
  },
  {
    transactions: 26,
    date: '2019-01-26T15:00:00.000Z'
  },
  {
    transactions: 29,
    date: '2019-01-26T16:00:00.000Z'
  },
  {
    transactions: 21,
    date: '2019-01-26T17:00:00.000Z'
  },
  {
    transactions: 26,
    date: '2019-01-26T18:00:00.000Z'
  },
  {
    transactions: 22,
    date: '2019-01-26T19:00:00.000Z'
  },
  {
    transactions: 27,
    date: '2019-01-26T20:00:00.000Z'
  },
  {
    transactions: 33,
    date: '2019-01-26T21:00:00.000Z'
  },
  {
    transactions: 17,
    date: '2019-01-26T22:00:00.000Z'
  },
  {
    transactions: 19,
    date: '2019-01-26T23:00:00.000Z'
  },
  {
    transactions: 6,
    date: '2019-01-27T00:00:00.000Z'
  },
  {
    transactions: 8,
    date: '2019-01-27T01:00:00.000Z'
  },
  {
    transactions: 9,
    date: '2019-01-27T02:00:00.000Z'
  },
  {
    transactions: 2,
    date: '2019-01-27T03:00:00.000Z'
  },
  {
    transactions: 7,
    date: '2019-01-27T04:00:00.000Z'
  },
  {
    transactions: 4,
    date: '2019-01-27T05:00:00.000Z'
  },
  {
    transactions: 7,
    date: '2019-01-27T06:00:00.000Z'
  },
  {
    transactions: 5,
    date: '2019-01-27T07:00:00.000Z'
  },
  {
    transactions: 7,
    date: '2019-01-27T08:00:00.000Z'
  },
  {
    transactions: 24,
    date: '2019-01-27T09:00:00.000Z'
  },
  {
    transactions: 10,
    date: '2019-01-27T10:00:00.000Z'
  },
  {
    transactions: 11,
    date: '2019-01-27T11:00:00.000Z'
  },
  {
    transactions: 17,
    date: '2019-01-27T12:00:00.000Z'
  },
  {
    transactions: 24,
    date: '2019-01-27T13:00:00.000Z'
  },
  {
    transactions: 20,
    date: '2019-01-27T14:00:00.000Z'
  },
  {
    transactions: 15,
    date: '2019-01-27T15:00:00.000Z'
  },
  {
    transactions: 42,
    date: '2019-01-27T16:00:00.000Z'
  },
  {
    transactions: 39,
    date: '2019-01-27T17:00:00.000Z'
  },
  {
    transactions: 26,
    date: '2019-01-27T18:00:00.000Z'
  },
  {
    transactions: 31,
    date: '2019-01-27T19:00:00.000Z'
  },
  {
    transactions: 24,
    date: '2019-01-27T20:00:00.000Z'
  },
  {
    transactions: 22,
    date: '2019-01-27T21:00:00.000Z'
  },
  {
    transactions: 27,
    date: '2019-01-27T22:00:00.000Z'
  },
  {
    transactions: 14,
    date: '2019-01-27T23:00:00.000Z'
  },
  {
    transactions: 13,
    date: '2019-01-28T00:00:00.000Z'
  },
  {
    transactions: 15,
    date: '2019-01-28T01:00:00.000Z'
  },
  {
    transactions: 26,
    date: '2019-01-28T02:00:00.000Z'
  },
  {
    transactions: 22,
    date: '2019-01-28T03:00:00.000Z'
  },
  {
    transactions: 16,
    date: '2019-01-28T04:00:00.000Z'
  },
  {
    transactions: 23,
    date: '2019-01-28T05:00:00.000Z'
  },
  {
    transactions: 21,
    date: '2019-01-28T06:00:00.000Z'
  },
  {
    transactions: 44,
    date: '2019-01-28T07:00:00.000Z'
  },
  {
    transactions: 104,
    date: '2019-01-28T08:00:00.000Z'
  },
  {
    transactions: 122,
    date: '2019-01-28T09:00:00.000Z'
  },
  {
    transactions: 206,
    date: '2019-01-28T10:00:00.000Z'
  },
  {
    transactions: 119,
    date: '2019-01-28T11:00:00.000Z'
  },
  {
    transactions: 190,
    date: '2019-01-28T12:00:00.000Z'
  },
  {
    transactions: 173,
    date: '2019-01-28T13:00:00.000Z'
  },
  {
    transactions: 173,
    date: '2019-01-28T14:00:00.000Z'
  },
  {
    transactions: 177,
    date: '2019-01-28T15:00:00.000Z'
  },
  {
    transactions: 129,
    date: '2019-01-28T16:00:00.000Z'
  },
  {
    transactions: 119,
    date: '2019-01-28T17:00:00.000Z'
  },
  {
    transactions: 98,
    date: '2019-01-28T18:00:00.000Z'
  },
  {
    transactions: 131,
    date: '2019-01-28T19:00:00.000Z'
  },
  {
    transactions: 140,
    date: '2019-01-28T20:00:00.000Z'
  },
  {
    transactions: 81,
    date: '2019-01-28T21:00:00.000Z'
  },
  {
    transactions: 65,
    date: '2019-01-28T22:00:00.000Z'
  },
  {
    transactions: 38,
    date: '2019-01-28T23:00:00.000Z'
  },
  {
    transactions: 35,
    date: '2019-01-29T00:00:00.000Z'
  },
  {
    transactions: 35,
    date: '2019-01-29T01:00:00.000Z'
  },
  {
    transactions: 29,
    date: '2019-01-29T02:00:00.000Z'
  },
  {
    transactions: 28,
    date: '2019-01-29T03:00:00.000Z'
  },
  {
    transactions: 31,
    date: '2019-01-29T04:00:00.000Z'
  },
  {
    transactions: 23,
    date: '2019-01-29T05:00:00.000Z'
  },
  {
    transactions: 24,
    date: '2019-01-29T06:00:00.000Z'
  },
  {
    transactions: 60,
    date: '2019-01-29T07:00:00.000Z'
  },
  {
    transactions: 87,
    date: '2019-01-29T08:00:00.000Z'
  },
  {
    transactions: 134,
    date: '2019-01-29T09:00:00.000Z'
  },
  {
    transactions: 102,
    date: '2019-01-29T10:00:00.000Z'
  },
  {
    transactions: 124,
    date: '2019-01-29T11:00:00.000Z'
  },
  {
    transactions: 168,
    date: '2019-01-29T12:00:00.000Z'
  },
  {
    transactions: 148,
    date: '2019-01-29T13:00:00.000Z'
  },
  {
    transactions: 212,
    date: '2019-01-29T14:00:00.000Z'
  },
  {
    transactions: 194,
    date: '2019-01-29T15:00:00.000Z'
  },
  {
    transactions: 154,
    date: '2019-01-29T16:00:00.000Z'
  },
  {
    transactions: 119,
    date: '2019-01-29T17:00:00.000Z'
  },
  {
    transactions: 96,
    date: '2019-01-29T18:00:00.000Z'
  },
  {
    transactions: 94,
    date: '2019-01-29T19:00:00.000Z'
  },
  {
    transactions: 95,
    date: '2019-01-29T20:00:00.000Z'
  },
  {
    transactions: 80,
    date: '2019-01-29T21:00:00.000Z'
  },
  {
    transactions: 70,
    date: '2019-01-29T22:00:00.000Z'
  },
  {
    transactions: 65,
    date: '2019-01-29T23:00:00.000Z'
  },
  {
    transactions: 30,
    date: '2019-01-30T00:00:00.000Z'
  },
  {
    transactions: 41,
    date: '2019-01-30T01:00:00.000Z'
  },
  {
    transactions: 43,
    date: '2019-01-30T02:00:00.000Z'
  },
  {
    transactions: 29,
    date: '2019-01-30T03:00:00.000Z'
  },
  {
    transactions: 24,
    date: '2019-01-30T04:00:00.000Z'
  },
  {
    transactions: 26,
    date: '2019-01-30T05:00:00.000Z'
  },
  {
    transactions: 21,
    date: '2019-01-30T06:00:00.000Z'
  },
  {
    transactions: 57,
    date: '2019-01-30T07:00:00.000Z'
  },
  {
    transactions: 102,
    date: '2019-01-30T08:00:00.000Z'
  },
  {
    transactions: 121,
    date: '2019-01-30T09:00:00.000Z'
  },
  {
    transactions: 163,
    date: '2019-01-30T10:00:00.000Z'
  },
  {
    transactions: 126,
    date: '2019-01-30T11:00:00.000Z'
  },
  {
    transactions: 104,
    date: '2019-01-30T12:00:00.000Z'
  },
  {
    transactions: 146,
    date: '2019-01-30T13:00:00.000Z'
  },
  {
    transactions: 160,
    date: '2019-01-30T14:00:00.000Z'
  },
  {
    transactions: 150,
    date: '2019-01-30T15:00:00.000Z'
  },
  {
    transactions: 138,
    date: '2019-01-30T16:00:00.000Z'
  },
  {
    transactions: 96,
    date: '2019-01-30T17:00:00.000Z'
  },
  {
    transactions: 99,
    date: '2019-01-30T18:00:00.000Z'
  },
  {
    transactions: 82,
    date: '2019-01-30T19:00:00.000Z'
  },
  {
    transactions: 72,
    date: '2019-01-30T20:00:00.000Z'
  },
  {
    transactions: 63,
    date: '2019-01-30T21:00:00.000Z'
  },
  {
    transactions: 61,
    date: '2019-01-30T22:00:00.000Z'
  },
  {
    transactions: 51,
    date: '2019-01-30T23:00:00.000Z'
  }
];

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  constructor(private _http: HttpClient, @Inject(LTO_STATS_HOST) private _host: string) {}

  nodeStatistics(): Observable<Stats[]> {
    return of(DUMMY).pipe(map(stats => Stats.fromJSON(stats)));
  }

  transactions(config: TransactionsStatsConfig) {
    const requestConfig = {
      type: TransactionType.ANCHOR,
      granularity: 'day',
      ...config
    };
    return this._http
      .get<LTO.StatsApi.Transaction[]>(`${this._host}/transactions`, {
        params: requestConfig as any
      })
      .pipe(map(stats => Stats.fromJSON(stats)));
  }
}
