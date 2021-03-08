import { createSlice } from "@reduxjs/toolkit";

//sử dụng notitask: https://iamhosseindhv.com/notistack/api

export const notifierSlice = createSlice({
    name: 'notifier',
    initialState: {
        notifications: []
    },

    reducers: {
        enqueueSnackbar: (state, action) => {
            const notification = action.payload;
            const key = notification.options && notification.options.key;

            const notifications = [
                ...state.notifications,
                {
                    key: key || new Date().getTime() + Math.random(),
                    ...notification
                }
            ]

            state.notifications = notifications;

        },

        notify: (state, action) => {
            const { message, options } = action.payload;
            const newKey = new Date().getTime() + Math.random();
            const notifications = [
                ...state.notifications,
                {
                    key: newKey,
                    message: message,
                    options: {
                        variant: 'default',
                        key: newKey,
                        autoHideDuration: 1000,
                        anchorOrigin: { horizontal: 'right', vertical: 'top' },
                        ...options,
                    },
                }
            ]

            state.notifications = notifications;

        },

        closeSnackbar: (state, action) => {
            const { key } = action.payload;

            const dismissAll = key == null ? true : false;


            let notifications = state.notifications.map((notification) => {
                if (dismissAll === true || notification.key === key)
                    return { ...notification, dismissed: true }
                else return { ...notification }
            })

            state.notifications = notifications;


        },
        removeSnackbar: (state, action) => {
            const key = action.payload;
            let notifications = state.notifications.filter((notification) =>
                notification.key !== key
            )

            state.notifications = notifications;
        },
    }
})

export const { enqueueSnackbar, closeSnackbar, removeSnackbar, notify } = notifierSlice.actions;

export default notifierSlice.reducer;