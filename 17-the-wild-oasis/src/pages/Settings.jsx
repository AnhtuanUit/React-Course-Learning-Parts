import Row from '@src/ui/Row';
import Heading from '../ui/Heading';
import UpdateSettingsForm from '@src/features/settings/UpdateSettingsForm';

function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
