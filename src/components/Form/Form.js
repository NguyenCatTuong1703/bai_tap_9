import React from 'react'
import './Form.scss'

export default function Form(props) {
    return (
        <div className="form">
            <span className="form__title">Form nhập thông tin sinh viên</span>
            <span id="idStudentEdit" className="id-student-edit"></span>
            <form className="form__content" name="studentForm" >
                <div className="form__control">
                    <label htmlFor="hoten" className="form__control-label">Họ tên</label>
                    <input id="hoten" name="hoten" type="text" className="form__control-input" placeholder="Họ tên" required />
                </div>
                <div className="form__control">
                    <label htmlFor="mssv" className="form__control-label">MSSV</label>
                    <input id="mssv" name="mssv" type="text" className="form__control-input" placeholder="12345"
                        maxLength="5" required />
                </div>
                <div className="form__control">
                    <label htmlFor="diachi" className="form__control-label">Địa chỉ</label>
                    <input id="diachi" name="diachi" type="text" className="form__control-input" placeholder="Hà Nội" required />
                </div>
                <div className="form__control">
                    <label htmlFor="tuoi" className="form__control-label">Tuổi</label>
                    <input id="tuoi" name="tuoi" type="number" className="form__control-input" placeholder="Tuổi"
                        min="18" max="100" required />
                </div>
                <div className="form__control form__control--fullwidth">
                    <label htmlFor="mota" className="form__control-label">Mô tả</label>
                    <textarea id="mota" name="mota" rows="5" className="form__control-input" placeholder="FE Developer" required></textarea>
                </div>
            </form>
            <div className="button-group">
                <button
                    className={props.isAddMode ? "btn btn-add" : "btn btn-save"}
                    onClick={props.isAddMode ? props.handleAddNewStudent : props.handleUpdateStudent}
                >
                    {props.isAddMode ? "add new student" : "save changes"}
                </button>
                <button className="btn btn-cancel" style={props.isAddMode ? { display: "none" } : { display: "block" }} onClick={props.handleCancelUpdate}>hủy</button>
            </div>
        </div>
    )
}
