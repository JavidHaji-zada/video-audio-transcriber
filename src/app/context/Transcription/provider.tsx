import React from 'react';
import { Candidate } from 'utils/types/app';
import TranscriptionContext from './context';

function TranscriptionProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  const [transcriptions, setTranscriptions] = React.useState<Candidate[]>([]);

  const providerValue = React.useMemo(
    () => ({ transcriptions, setTranscriptions }),
    [transcriptions],
  );

  return (
    <TranscriptionContext.Provider value={providerValue}>
      {props.children}
    </TranscriptionContext.Provider>
  );
}

export default TranscriptionProvider;
