import { storage } from '@/configs/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImageToFirestore = async (
  file: File,
  path: string
) => {
  const storageRef = ref(storage, `${path}/${file.name}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    console.log('Image uploaded successfully:', snapshot);

    // Get the URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);
    console.log('Download URL:', downloadURL);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

export const getImageFromURL = async (imageUrl: string) => {
  try {
    // Create a reference to the image based on its URL
    const imageRef = ref(storage, imageUrl);

    // Get the download URL for the image
    const downloadURL = await getDownloadURL(imageRef);
    console.log('Download URL:', downloadURL);

    return downloadURL;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};
