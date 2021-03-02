export class User {
  apiKey: string;
  authDomain: string;
  lastLoginAt: string;
  stsTokenManager: any;
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  id: number;

  constructor(dataUser: IDataUser) {
    this.uid = dataUser.uid;
    this.email = dataUser.email;
    this.emailVerified = dataUser.emailVerified;
    this.apiKey = dataUser.apiKey;
    this.authDomain = dataUser.authDomain;
    this.displayName = dataUser.displayName;
    this.lastLoginAt = dataUser.lastLoginAt;
    this.photoURL = dataUser.photoURL;
    this.stsTokenManager = dataUser.stsTokenManager;
    this.id = dataUser.id;
  }
}

interface IDataUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  apiKey: string;
  authDomain: string;
  displayName: string;
  lastLoginAt: string;
  photoURL: string;
  stsTokenManager: any;
  id: number;
}

