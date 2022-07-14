import React from 'react';
import { Candidate } from 'utils/types/app';

interface TranscriptionContextState {
  transcriptions: Candidate[];
  setTranscriptions: React.Dispatch<React.SetStateAction<Candidate[]>>;
}

const INITIAL_STATE: TranscriptionContextState = {
  transcriptions: [],
  setTranscriptions: () => {},
};

const TranscriptionContext = React.createContext(INITIAL_STATE);

export default TranscriptionContext;

export function useTranscriptionContext(): TranscriptionContextState {
  return React.useContext(TranscriptionContext);
}
