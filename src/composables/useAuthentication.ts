import { computed, reactive } from 'vue';
import axios from 'axios';

type UserProfile = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

const authState = reactive({
    isLoggedIn: false,
    currentUser: {} as UserProfile | {},
});

export default function useAuthentication() {
    const isLoggedIn = computed(() => authState.isLoggedIn);
    const currentUser = computed(() => authState.currentUser);

    const updateLoginStatus = (status: boolean) => {
        authState.isLoggedIn = status;
    };

    const updateUserProfile = (userProfile: UserProfile | null) => {
        authState.currentUser = userProfile || {};
    };

    const signIn = async (credentials: {
        email: string;
        password: string;
    }) => {
        try {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/login', credentials);
            return fetchUser();
        } catch (error: Error | any) {
            return Promise.reject(error.response.data.errors);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/me');

            updateLoginStatus(true);
            updateUserProfile(response.data);

            return response;
        } catch (error) {
            updateLoginStatus(false);
            updateUserProfile(null);
        }
    };

    return {
        isLoggedIn,
        currentUser,
        signIn,
        fetchUser,
    };
}
