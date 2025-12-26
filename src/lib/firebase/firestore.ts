import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  type DocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./config";
import type { User } from "@/types/user";
import type { Product, CartItem } from "@/types/product";
import { APP_CONFIG } from "@/constants/config";

// Collection references
const usersCollection = collection(db, "users");
const productsCollection = collection(db, "products");

/**
 * User Firestore Service
 */
export const userService = {
  async getUser(id: string): Promise<User | null> {
    const docRef = doc(usersCollection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as User;
    }
    return null;
  },

  async createUser(user: User): Promise<void> {
    const docRef = doc(usersCollection, user.id);
    await setDoc(docRef, user);
  },

  async updateUser(id: string, updates: Partial<User>): Promise<void> {
    const docRef = doc(usersCollection, id);
    await updateDoc(docRef, updates);
  },

  async saveBasket(userId: string, items: CartItem[]): Promise<void> {
    const docRef = doc(usersCollection, userId);
    await updateDoc(docRef, { basket: items });
  },
};

/**
 * Product Firestore Service
 */
export const productService = {
  async getSingleProduct(id: string): Promise<Product | null> {
    const docRef = doc(productsCollection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return null;
  },

  async getProducts(
    lastKey?: DocumentSnapshot<DocumentData>
  ): Promise<{ products: Product[]; lastKey: DocumentSnapshot<DocumentData> | null; total: number }> {
    const itemsPerPage = APP_CONFIG.productsPerPage;

    let q;
    if (lastKey) {
      q = query(
        productsCollection,
        orderBy("dateAdded", "desc"),
        startAfter(lastKey),
        limit(itemsPerPage)
      );
    } else {
      q = query(
        productsCollection,
        orderBy("dateAdded", "desc"),
        limit(itemsPerPage)
      );
    }

    const [snapshot, totalSnapshot] = await Promise.all([
      getDocs(q),
      getDocs(productsCollection),
    ]);

    const products: Product[] = [];
    snapshot.forEach((docSnap) => {
      products.push({ id: docSnap.id, ...docSnap.data() } as Product);
    });

    const newLastKey = snapshot.docs[snapshot.docs.length - 1] || null;

    return {
      products,
      lastKey: newLastKey,
      total: totalSnapshot.size,
    };
  },

  async searchProducts(searchKey: string): Promise<Product[]> {
    const lowerSearchKey = searchKey.toLowerCase();

    // Search by name
    const nameQuery = query(
      productsCollection,
      where("nameLower", ">=", lowerSearchKey),
      where("nameLower", "<=", lowerSearchKey + "\uf8ff"),
      limit(12)
    );

    // Search by keywords
    const keywordsQuery = query(
      productsCollection,
      where("keywords", "array-contains-any", searchKey.split(" ")),
      limit(12)
    );

    const [nameSnap, keywordsSnap] = await Promise.all([
      getDocs(nameQuery),
      getDocs(keywordsQuery),
    ]);

    const productMap = new Map<string, Product>();

    nameSnap.forEach((docSnap) => {
      const product = { id: docSnap.id, ...docSnap.data() } as Product;
      productMap.set(product.id, product);
    });

    keywordsSnap.forEach((docSnap) => {
      const product = { id: docSnap.id, ...docSnap.data() } as Product;
      if (!productMap.has(product.id)) {
        productMap.set(product.id, product);
      }
    });

    return Array.from(productMap.values());
  },

  async getFeaturedProducts(itemsCount = 12): Promise<Product[]> {
    const q = query(
      productsCollection,
      where("isFeatured", "==", true),
      limit(itemsCount)
    );

    const snapshot = await getDocs(q);
    const products: Product[] = [];
    snapshot.forEach((docSnap) => {
      products.push({ id: docSnap.id, ...docSnap.data() } as Product);
    });

    return products;
  },

  async getRecommendedProducts(itemsCount = 12): Promise<Product[]> {
    const q = query(
      productsCollection,
      where("isRecommended", "==", true),
      limit(itemsCount)
    );

    const snapshot = await getDocs(q);
    const products: Product[] = [];
    snapshot.forEach((docSnap) => {
      products.push({ id: docSnap.id, ...docSnap.data() } as Product);
    });

    return products;
  },

  async addProduct(product: Product): Promise<void> {
    const docRef = doc(productsCollection, product.id);
    await setDoc(docRef, product);
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<void> {
    const docRef = doc(productsCollection, id);
    await updateDoc(docRef, updates);
  },

  async deleteProduct(id: string): Promise<void> {
    const docRef = doc(productsCollection, id);
    await deleteDoc(docRef);
  },

  generateId(): string {
    return doc(productsCollection).id;
  },
};

/**
 * Storage Service
 */
export const storageService = {
  async uploadImage(
    id: string,
    folder: string,
    file: File
  ): Promise<string> {
    const storageRef = ref(storage, `${folder}/${id}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  },

  async deleteImage(id: string, folder = "products"): Promise<void> {
    const storageRef = ref(storage, `${folder}/${id}`);
    await deleteObject(storageRef);
  },
};
