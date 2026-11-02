// Mock data for VoterPath app (ECINET-style)

import { Candidate, Election, PollingTrend, PastElection, VoterRegistration } from '../types';

export const VOTER_SERVICE_CARDS = [
  { id: 'reg_forms', title: 'Voter Registration\nForms', icon: 'file-document-edit-outline', colorIdx: 0 },
  { id: 'search_sir', title: 'Search Your Name\nin Last SIR', icon: 'account-search-outline', colorIdx: 1 },
  { id: 'voter_complaints', title: 'Voter Card\nComplaints', icon: 'card-bulleted-outline', colorIdx: 2 },
  { id: 'track_application', title: 'Track Your\nApplication', icon: 'progress-check', colorIdx: 3 },
  { id: 'download_epic', title: 'Download e-Voter\nCard (e-EPIC)', icon: 'download-outline', colorIdx: 4 },
  { id: 'search_voter_list', title: 'Search Your Name\nin Voter List', icon: 'format-list-bulleted-square', colorIdx: 5 },
  { id: 'call_blo', title: 'Book a Call\nWith BLO', icon: 'phone-plus-outline', colorIdx: 6 },
  { id: 'connect_officials', title: 'Connect with\nElection Officials', icon: 'badge-account-outline', colorIdx: 7 },
  { id: 'submit_appeal', title: 'Submit / Track\nAppeal', icon: 'scale-balance', colorIdx: 0 },
  { id: 'divyang_voter', title: 'Divyang\n(Saksham)', icon: 'wheelchair-accessibility', colorIdx: 1 },
];

export const CONDUCT_ELECTION_CARDS = [
  { id: 'know_candidate', title: 'Know Your\nCandidates', icon: 'account-group-outline', colorIdx: 0 },
  { id: 'current_election', title: 'Current\nElection', icon: 'calendar-clock-outline', colorIdx: 1 },
  { id: 'cvigil', title: 'MCC Complaint\n(cVIGIL)', icon: 'eye-outline', colorIdx: 2 },
  { id: 'polling_trends', title: 'Polling Trends\n(Voter Turnout)', icon: 'chart-bar', colorIdx: 3 },
  { id: 'past_elections', title: 'Past\nElections', icon: 'history', colorIdx: 4 },
  { id: 'divyang', title: 'Divyang\n(Saksham)', icon: 'wheelchair-accessibility', colorIdx: 5 },
  { id: 'suvidha', title: 'Suvidha 2.0\n(For Political Party & Candidates)', icon: 'briefcase-check-outline', colorIdx: 6 },
];

export const MCC_VIOLATION_TYPES = [
  'Money Distribution',
  'Liquor Distribution',
  'Freebies Distribution',
  'Property Inducement',
  'Fake News',
  'Field News',
  'Communal Hate Speech',
  'Intimidation',
  'Other',
];

export const CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Ramesh Kumar Sharma',
    party: 'INC',
    constituency: 'New Delhi',
    state: 'Delhi',
    age: 54,
    education: 'B.A. (Hons)',
    criminalCases: 0,
    assets: '₹1.2 Crore',
    liabilities: '₹10 Lakh',
  },
  {
    id: 'cand-2',
    name: 'Priya Verma',
    party: 'BJP',
    constituency: 'New Delhi',
    state: 'Delhi',
    age: 47,
    education: 'M.B.A.',
    criminalCases: 0,
    assets: '₹3.4 Crore',
    liabilities: '₹45 Lakh',
  },
  {
    id: 'cand-3',
    name: 'Arjun Singh',
    party: 'AAP',
    constituency: 'Chandni Chowk',
    state: 'Delhi',
    age: 39,
    education: 'B.Tech',
    criminalCases: 1,
    assets: '₹62 Lakh',
    liabilities: '₹5 Lakh',
  },
  {
    id: 'cand-4',
    name: 'Sunita Devi',
    party: 'BSP',
    constituency: 'East Delhi',
    state: 'Delhi',
    age: 51,
    education: 'M.A.',
    criminalCases: 0,
    assets: '₹28 Lakh',
    liabilities: '₹0',
  },
];

export const ELECTIONS: Election[] = [
  {
    id: 'el-1',
    title: 'Delhi Assembly Election 2025',
    state: 'Delhi',
    type: 'Assembly',
    phase: 1,
    electionDate: '2025-02-05',
    resultDate: '2025-02-08',
    totalSeats: 70,
    status: 'Completed',
  },
  {
    id: 'el-2',
    title: 'Bihar By-Poll 2026',
    state: 'Bihar',
    type: 'ByPoll',
    electionDate: '2026-11-20',
    resultDate: '2026-11-23',
    totalSeats: 4,
    status: 'Upcoming',
  },
  {
    id: 'el-3',
    title: 'Lok Sabha General Election 2024',
    state: 'All India',
    type: 'General',
    phase: 7,
    electionDate: '2024-06-01',
    resultDate: '2024-06-04',
    totalSeats: 543,
    status: 'Completed',
  },
];

export const POLLING_TRENDS: PollingTrend[] = [
  {
    id: 'tr-1',
    state: 'Delhi',
    constituency: 'New Delhi (All Phases)',
    turnoutPercentage: 62.4,
    totalVoters: 1450000,
    votesCast: 905280,
    lastUpdated: '2024-11-01T17:00:00Z',
    maleVoters: 480210,
    femaleVoters: 424820,
    thirdGenderVoters: 250,
  },
  {
    id: 'tr-2',
    state: 'Maharashtra',
    constituency: 'Mumbai North',
    turnoutPercentage: 55.8,
    totalVoters: 1860000,
    votesCast: 1038480,
    lastUpdated: '2024-11-01T16:30:00Z',
    maleVoters: 548000,
    femaleVoters: 490330,
    thirdGenderVoters: 150,
  },
  {
    id: 'tr-3',
    state: 'Tamil Nadu',
    constituency: 'Chennai Central',
    turnoutPercentage: 71.2,
    totalVoters: 980000,
    votesCast: 697760,
    lastUpdated: '2024-11-01T18:00:00Z',
    maleVoters: 360000,
    femaleVoters: 337600,
    thirdGenderVoters: 160,
  },
];

export const PAST_ELECTIONS: PastElection[] = [
  {
    id: 'pe-1',
    year: 2020,
    type: 'Delhi Assembly',
    winner: 'Aam Aadmi Party',
    party: 'AAP',
    votes: 13901698,
    margin: 0,
    constituency: 'All Delhi',
    state: 'Delhi',
  },
  {
    id: 'pe-2',
    year: 2019,
    type: 'Lok Sabha General',
    winner: 'Bharatiya Janata Party',
    party: 'BJP',
    votes: 228000000,
    margin: 0,
    constituency: 'All India',
    state: 'India',
  },
  {
    id: 'pe-3',
    year: 2024,
    type: 'Lok Sabha General',
    winner: 'National Democratic Alliance',
    party: 'NDA',
    votes: 240000000,
    margin: 0,
    constituency: 'All India',
    state: 'India',
  },
];

export const VOTER_FORMS: VoterRegistration[] = [
  {
    formName: 'Form 6 – New Registration',
    formNumber: '6',
    purpose: 'Register as a voter for the first time or on moving to a new constituency',
    icon: 'file-plus-outline',
  },
  {
    formName: 'Form 6A – Overseas Voters',
    formNumber: '6A',
    purpose: 'Registration for Indian citizens living abroad (NRI voters)',
    icon: 'earth',
  },
  {
    formName: 'Form 7 – Deletion / Objection',
    formNumber: '7',
    purpose: 'Object to inclusion of a name or apply for deletion from voter list',
    icon: 'file-remove-outline',
  },
  {
    formName: 'Form 8 – Correction / Update',
    formNumber: '8',
    purpose: 'Correction of entries in electoral roll — name, photo, address, EPIC etc.',
    icon: 'file-edit-outline',
  },
  {
    formName: 'Form 8A – Transposition',
    formNumber: '8A',
    purpose: 'Transfer of name within the same assembly constituency on change of address',
    icon: 'file-swap-outline',
  },
];

export const INDIA_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal',
];
