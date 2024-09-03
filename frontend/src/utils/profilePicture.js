// src/utils/userUtils.js
import store from '../store.js'; // Adjust the path to your Redux store

// Function to get the profile picture URL
export const getProfilePictureUrl = () => {
    const state = store.getState();
    const userInfo = state.auth.userInfo;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const profilePicture = userInfo?.user.profilePicture;

    if (profilePicture) {
        return `${backendUrl}${profilePicture}`;
    }

    return null;
};
