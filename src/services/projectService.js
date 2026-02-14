import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const createProject = async (projectData, userId) => {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      ownerId: userId,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    throw new Error('Failed to create project: ' + error.message);
  }
};

export const getUserProjects = async (userId) => {
  try {
    const q = query(collection(db, 'projects'), where('ownerId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw new Error('Failed to fetch projects: ' + error.message);
  }
};

export const getProjectById = async (projectId) => {
  try {
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    throw new Error('Failed to fetch project: ' + error.message);
  }
};
