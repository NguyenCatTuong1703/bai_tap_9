import React from 'react'
import './View.scss'

export default function View(props) {
    return (
        <div className="view">
            <span className="view__title">Bảng thông tin sinh viên</span>
            <table className="table">
                <thead className="table__header">
                    <tr>
                        <th>ID</th>
                        <th>Họ tên</th>
                        <th>MSSV</th>
                        <th>Địa chỉ</th>
                        <th>Tuổi</th>
                        <th>Mô tả</th>
                        <th>Chỉnh sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                {props.isLoading
                    ? (<tbody><tr><td colSpan="8" style={{ textAlign: 'center' }}><h3>Loading...</h3></td></tr></tbody>)
                    : (
                        <tbody className="table__body">
                            {
                                props.studentsList.length > 0
                                    ? props.studentsList.map((student, index) => (
                                        <tr className="table__body-row" key={index}>
                                            <td>{student.id}</td>
                                            <td>{student.hoten}</td>
                                            <td>{student.mssv}</td>
                                            <td>{student.diachi}</td>
                                            <td>{student.tuoi}</td>
                                            <td>{student.mota}</td>
                                            <td>
                                                <button className="btn btn-edit" onClick={() => props.handleEditStudent(student)}>
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-delete" onClick={() => props.handleDeleteStudent(student)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    : <tr><td colSpan="8" className="error">{props.error}</td></tr>
                            }
                        </tbody>
                    )}
            </table>
        </div>
    )
}
