import axios from "axios";

// Ten hanh dong
export const GET_ALL_STUDENTS_LOADING = "student@GET_ALL_STUDENTS_LOADING";
export const GET_ALL_STUDENTS_SUCCESS = "student@GET_ALL_STUDENTS_SUCCESS";
export const GET_ALL_STUDENTS_FAILURE = "student@GET_ALL_STUDENTS_FAILURE";

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
            dispatch({ type: GET_ALL_STUDENTS_FAILURE, payload: "Kết nối BE thất bại!!!" });
        }
    };
};

export const addNewStudent = (newStudent) => {
    return async () => {
        axios.post("http://localhost:3000/sinhvien", {
            id: newStudent.id,
            hoten: newStudent.hoten,
            mssv: newStudent.mssv,
            diachi: newStudent.diachi,
            tuoi: newStudent.tuoi,
            mota: newStudent.mota
        });
    };

}

export const deleteStudent = (deleteStudentId) => {
    return async () => {
        axios.delete(`http://localhost:3000/sinhvien/${deleteStudentId}`);  
    };
}

export const updateStudent = (updateStudent) => {
    return async () => {
        axios.put(`http://localhost:3000/sinhvien/${updateStudent.id}`, {
            hoten: updateStudent.hoten,
            mssv: updateStudent.mssv,
            diachi: updateStudent.diachi,
            tuoi: updateStudent.tuoi,
            mota: updateStudent.mota
        })
    };
}