import { Component, OnInit } from '@angular/core';

interface NavigationSection {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'wallet-logged-in-wrapper',
  templateUrl: './logged-in-wrapper.component.html',
  styleUrls: ['./logged-in-wrapper.component.scss']
})
export class LoggedInWrapperComponent implements OnInit {
  navigationSections: NavigationSection[] = [
    {
      label: 'Transfers',
      route: '/transfers',
      icon: 'swap_horiz'
    },
    {
      label: 'Anchors',
      route: '/anchors',
      icon: 'alternate_email'
    },
    {
      label: 'Leasing',
      route: '/leasing',
      icon: 'watch_later'
    },
    {
      label: 'Bridge',
      route: '/bridge',
      icon: 'settings_ethernet'
    },
    {
      label: 'Waves Token Swap',
      route: '/swap',
      icon: 'replay'
    },
    {
      label: 'Settings',
      route: '/settings',
      icon: 'settings'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
