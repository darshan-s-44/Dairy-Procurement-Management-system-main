import { supabase } from './supabase';

export type UserRole = 'administrator' | 'farmer' | 'distributor' | 'retailer';

export interface AuthUser {
  id: string;
  username: string;
  full_name: string;
  role: UserRole;
  email?: string;
  phone?: string;
  status: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  role: UserRole;
}

export interface RegisterData {
  username: string;
  password: string;
  full_name: string;
  role: UserRole;
  email?: string;
  phone?: string;
  address?: string;
  village?: string;
  company_name?: string;
  license_number?: string;
  shop_name?: string;
  shop_address?: string;
}

const ROLE_TABLE_MAP: Record<UserRole, string> = {
  administrator: 'administrators',
  farmer: 'farmers_auth',
  distributor: 'distributors',
  retailer: 'retailers'
};

class AuthService {
  private currentUser: AuthUser | null = null;

  async login(credentials: LoginCredentials): Promise<AuthUser> {
    const { username, password, role } = credentials;
    const tableName = ROLE_TABLE_MAP[role];

    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .eq('status', 'active')
      .maybeSingle();

    if (error) {
      throw new Error('Login failed. Please check your credentials.');
    }

    if (!data) {
      throw new Error('Invalid username or password.');
    }

    await supabase
      .from(tableName)
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.id);

    const user: AuthUser = {
      id: data.id,
      username: data.username,
      full_name: data.full_name,
      role: role,
      email: data.email,
      phone: data.phone,
      status: data.status
    };

    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));

    return user;
  }

  async register(userData: RegisterData): Promise<AuthUser> {
    const { role, username, password } = userData;
    const tableName = ROLE_TABLE_MAP[role];

    const { data: existingUser } = await supabase
      .from(tableName)
      .select('username')
      .eq('username', username)
      .maybeSingle();

    if (existingUser) {
      throw new Error('Username already exists. Please choose a different username.');
    }

    const insertData: any = {
      username,
      password,
      full_name: userData.full_name,
      status: 'active'
    };

    if (role === 'administrator') {
      insertData.email = userData.email;
    } else if (role === 'farmer') {
      insertData.phone = userData.phone;
      insertData.address = userData.address;
      insertData.village = userData.village;
    } else if (role === 'distributor') {
      insertData.email = userData.email;
      insertData.phone = userData.phone;
      insertData.company_name = userData.company_name;
      insertData.license_number = userData.license_number;
      insertData.address = userData.address;
    } else if (role === 'retailer') {
      insertData.email = userData.email;
      insertData.phone = userData.phone;
      insertData.shop_name = userData.shop_name;
      insertData.shop_address = userData.shop_address;
    }

    const { data, error } = await supabase
      .from(tableName)
      .insert(insertData)
      .select()
      .single();

    if (error) {
      throw new Error('Registration failed. Please try again.');
    }

    const user: AuthUser = {
      id: data.id,
      username: data.username,
      full_name: data.full_name,
      role: role,
      email: data.email,
      phone: data.phone,
      status: data.status
    };

    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));

    return user;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): AuthUser | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      return this.currentUser;
    }

    return null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }
}

export const authService = new AuthService();
