import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { addNewStudent, deleteStudent, getAllStudents } from "./redux/actions/studentAction";

function App() {

  const dispatch = useDispatch();

  const { isLoading, studentsList, error } = useSelector((state) => state.student);

  const layDuLieu = () => dispatch(getAllStudents());

  useEffect(() => {
    layDuLieu();
  }, []);

  const randomId = () => {
    return Math.trunc(Math.random());
  }
  const newId = randomId();

  const handleAddNewStudent = () => {
    const hoten = document.forms["studentForm"]["hoten"].value;
    const mssv = document.forms["studentForm"]["mssv"].value;
    const diachi = document.forms["studentForm"]["diachi"].value;
    const tuoi = document.forms["studentForm"]["tuoi"].value;
    const mota = document.forms["studentForm"]["mota"].value;

    if (hoten !== '' && mssv !== '' && diachi !== '' && tuoi > 18 && tuoi < 100 && mota !== '') {
      const newStudent = {
        id: newId,
        hoten: hoten,
        mssv: mssv,
        diachi: diachi,
        tuoi: tuoi,
        mota: mota,
      }

      const action = addNewStudent(newStudent);
      dispatch(action);
    }
  }

  const handleDeleteStudent = (student) => {
    console.log("Delete: ", student.id);
    const deleteStudentId = student.id;
    const action = deleteStudent(deleteStudentId);
    dispatch(action);
  }

  const handleEditStudent = (student) => {
    console.log("Edit: ", student);
    
  }

  return (
    <div className="App">
      <div className="form">
        <h3 className="form__title">Form nhập thông tin sinh viên</h3>
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
          <input type="submit" value="Save Changes" className="btn btn-save" onClick={handleAddNewStudent} />
        </form>
      </div>

      <div className="view">
        <h3 className="view__title">Bảng thông tin sinh viên</h3>
        <table className="table">
          <thead className="table__header">
            <tr>
              <th className="table__header-title">ID</th>
              <th className="table__header-title">Họ tên</th>
              <th className="table__header-title">MSSV</th>
              <th className="table__header-title">Địa chỉ</th>
              <th className="table__header-title">Tuổi</th>
              <th className="table__header-title">Mô tả</th>
              <th className="table__header-title">Chỉnh sửa</th>
              <th className="table__header-title">Xóa</th>
            </tr>
          </thead>
          {isLoading
            ? (<tbody><tr><td colSpan="8" style={{ textAlign: 'center' }}><h3>Loading...</h3></td></tr></tbody>)
            : (
              <tbody className="table__body">
                {
                  studentsList.length > 0
                    ? studentsList.map((student, index) => (
                      <tr className="table__body-row" key={index}>
                        <td className="table__body-id">{student.id}</td>
                        <td className="table__body-name">{student.hoten}</td>
                        <td className="table__body-mssv">{student.mssv}</td>
                        <td className="table__body-diachi">{student.diachi}</td>
                        <td className="table__body-tuoi">{student.tuoi}</td>
                        <td className="table__body-mota">{student.mota}</td>
                        <td><button className="btn btn-edit" onClick={() => handleEditStudent(student)}>Edit</button></td>
                        <td><button className="btn btn-delete" onClick={() => handleDeleteStudent(student)}>Delete</button></td>
                      </tr>
                    ))
                    : <tr><td colSpan="8" style={{ textAlign: 'center' }}>{error}</td></tr>
                }
              </tbody>
            )}
        </table>
      </div>

    </div>
  );
}

export default App;