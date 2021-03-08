import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from '../../common/component/Notifier/notifierSlice';
import { universityApi } from './UniversityApi';
import { startLoading, stopLoading } from '../../common/component/PageLoader/loadingSlice';

export const fetchUniversityRequest = createAsyncThunk(
    'university/fetchUniversityStatus',
    async ({ }, thunkApi) => {
        //nếu không có tham số thứ nhất thì ko dispatch được ?????
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            let response = await universityApi.getUniversityData();
console.log("load");
            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Lấy dữ liệu trườn học thành công", options: { variant: 'success' } }));
                    return response.data;
                case 401:
                    throw new Error("Unauthorized");
                default:
                    throw new Error("Unsuccessfully");
            }
        }
        catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }

    }
);

export const createUniversityRequest = createAsyncThunk(
    'university/createUniversityStatus',
    async (universityInfo, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());

            //transfer schema
            // const {university_name,question,total_score} = universityInfo;
            // const newUniversity ={name:university_name,totalQuestionUserMustDo:question,maxScore:total_score};

            const response = await universityApi.pushNewUniversity(universityInfo);
            dispatch(stopLoading());
            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Thêm đề thi thành công", options: { variant: 'success' } }));
                    dispatch(stopLoading());
                    return { data: response.data, universityInfo };
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            console.log(error);
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });

export const updateUniversityRequest = createAsyncThunk(
    'university/editUniversityStatus',
    async (universityInfo, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());

             //transfer schema
            const {id,university_name,question,total_score} = universityInfo;
            const newUniversity ={name:university_name,totalQuestionUserMustDo:question,maxScore:total_score};

            const response = await universityApi.patchUniversityInfo(universityInfo,id);
            dispatch(stopLoading());

            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Sửa đề thi thành công", options: { variant: 'success' } }));
                    return { data: response.data, universityInfo };
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });

export const deleteUniversityRequest = createAsyncThunk(
    'university/deleteUniversityStatus',
    async (university_id, thunkApi) => {
        const { dispatch } = thunkApi;
        try {
            dispatch(startLoading());
            const response = await universityApi.deleteUniversity(university_id);
            dispatch(stopLoading());

            switch (response.status) {
                case 200:
                    dispatch(notify({ message: "Xóa đề thi thành công", options: { variant: 'success' } }));
                    return university_id;
                default:
                    throw new Error("Lỗi kết nối");
            }

        } catch (error) {
            dispatch(notify({ message: `${error}`, options: { variant: 'error' } }));
            dispatch(stopLoading());
            return null;
        }
    });

export const universitySlice = createSlice({
    name: 'university',
    initialState: {
        listUniversitys: [],
        isUniversityDialogOpen: false,
        universityEditing: null,
        // {
        //     id: null,
        //     university_name: "abc",
        //     question: 12,
        //     total_score: 123,
        // }
        detailedChosenUniversity: null
    },

    reducers: {
        closeUniversityFormDialog: state => {
            state.universityEditing = null;
            state.isUniversityDialogOpen = false;
        },

        createUniversity: (state) => {
            state.universityEditing = null;
            state.isUniversityDialogOpen = true;
        },

        editUniversity: (state, action) => {
            const universityInfo = action.payload;
            console.log(universityInfo);
            state.isUniversityDialogOpen = true;
            state.universityEditing = universityInfo;
        },

        chooseUniversity: (state, action) => {
            const detailedChosenUniversity = action.payload;
            state.detailedChosenUniversity = detailedChosenUniversity;
        }
    },

    extraReducers: {
        [fetchUniversityRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            console.log(response_data);
            if (response_data === null) return;

            let universitys = response_data;

            //chuyển đổi schema
            // let universitys = response_data.rows.map((element)=>{
            //     const {id,name,maxScore,totalQuestionUserMustDo,countQuestion} =  element;
            //     return {
            //         id:id,
            //         university_name:name,
            //         question: totalQuestionUserMustDo,
            //         total_score:maxScore,
            //         available_question:countQuestion
            //     }    
            // }
            // )

            state.listUniversitys = [...universitys];

        },
        [createUniversityRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { data, universityInfo } = response_data;
            console.log(response_data);
            const { id } = data;
            const newListUniversitys = [
                ...state.listUniversitys,
                {
                    ...universityInfo,
                    available_question: 0,
                    id: id
                }
            ]
            state.listUniversitys = newListUniversitys;
        },
        [updateUniversityRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;

            const { universityInfo } = response_data;
            console.log(universityInfo);
            const newListUniversitys = state.listUniversitys.map((university) => {
                if (university.id === universityInfo.id)
                    return {
                        ...university,
                        ...universityInfo
                    }
                else
                    return { ...university };
            })

            state.listUniversitys = newListUniversitys;
        },
        [deleteUniversityRequest.fulfilled]: (state, action) => {
            const response_data = action.payload;
            if (response_data === null) return;
            const university_id = response_data;

            const newListUniversitys = state.listUniversitys.filter((university) => university.id !== university_id);

            state.listUniversitys = newListUniversitys;
        }
    }
})

export const { chooseUniversity, closeUniversityFormDialog, createUniversity, editUniversity } = universitySlice.actions;

export default universitySlice.reducer;