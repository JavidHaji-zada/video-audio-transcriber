import React, { Suspense } from 'react';
import ReactPlayer from 'react-player';
import AppLayout from 'app/components/Layout';
import styled from 'styled-components';
import { Candidate } from 'utils/types/app';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { Alert, Button, Input } from 'reactstrap';

const Title = styled.text`
  font-size: 36px;
  color: ${p => p.theme.text};
`;

type ChangeStatus = {
  type: 'idle' | 'ready' | 'loading' | 'error' | 'success';
  message?: string;
};

function ViewTranscription(props): JSX.Element {
  const candidateId = props.match.params.id;
  const db = getFirestore();

  const [candidate, setCandidate] = React.useState<Candidate>();
  const [madeChanges, setMadeChanges] = React.useState(false);
  const [changeStatus, setChangeStatus] = React.useState<ChangeStatus>({
    type: 'idle',
    message: '',
  });

  React.useEffect(() => {
    getCandidate();
  }, []);

  const getCandidate = async () => {
    try {
      const data = await getDoc(doc(db, 'candidates', candidateId));
      const candidate: Candidate = data.data() as Candidate;
      setCandidate(candidate);
    } catch (error) {
      console.log({ error });
    }
  };
  console.log({ candidate });

  const alertColor = React.useMemo(() => {
    switch (changeStatus.type) {
      case 'error': {
        return 'danger';
      }
      case 'success': {
        return 'success';
      }
      case 'loading': {
        return 'warning';
      }
      default:
        return 'primary';
    }
  }, [changeStatus.type]);

  const saveChanges = async () => {
    try {
      setChangeStatus({ type: 'loading', message: 'Saving your changes...🚀' });
      await updateDoc(doc(db, 'candidates', candidateId), {
        transcription: candidate?.transcription,
      });
      setChangeStatus({ type: 'success', message: 'Saved!' });
      setTimeout(() => {
        setChangeStatus({ type: 'idle', message: '' });
      }, 2000);
    } catch (error) {
      setChangeStatus({ type: 'error', message: 'Error occured!🥺' });
    }
  };
  console.log({ changeStatus });

  return (
    <AppLayout>
      <Suspense>
        <Title>View Transcription for {candidate?.candidate}</Title>
        <div style={{ display: 'flex', flex: 1 }}>
          <div>
            <ReactPlayer
              url={candidate?.file}
              controls
              width={'75%'}
              height={250}
            />
            {changeStatus.type === 'ready' && (
              <Button
                onClick={saveChanges}
                style={{ width: '75%' }}
                color="success"
              >
                Save
              </Button>
            )}
            {changeStatus.message !== '' && (
              <Alert style={{ width: '75%' }} color={alertColor}>
                {changeStatus.message}
              </Alert>
            )}
          </div>
          <Input
            id="candidate"
            name="candidate"
            value={candidate?.transcription}
            placeholder="Transcription"
            type="textarea"
            multiple
            style={{ flex: 1 }}
            onChange={e => {
              setCandidate({ ...candidate!, transcription: e.target.value });
              setChangeStatus({ type: 'ready', message: '' });
            }}
          />
        </div>
      </Suspense>
    </AppLayout>
  );
}

export default ViewTranscription;
