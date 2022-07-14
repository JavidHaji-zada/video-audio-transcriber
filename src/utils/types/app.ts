export interface Candidate {
  id: string;
  candidate: string;
  file: string;
  notes: string;
  interviewer: string;
  thumbnail: string;
  status: TranscriptionStatus;
  transcription: string;
}

export type TranscriptionStatus = 'PENDING' | 'READY' | 'FAILED' | 'COMPLETED';
