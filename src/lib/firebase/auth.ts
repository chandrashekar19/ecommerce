import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "./config";
import type { User, SignInCredentials, SignUpData } from "@/types/user";
import { userService } from "./firestore";

// Auth provider instances
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

/**
 * Firebase Authentication Service
 * Follows Interface Segregation Principle - small, focused interface
 */
export const authService = {
  /**
   * Sign in with email and password
   */
  async signIn({ email, password }: SignInCredentials): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = await userService.getUser(userCredential.user.uid);
    if (!user) {
      throw new Error("User profile not found");
    }
    return user;
  },

  /**
   * Create new account with email and password
   */
  async signUp({ email, password, fullname }: SignUpData): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser: User = {
      id: userCredential.user.uid,
      email,
      fullname,
      role: "USER",
      dateJoined: Date.now(),
    };
    await userService.createUser(newUser);
    return newUser;
  },

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    await firebaseSignOut(auth);
  },

  /**
   * Sign in with Google
   */
  async signInWithGoogle(): Promise<User> {
    const result = await signInWithPopup(auth, googleProvider);
    let user = await userService.getUser(result.user.uid);

    if (!user) {
      // Create user if doesn't exist
      user = {
        id: result.user.uid,
        email: result.user.email || "",
        fullname: result.user.displayName || "",
        avatar: result.user.photoURL || undefined,
        role: "USER",
        dateJoined: Date.now(),
      };
      await userService.createUser(user);
    }
    return user;
  },

  /**
   * Sign in with Facebook
   */
  async signInWithFacebook(): Promise<User> {
    const result = await signInWithPopup(auth, facebookProvider);
    let user = await userService.getUser(result.user.uid);

    if (!user) {
      user = {
        id: result.user.uid,
        email: result.user.email || "",
        fullname: result.user.displayName || "",
        avatar: result.user.photoURL || undefined,
        role: "USER",
        dateJoined: Date.now(),
      };
      await userService.createUser(user);
    }
    return user;
  },

  /**
   * Sign in with GitHub
   */
  async signInWithGithub(): Promise<User> {
    const result = await signInWithPopup(auth, githubProvider);
    let user = await userService.getUser(result.user.uid);

    if (!user) {
      user = {
        id: result.user.uid,
        email: result.user.email || "",
        fullname: result.user.displayName || "",
        avatar: result.user.photoURL || undefined,
        role: "USER",
        dateJoined: Date.now(),
      };
      await userService.createUser(user);
    }
    return user;
  },

  /**
   * Send password reset email
   */
  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  },

  /**
   * Change user password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error("No authenticated user");
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  },

  /**
   * Update user email
   */
  async changeEmail(currentPassword: string, newEmail: string): Promise<void> {
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error("No authenticated user");
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, newEmail);
  },

  /**
   * Subscribe to auth state changes
   */
  onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  },

  /**
   * Get current Firebase user
   */
  getCurrentFirebaseUser(): FirebaseUser | null {
    return auth.currentUser;
  },
};
