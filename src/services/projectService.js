import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const createProject = async (projectData, userId) => {
  console.log('projectService: Creating project with data:', projectData);
  console.log('projectService: User ID:', userId);
  console.log('projectService: Firestore db instance:', db);
  
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      name: projectData.name,
      description: projectData.description,
      tags: projectData.tags || '',
      ownerId: userId,
      createdAt: serverTimestamp()
    });
    
    console.log('projectService: ✓ Project created successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('projectService: ✗ Error creating project');
    console.error('projectService: Error code:', error.code);
    console.error('projectService: Error message:', error.message);
    console.error('projectService: Full error:', error);
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

export const updateProject = async (projectId, projectData) => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, projectData);
  } catch (error) {
    throw new Error('Failed to update project: ' + error.message);
  }
};

export const deleteProject = async (projectId) => {
  try {
    await deleteDoc(doc(db, 'projects', projectId));
  } catch (error) {
    throw new Error('Failed to delete project: ' + error.message);
  }
};
