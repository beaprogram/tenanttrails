// Mock apartment data for the TenantTrails dashboard.
// In a later lab this will come from a real backend/database.

export const apartments = [
  {
    id: 1,
    name: 'The Marlstone',
    address: '5540 Spring Garden Rd',
    neighbourhood: 'Spring Garden',
    rating: 5.0,
    reviews: 1,
    tags: ['No AI summary yet'],
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
  },
  {
    id: 2,
    name: 'Park Victoria',
    address: '1496 Carlton St',
    neighbourhood: 'South End',
    rating: 4.5,
    reviews: 2,
    tags: ['Well maintained', 'Quiet', 'Expensive'],
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  },
  {
    id: 3,
    name: 'Le Marchant Towers',
    address: '1585 Le Marchant St',
    neighbourhood: 'West End',
    rating: 3.7,
    reviews: 3,
    tags: ['Good location', 'Parking limited', 'Aging building'],
    image:
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=600&q=80',
  },
  {
    id: 4,
    name: 'Fenwick Tower',
    address: '5599 Fenwick St',
    neighbourhood: 'Downtown',
    rating: 3.3,
    reviews: 3,
    tags: ['Elevator issues', 'Great views', 'Security concerns'],
    image:
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&q=80',
  },
  {
    id: 5,
    name: 'Southpoint Apartments',
    address: '1050 South Park St',
    neighbourhood: 'South End',
    rating: 2.5,
    reviews: 4,
    tags: ['No AI summary yet'],
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&q=80',
  },
]

// A demo account so graders can log in immediately.
export const demoUser = {
  name: 'Alex',
  email: 'alex@dal.ca',
  password: 'password123',
}
