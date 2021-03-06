import { colors } from '@material-ui/core';

export const faq = {
  account: {
    title: 'Account',
    subtitle: 'Let’s try to fix your account issues.',
    icon: 'fas fa-user',
    color: colors.amber,
    items: [
      {
        title: 'Find account number',
        updated: '1 week ago',
      },
      {
        title: 'ATMs and ATM fees',
        updated: 'a day ago',
      },
      {
        title: 'Business retirement services',
        updated: '2 month ago',
      },
      {
        title: 'Planning for major life events',
        updated: '4 days ago',
      },
    ],
  },
  billing: {
    title: 'Billing',
    subtitle: 'Let’s try to fix your billing issues.',
    icon: 'fas fa-dollar-sign',
    color: colors.indigo,
    items: [
      {
        title: 'Business online banking and services',
        updated: '1 week ago',
      },
      {
        title: 'Business loans, lines & leasing',
        updated: 'a day ago',
      },
      {
        title: 'Mortgage basics',
        updated: '2 month ago',
      },
      {
        title: 'Credit cards',
        updated: '4 days ago',
      },
    ],
  },
  organizations: {
    title: 'Organizations',
    subtitle: 'Let’s try to fix your organizational issues.',
    icon: 'fas fa-users',
    color: colors.deepPurple,
    items: [
      {
        title: 'Redeem rewards points',
        updated: '1 week ago',
      },
      {
        title: 'Growing a business',
        updated: 'a day ago',
      },
      {
        title: 'Accessible banking',
        updated: '2 month ago',
      },
      {
        title: 'Mobile banking',
        updated: '4 days ago',
      },
    ],
  },
  customizing: {
    title: 'Customizing',
    subtitle: 'Let’s try to fix your customizing issues.',
    icon: 'fas fa-puzzle-piece',
    color: colors.blue,
    items: [
      {
        title: 'Planning for college',
        updated: '1 week ago',
      },
      {
        title: 'Learn about credit',
        updated: 'a day ago',
      },
      {
        title: 'Budgeting & saving',
        updated: '2 month ago',
      },
      {
        title: 'Transferring funds',
        updated: '4 days ago',
      },
    ],
  },
};

export const events = [
  {
    cover: {
      src: '/images/photos/expo-gallery/gallery1.jpg',
      srcSet: '/images/photos/expo-gallery/gallery1@2x.jpg 2x',
    },
    title: 'Success stories working on Coworking Space',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    place: '07 Mar 2020',
    time: '10:00',
  },
  {
    cover: {
      src: '/images/photos/expo-gallery/gallery2.jpg',
      srcSet: '/images/photos/expo-gallery/gallery2@2x.jpg 2x',
    },
    title: 'Sulap Sampah Menjadi berkah',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    place: '20 Mar 2020',
    time: '13:00',
  }
];
