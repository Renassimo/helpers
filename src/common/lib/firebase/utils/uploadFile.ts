import { v4 as uuidv4 } from 'uuid';

import { getStorage, ref, uploadBytes } from 'firebase/storage';

import { FileWithPreview } from '@/common/types/files';

const uploadFile = async (
  file: File | FileWithPreview | null,
  name = 'noname'
): Promise<string> => {
  if (file) {
    const uid = uuidv4();
    const storage = getStorage();
    const fileRef = ref(storage, `${name}-${uid}`);
    const snapshot = await uploadBytes(fileRef, file);
    return snapshot.ref.name;
  } else {
    throw new Error('File was not provided');
  }
};

export default uploadFile;
