import React from 'react';
import AppLayout from 'app/components/Layout';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
import styled from 'styled-components';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import FIREBASE_UTILS from 'utils/firebase';
import { FIREBASE_STORAGE_URL } from 'utils/constants';
import { collection, getDocs } from 'firebase/firestore';
import { Candidate } from 'utils/types/app';
import VIDEO_UTILS from 'utils/video';

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
  const [candidates, setCandidates] = React.useState<Candidate[]>([]);

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
        // const thumbnail = await VIDEO_UTILS.getVideoCover(data.file);
        // console.log({ thumbnail });
        // data.thumbnail = thumbnail;
        candidates.push(data);
      });
      setCandidates(candidates);
    } catch (error) {
      console.log({ error });
    }
  };

  console.log({ candidates });

  const renderCandidateBox = (candidate: Candidate) => {
    return (
      <CandidateBox key={candidate.candidate}>
        <img style={{ width: 150, height: 100 }} src={candidate.thumbnail} />
        <CandidateName>{candidate.candidate}</CandidateName>
      </CandidateBox>
    );
  };

  return (
    <AppLayout>
      <Title>Past Uploads</Title>
      <InnerContainer>{candidates.map(renderCandidateBox)}</InnerContainer>
    </AppLayout>
  );
}

export default PastUploads;
