import type { FileDetails } from '@/types/lib';
const fileDetails: FileDetails = {
  name: 'testComposable',
  file: 'Composable',
  description: 'This is test composable',
  param: [{ type: 'string', name: 'message', description: 'the message to capitalise' }],
  return: [{ type: 'ComputedRef<string>', name: 'capitalisedMessage', description: 'the capitalised message' }],
};
export default fileDetails;
