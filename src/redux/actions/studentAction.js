import axios from "axios";

// Ten hanh dong
export const GET_ALL_STUDENTS_LOADING = "student@GET_ALL_STUDENTS_LOADING";
export const GET_ALL_STUDENTS_SUCCESS = "student@GET_ALL_STUDENTS_SUCCESS";
export const GET_ALL_STUDENTS_FAILURE = "student@GET_ALL_STUDENTS_FAILURE";
export const DELETE_STUDENT = "student@DELETE_STUDENT";

// Define hanh dong se gui len cho reducer tiep nhan
// not Pure object: khong phai object nguyen thuy -> moi phai dung middleware de xu ly: redux-thunk
export const getAllStudents = () => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_STUDENTS_LOADING });

        try {
            const dulieu = await axios.get("http://localhost:3000/sinhvien");

            if (dulieu.data.length > 0) {
                dispatch({ type: GET_ALL_STUDENTS_SUCCESS, payload: dulieu.data });
            }
        } catch (error) {
            dispatch({ type: GET_ALL_STUDENTS_FAILURE, payload: "Kết nối với BE thất bại!!!" });
        }
    };
};

export const addNewStudent = (newStudent) => {
    axios.post("http://localhost:3000/sinhvien", {
        id: newStudent.id,
        hoten: newStudent.hoten,
        mssv: newStudent.mssv,
        diachi: newStudent.diachi,
        tuoi: newStudent.tuoi,
        mota: newStudent.mota
    });
}

export const deleteStudent = (deleteStudentId) => {
    return async (dispatch) => {
        axios.delete(`http://localhost:3000/sinhvien/${deleteStudentId}`);
        try {
            const dulieu = await axios.get("http://localhost:3000/sinhvien");

            if (dulieu.data.length > 0) {
                dispatch({ type: GET_ALL_STUDENTS_SUCCESS, payload: dulieu.data });
            }
        } catch (error) {
            dispatch({ type: GET_ALL_STUDENTS_FAILURE, payload: "Kết nối với BE thất bại!!!" });
        }
    };
}