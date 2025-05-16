export const navData = [
  {
    routerLink: '/news',
    label: 'Aktuelles',
  },
  {
    dropdown: [
      {
        routerLink: '/dnagb/vereinsstrukturen',
        label: 'Vereinsstruktur',
      },
      {
        routerLink: '/dnagb/mitglied-werden',
        label: 'Mitglied werden',
      },
    ],
    label: 'Der DNagB',
  },
  {
    routerLink: '/naginata-gruppen',
    label: 'Naginata-Gruppen',
  },
  {
    dropdown: [
      {
        routerLink: '/naginata/was-ist-naginata',
        label: 'Was ist Naginata?',
      },
      {
        routerLink: '/naginata/ausruestung',
        label: 'Ausrüstung',
      },
      {
        routerLink: '/naginata/kampfsport',
        label: 'Der Kampfsport',
      },
      {
        routerLink: '/naginata/geschichte',
        label: 'Geschichte',
      },
    ],
    label: 'Naginata',
  },
  {
    dropdown: [
      {
        routerLink: '/info/pruefung',
        label: 'Prüfung',
      },
      {
        routerLink: '/info/nuetzliches',
        label: 'Nützliches',
      },
      {
        routerLink: '/info/veranstaltung-planen',
        label: 'Eine Veranstaltung planen',
      },
    ],
    label: 'Infos für Aktive',
  },
  {
    routerLink: '/download',
    label: 'Formulare & Dokumente',
  },
];
