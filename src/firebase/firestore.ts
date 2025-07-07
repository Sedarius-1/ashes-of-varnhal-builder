import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  type DocumentData,
  type QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './config';
import type { Warband } from '../types/warband';

// Warband operations
export const createWarband = async (warband: Omit<Warband, 'id'>, userId: string) => {
  try {
    const docRef = await addDoc(collection(db, 'warbands'), {
      ...warband,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { id: docRef.id, ...warband };
  } catch (error) {
    console.error('Error creating warband:', error);
    throw error;
  }
};

export const updateWarband = async (id: string, updates: Partial<Warband>) => {
  try {
    const warbandRef = doc(db, 'warbands', id);
    await updateDoc(warbandRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating warband:', error);
    throw error;
  }
};

export const deleteWarband = async (id: string) => {
  try {
    const warbandRef = doc(db, 'warbands', id);
    await deleteDoc(warbandRef);
  } catch (error) {
    console.error('Error deleting warband:', error);
    throw error;
  }
};

export const getWarbands = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'warbands'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...doc.data()
    })) as unknown as Warband[];
  } catch (error) {
    console.error('Error getting warbands:', error);
    throw error;
  }
};

// Campaign operations
export const createCampaign = async (campaign: any, userId: string) => {
  try {
    const docRef = await addDoc(collection(db, 'campaigns'), {
      ...campaign,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { id: docRef.id, ...campaign };
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
};

export const updateCampaign = async (id: string, updates: any) => {
  try {
    const campaignRef = doc(db, 'campaigns', id);
    await updateDoc(campaignRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating campaign:', error);
    throw error;
  }
};

export const deleteCampaign = async (id: string) => {
  try {
    const campaignRef = doc(db, 'campaigns', id);
    await deleteDoc(campaignRef);
  } catch (error) {
    console.error('Error deleting campaign:', error);
    throw error;
  }
};

export const getCampaigns = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'campaigns'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting campaigns:', error);
    throw error;
  }
}; 