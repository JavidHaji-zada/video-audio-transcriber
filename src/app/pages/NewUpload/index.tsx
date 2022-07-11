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
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  uploadString,
} from 'firebase/storage';
import {
  doc,
  setDoc,
  getFirestore,
  addDoc,
  collection,
  updateDoc,
} from 'firebase/firestore';
import FIREBASE_UTILS from 'utils/firebase';
import { FIREBASE_STORAGE_URL } from 'utils/constants';
import VIDEO_UTILS from 'utils/video';

interface NewInterviewForm {
  candidate: string;
  file: File | null;
  interviewer: string;
  notes: string;
}

const Title = styled.text`
  font-size: 36px;
  color: ${p => p.theme.text};
`;

function NewUpload(): JSX.Element {
  const [form, setForm] = React.useState<NewInterviewForm>({
    candidate: '',
    file: null,
    interviewer: 'Inji Mammadli',
    notes: '',
  });
  const [uploadPercentage, setUploadPercentage] = React.useState(0);
  const [alert, setAlert] = React.useState({ message: '', type: '' });
  const onSubmit = async () => {
    const { file } = form;
    if (!file) {
      setAlert({ message: 'Please upload a file first!', type: 'danger' });
      return;
    }
    setAlert({ message: '', type: '' });
    const storage = FIREBASE_UTILS.getFirebaseStorage();
    const db = getFirestore();
    if (storage) {
      const docRef = await addDoc(collection(db, 'candidates'), {
        ...form,
        file: '',
        thumbnail: '',
      });

      const videoStorageRef = ref(
        storage,
        `/${FIREBASE_STORAGE_URL}/${docRef.id}/video.mp4`,
      );

      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(videoStorageRef, file);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );

          // update progress
          setUploadPercentage(percent);
        },
        err => console.log(err),
        async () => {
          try {
            const base64Thumbnail = await VIDEO_UTILS.getVideoThumbnail(
              file,
              undefined,
            );

            // download url
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            // Add a new document in collection "cities"
            // Add a new document with a generated id.
            await updateDoc(doc(db, 'candidates', docRef.id), {
              file: downloadUrl,
              thumbnail: base64Thumbnail,
            });
            setAlert({
              message: 'Successfully created candidated case!',
              type: 'success',
            });
          } catch (error) {
            setAlert({
              message: 'Error saving candidate info!',
              type: 'danger',
            });
          }
        },
      );
    }
  };

  const setFormValue = (key: keyof NewInterviewForm, value: string | File) => {
    setAlert({ message: '', type: '' });
    setUploadPercentage(0);
    setForm({ ...form, [key]: value });
  };

  return (
    <AppLayout>
      <Title>Upload New Interview</Title>
      <Form>
        <FormGroup>
          <Label for="candidate" style={{ color: '#ffffff' }}>
            Candidate Info
          </Label>
          <Input
            id="candidate"
            name="candidate"
            value={form.candidate}
            placeholder="Candidate Name Surname"
            type="text"
            onChange={e => setFormValue('candidate', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="notes" style={{ color: '#ffffff' }}>
            Notes
          </Label>
          <Input
            id="notes"
            name="notes"
            type="textarea"
            placeholder="(Optional) notes"
            onChange={e => setFormValue('notes', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="file" style={{ color: '#ffffff' }}>
            Upload File
          </Label>
          <Input
            id="file"
            name="file"
            type="file"
            onChange={async e => {
              const length = e.target.files?.length || 0;
              if (length > 0) {
                e.preventDefault();
                setFormValue('file', e.target.files![0]);
              }
            }}
          />
          <FormText>Don't leave the page until upload is completed</FormText>
        </FormGroup>
        <Button color="primary" onClick={onSubmit}>
          Submit
        </Button>
        {uploadPercentage > 0 && (
          <Alert style={{ marginTop: '5%' }} color="warning">
            {uploadPercentage}% Uploaded
          </Alert>
        )}
        {alert.message.length > 0 && (
          <Alert style={{ marginTop: '5%' }} color={alert.type}>
            {alert.message}
          </Alert>
        )}
      </Form>
    </AppLayout>
  );
}

export default NewUpload;
