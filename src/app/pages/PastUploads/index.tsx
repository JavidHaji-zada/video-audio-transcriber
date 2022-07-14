import React from 'react';
import AppLayout from 'app/components/Layout';
import styled from 'styled-components';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { Candidate } from 'utils/types/app';
import { useTranscriptionContext } from 'app/context/Transcription';
import { useHistory } from 'react-router-dom';

const Title = styled.text`
  font-size: 36px;
  color: ${p => p.theme.text};
`;

const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const CandidateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  margin-bottom: 12px;
`;

const CandidateName = styled.text`
  font-size: 24px;
  color: ${p => p.theme.text};
  text-align: center;
`;

function PastUploads(): JSX.Element {
  const { transcriptions, setTranscriptions } = useTranscriptionContext();
  const history = useHistory();

  React.useEffect(() => {
    getUploads();
  }, []);

  const getUploads = async () => {
    const db = getFirestore();
    try {
      const querySnapshot = await getDocs(collection(db, 'candidates'));
      const candidates: Candidate[] = [];
      querySnapshot.forEach(async doc => {
        const data: Candidate = doc.data() as Candidate;
        candidates.push({ ...data, id: doc.id });
      });
      setTranscriptions(candidates);
    } catch (error) {
      console.log({ error });
    }
  };

  const navigateToTranscription = (id: string) => {
    history.push(`/uploads/${id}`);
  };

  const renderCandidateBox = (candidate: Candidate) => {
    return (
      <CandidateBox
        key={candidate.candidate}
        onClick={() => navigateToTranscription(candidate.id)}
      >
        <img style={{ width: 150, height: 100 }} src={candidate.thumbnail} />
        <CandidateName>{candidate.candidate}</CandidateName>
      </CandidateBox>
    );
  };

  return (
    <AppLayout>
      <Title>Past Uploads</Title>
      <InnerContainer>{transcriptions.map(renderCandidateBox)}</InnerContainer>
    </AppLayout>
  );
}

export default PastUploads;
