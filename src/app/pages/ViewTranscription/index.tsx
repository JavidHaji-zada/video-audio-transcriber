import React, { Suspense } from 'react';
import ReactPlayer from 'react-player';
import AppLayout from 'app/components/Layout';
import styled from 'styled-components';
import { Candidate } from 'utils/types/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Input } from 'reactstrap';

const Title = styled.text`
  font-size: 36px;
  color: ${p => p.theme.text};
`;

function ViewTranscription(props): JSX.Element {
  const candidateId = props.match.params.id;

  const [candidate, setCandidate] = React.useState<Candidate>();

  React.useEffect(() => {
    getCandidate();
  }, []);

  const getCandidate = async () => {
    const db = getFirestore();
    try {
      const data = await getDoc(doc(db, 'candidates', candidateId));
      const candidate: Candidate = data.data() as Candidate;
      setCandidate(candidate);
    } catch (error) {
      console.log({ error });
    }
  };
  console.log({ candidate });

  return (
    <AppLayout>
      <Title>View Transcription for {candidateId}</Title>
      <Suspense>
        <div style={{ display: 'flex', flex: 1 }}>
          <ReactPlayer
            url={candidate?.file}
            controls
            width={'50%'}
            height={250}
          />
          <Input
            id="candidate"
            name="candidate"
            value={candidate?.transcription}
            placeholder="Transcription"
            type="textarea"
            multiple
            style={{ flex: 1 }}
            onChange={e =>
              setCandidate({ ...candidate!, transcription: e.target.value })
            }
          />
        </div>
      </Suspense>
    </AppLayout>
  );
}

export default ViewTranscription;
