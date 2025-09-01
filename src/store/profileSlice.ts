import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface Profile {
  id: string;
  name: string;
  email: string;
  age?: number;
  createdAt: string;
  updatedAt: string;
}

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
  isSubmitting: false,
};

// Local Storage helpers
const PROFILE_STORAGE_KEY = 'profile-management-data';

const saveToLocalStorage = (profile: Profile) => {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

const loadFromLocalStorage = (): Profile | null => {
  try {
    const data = localStorage.getItem(PROFILE_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
};

const removeFromLocalStorage = () => {
  try {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
};

// Simulate API calls with delays
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 1000));

// Async thunks for API operations
export const createProfile = createAsyncThunk(
  'profile/create',
  async (profileData: Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>) => {
    await simulateApiDelay();
    
    const profile: Profile = {
      ...profileData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    saveToLocalStorage(profile);
    return profile;
  }
);

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (profileData: Omit<Profile, 'createdAt' | 'updatedAt'>) => {
    await simulateApiDelay();
    
    const existingProfile = loadFromLocalStorage();
    if (!existingProfile) {
      throw new Error('Profile not found');
    }
    
    const updatedProfile: Profile = {
      ...profileData,
      createdAt: existingProfile.createdAt,
      updatedAt: new Date().toISOString(),
    };
    
    saveToLocalStorage(updatedProfile);
    return updatedProfile;
  }
);

export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async () => {
    await simulateApiDelay();
    
    const profile = loadFromLocalStorage();
    if (!profile) {
      throw new Error('Profile not found');
    }
    
    return profile;
  }
);

export const deleteProfile = createAsyncThunk(
  'profile/delete',
  async () => {
    await simulateApiDelay();
    removeFromLocalStorage();
    return null;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    loadProfileFromStorage: (state) => {
      const profile = loadFromLocalStorage();
      if (profile) {
        state.profile = profile;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create profile
      .addCase(createProfile.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.error.message || 'Failed to create profile';
      })
      
      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.error.message || 'Failed to update profile';
      })
      
      // Fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      
      // Delete profile
      .addCase(deleteProfile.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.isSubmitting = false;
        state.profile = null;
        state.error = null;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.error.message || 'Failed to delete profile';
      });
  },
});

export const { clearError, loadProfileFromStorage } = profileSlice.actions;
export default profileSlice.reducer;