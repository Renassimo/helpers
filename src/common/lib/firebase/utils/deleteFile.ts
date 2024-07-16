import { getStorage, ref, deleteObject } from 'firebase/storage';

const deleteFile = async (id?: string): Promise<void> => {
  if (id) {
    const storage = getStorage();
    const fileRef = ref(storage, id);
    await deleteObject(fileRef);
  }
  return;
};

export default deleteFile;
