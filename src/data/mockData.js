// Mock data for the TenantTrails app.
// In a later lab this will come from a real backend/database.

export const apartments = [
  {
    id: 1,
    name: 'The Marlstone',
    address: '5540 Spring Garden Rd',
    neighbourhood: 'Spring Garden',
    rating: 5.0,
    reviews: 1, // review count (used by the Dashboard sort + stat pills)
    tags: ['No AI summary yet'],
    landlord: 'Southwest Properties',
    units: 120,
    yearBuilt: 2022,
    aiSummary: null,
    aiIssues: [],
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
    landlord: 'Templeton Properties',
    units: 64,
    yearBuilt: 2008,
    aiSummary:
      'Reviewers describe a well-run, quiet building with attentive staff and reliable maintenance. The most common criticism is cost, with several tenants noting rents that run above comparable units in the area. Overall sentiment is positive, particularly around upkeep and noise levels.',
    aiIssues: ['Well maintained', 'Quiet', 'Expensive'],
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
    landlord: 'Killam Properties',
    units: 88,
    yearBuilt: 1975,
    aiSummary:
      'Tenants consistently praise the location and proximity to Quinpool Road shops. Parking availability is a recurring complaint, with multiple reviewers mentioning waitlists exceeding six months. The building shows its age in hallway carpeting and elevator reliability, but unit interiors have been progressively updated. Maintenance response times average two to three days for non-urgent requests.',
    aiIssues: ['Good location', 'Parking limited', 'Aging building', 'Maintenance delays'],
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
    landlord: 'Templeton Properties',
    units: 320,
    yearBuilt: 1971,
    aiSummary:
      'Tenants love the upper-floor harbour views and the central downtown location. The recurring frustrations are unreliable elevators and inconsistent lobby security. Value for rent is rated highly, but reliability of building systems brings the overall score down.',
    aiIssues: ['Elevator issues', 'Great views', 'Security concerns'],
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
    landlord: 'Killam Properties',
    units: 96,
    yearBuilt: 1998,
    aiSummary: null,
    aiIssues: [],
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&q=80',
  },
]

// Individual tenant reviews. aptId links to apartments[].id,
// userId links to a user (the demo user is id 1).
export const reviews = [
  // The Marlstone (id 1) — 1 review, avg 5.0
  {
    id: 1,
    aptId: 1,
    userId: 2,
    author: 'Priya Sharma',
    rating: 5,
    body:
      'Brand new building and it shows. Everything works, the gym is excellent, and management answers emails the same day. No complaints after eight months.',
    date: '2026-05-12',
  },

  // Park Victoria (id 2) — 2 reviews, avg 4.5
  {
    id: 2,
    aptId: 2,
    userId: 1,
    author: 'Alex Mitchell',
    rating: 5,
    body:
      'Easily the best-maintained building I have lived in. Quiet, secure, and the staff are genuinely helpful. The only downside is the rent, which is high for the size.',
    date: '2026-02-08',
  },
  {
    id: 3,
    aptId: 2,
    userId: 3,
    author: 'Daniel Cooper',
    rating: 4,
    body:
      'Solid building in a great spot. Walls are thick so it stays quiet. Pricey, but you get what you pay for in terms of upkeep.',
    date: '2026-01-22',
  },

  // Le Marchant Towers (id 3) — 3 reviews, avg 3.7
  {
    id: 4,
    aptId: 3,
    userId: 4,
    author: 'James Chen',
    rating: 4,
    body:
      'Good building overall. Management is professional and responsive within 48 hours for most issues. The parking situation is genuinely bad though. I waited five months for a spot.',
    date: '2026-04-01',
  },
  {
    id: 5,
    aptId: 3,
    userId: 1,
    author: 'Alex Mitchell',
    rating: 4,
    body:
      'Lived here for two years. Quiet neighbours, solid construction, and the Quinpool Road location is extremely convenient. Elevator breaks down about once a month but they fix it within the day.',
    date: '2026-03-19',
  },
  {
    id: 6,
    aptId: 3,
    userId: 5,
    author: 'Megan Doyle',
    rating: 3,
    body:
      'Location is unbeatable but the building is showing its age. Hallway carpets are worn and the laundry machines are temperamental. Fine for the price.',
    date: '2026-02-28',
  },

  // Fenwick Tower (id 4) — 3 reviews, avg 3.3
  {
    id: 7,
    aptId: 4,
    userId: 1,
    author: 'Alex Mitchell',
    rating: 4,
    body:
      'The view from the 28th floor is incredible. You can see the harbour, Dartmouth, and McNabs Island. Location is unbeatable for getting downtown on foot.',
    date: '2026-03-02',
  },
  {
    id: 8,
    aptId: 4,
    userId: 1,
    author: 'Alex Mitchell',
    rating: 4,
    body:
      'Rent is very reasonable for downtown Halifax. The unit itself is fine, nothing fancy but functional. Laundry facilities could use an upgrade.',
    date: '2026-01-15',
  },
  {
    id: 9,
    aptId: 4,
    userId: 6,
    author: 'Robert Kane',
    rating: 2,
    body:
      'The elevators are constantly out of service and I have been stuck waiting 20 minutes more than once. Security in the lobby is also hit or miss. Views are great but not worth the hassle.',
    date: '2026-02-11',
  },

  // Southpoint Apartments (id 5) — 4 reviews, avg 2.5
  {
    id: 10,
    aptId: 5,
    userId: 1,
    author: 'Alex Mitchell',
    rating: 3,
    body:
      'Decent location near the park but the building has issues. Heater in my unit broke during winter and it took four days to fix. Deposit was returned in full though, which I appreciated.',
    date: '2026-04-10',
  },
  {
    id: 11,
    aptId: 5,
    userId: 1,
    author: 'Alex Mitchell',
    rating: 2,
    body:
      'Average experience overall. The laundry room is always busy and half the machines are broken. Common areas are cleaned only occasionally.',
    date: '2026-03-25',
  },
  {
    id: 12,
    aptId: 5,
    userId: 7,
    author: 'Sophie Tremblay',
    rating: 2,
    body:
      'Affordable but you feel it. Thin walls, slow maintenance, and the front entrance lock has been broken for weeks. Would not renew.',
    date: '2026-02-19',
  },
  {
    id: 13,
    aptId: 5,
    userId: 8,
    author: 'Liam Foster',
    rating: 3,
    body:
      'It is fine for a first apartment. Nothing special, a few maintenance delays, but the price is hard to beat in the South End.',
    date: '2026-01-30',
  },
]

// A demo account so graders can log in immediately.
export const demoUser = {
  id: 1,
  name: 'Alex Mitchell',
  email: 'alex@dal.ca',
  password: 'password123',
}
