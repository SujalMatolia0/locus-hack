import { Button, Center, Container, FileInput, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from '../../../../utils/api';

export const UploadCertificate = () => {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const uploadMutation = api.certificate.create.useMutation();

  const handleUpload = async () => {
    if (!file) {
      notifications.show({
        title: 'Error',
        message: 'Please select a file to upload.',
        color: 'red',
      });
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async () => {
      try {
        const jsonData = JSON.parse(reader.result as string);
        await uploadMutation.mutateAsync(jsonData);

        notifications.show({
          title: 'Success',
          message: 'Certificates uploaded successfully!',
          color: 'green',
        });

        router.push('/'); // Redirect to home page
      } catch {
        notifications.show({
          title: 'Error',
          message: 'Invalid JSON format or upload failed.',
          color: 'red',
        });
      }
    };
  };

  return (
    <Container>
      <Center mih="60vh">
        <Stack>
          <FileInput
            placeholder="Upload JSON file"
            accept="application/json"
            onChange={setFile}
          />
          <Button mt="md" color="blue" onClick={handleUpload} disabled={!file}>
            Upload Certificates
          </Button>
        </Stack>
      </Center>
    </Container>
  );
};
