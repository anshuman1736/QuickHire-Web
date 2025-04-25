import {
  getDownloadURL,
  StorageReference,
  uploadBytes,
} from "firebase/storage";
import {
  getCinCertificateStorageRef,
  getProfileStorageRef,
  getResumeStorageRef,
} from "./firebaseConfig";

async function uploadFile(
  file: File,
  getStorageRef: (file: File) => StorageReference | null,
  fileType: string
) {
  try {
    const storageRef = await getStorageRef(file);
    if (!storageRef) {
      throw new Error(`Failed to get storage reference for ${fileType}`);
    }
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (e: Error | unknown) {
    if (e instanceof Error) {
      console.error(`Error uploading ${fileType}:`, e.message);
    } else {
      console.error(`Unexpected error uploading ${fileType}:`, e);
    }
    return null;
  }
}

export async function uploadResume(resume: File): Promise<string | null> {
  return uploadFile(resume, getResumeStorageRef, "resume");
}

export async function uploadCinCertificate(cinCertificate: File) {
  return uploadFile(
    cinCertificate,
    getCinCertificateStorageRef,
    "CIN certificate"
  );
}

export async function uploadProfilePic(profilePic: File) {
  return uploadFile(profilePic, getProfileStorageRef, "profile picture");
}
