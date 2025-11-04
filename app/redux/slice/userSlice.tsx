import {
    createSlice,
} from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
    id: String,
    email: String,
    fullname: String
}

export interface AccountInfo {
    accessToken: String,
    user: UserInfo
}


const initialState: AccountInfo = {
    accessToken: '',
    user: {
        id: "",
        email: "",
        fullname: ""
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AccountInfo>) => {
            return action.payload; 
        },
        logout: () => {
            return {
                accessToken: '',
                user: {
                    id: "",
                    email: "",
                    fullname: ""
                }
            }; //
        },
    },
});




export const { login, logout } = userSlice.actions;
export default userSlice.reducer;