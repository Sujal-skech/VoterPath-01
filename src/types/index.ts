export interface ServiceCard {
  id: string;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  screen: string;
}

export interface Complaint {
  id?: string;
  type: string;
  description: string;
  mediaType?: 'photo' | 'video' | 'audio';
  mediaUri?: string;
  location?: string;
  state?: string;
  district?: string;
  submittedAt?: string;
  status?: 'Pending' | 'Under Review' | 'Resolved' | 'Rejected';
  userId?: string;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  partySymbol?: string;
  constituency: string;
  state: string;
  age: number;
  education?: string;
  criminalCases?: number;
  assets?: string;
  liabilities?: string;
  imageUrl?: string;
}

export interface Election {
  id: string;
  title: string;
  state: string;
  type: 'General' | 'Assembly' | 'ByPoll' | 'Local';
  phase?: number;
  electionDate: string;
  resultDate?: string;
  totalSeats?: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
}

export interface PollingTrend {
  id: string;
  state: string;
  constituency: string;
  turnoutPercentage: number;
  totalVoters: number;
  votesCast: number;
  lastUpdated: string;
  maleVoters?: number;
  femaleVoters?: number;
  thirdGenderVoters?: number;
}

export interface PastElection {
  id: string;
  year: number;
  type: string;
  winner: string;
  party: string;
  votes: number;
  margin: number;
  constituency: string;
  state: string;
}

export interface VoterRegistration {
  formName: string;
  formNumber: string;
  purpose: string;
  downloadUrl?: string;
  icon: string;
}

export interface AppNavigationState {
  activeMainTab: 'voter_services' | 'conduct_election';
  activeScreen: string | null;
}
