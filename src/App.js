import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from './components/Form/Form';
import View from './components/View/View';
import "./App.scss";
import { addNewStudent, deleteStudent, updateStudent, getAllStudents } from "./redux/actions/studentAction";

function App() {

  const dispatch = useDispatch();

  const { isLoading, studentsList, error } = useSelector((state) => state.student);

  const layDuLieu = () => dispatch(getAllStudents());

  useEffect(() => {
    layDuLieu();
  }, []);

  const [isAddMode, setIsAddMode] = useState(true);

  const handleAddNewStudent = () => {
    const newId = Math.trunc(Math.random());
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
      var erorrAdd = ''

      for (let i = 0; i < studentsList.length; i++) {
        const element = studentsList[i];
        if (element.mssv === newStudent.mssv) {
          erorrAdd = 'MSSV đã tồn tại! Vui lòng nhập lại!'
          alert(erorrAdd);
          break;
        }
      }

      if (erorrAdd === '') {
        const action = addNewStudent(newStudent);
        dispatch(action);
        window.location.reload();
      }
    }
  }

  const handleDeleteStudent = (student) => {
    if (window.confirm("Xóa sinh viên này?")) {
      const deleteStudentId = student.id;

      const action = deleteStudent(deleteStudentId);
      dispatch(action);
      window.location.reload();
    }
  }

  const handleEditStudent = (student) => {
    document.documentElement.scrollTop = 0;
    document.getElementById('idStudentEdit').innerText = student.id;
    document.getElementById('hoten').value = student.hoten;
    document.getElementById('mssv').value = student.mssv;
    document.getElementById('diachi').value = student.diachi;
    document.getElementById('tuoi').value = student.tuoi;
    document.getElementById('mota').value = student.mota;

    setIsAddMode(false);
  }

  const handleCancelUpdate = () => {
    document.getElementById('idStudentEdit').innerText = null;
    document.getElementById('hoten').value = null;
    document.getElementById('mssv').value = null;
    document.getElementById('diachi').value = null;
    document.getElementById('tuoi').value = null;
    document.getElementById('mota').value = null;

    setIsAddMode(true);
  }

  const handleUpdateStudent = () => {
    const Id = document.getElementById('idStudentEdit').innerText;
    const hoten = document.forms["studentForm"]["hoten"].value;
    const mssv = document.forms["studentForm"]["mssv"].value;
    const diachi = document.forms["studentForm"]["diachi"].value;
    const tuoi = document.forms["studentForm"]["tuoi"].value;
    const mota = document.forms["studentForm"]["mota"].value;

    if (hoten !== '' && mssv !== '' && diachi !== '' && tuoi > 18 && tuoi < 100 && mota !== '') {
      const newStudent = {
        id: Number(Id),
        hoten: hoten,
        mssv: mssv,
        diachi: diachi,
        tuoi: tuoi,
        mota: mota,
      }

      var erorrAdd = ''

      for (let i = 0; i < studentsList.length; i++) {
        const element = studentsList[i];
        if (element.id !== newStudent.id) {
          if (element.mssv === newStudent.mssv) {
            erorrAdd = 'MSSV đã tồn tại! Vui lòng nhập lại!'
            alert(erorrAdd);
            break;
          }
        }
      }

      if (erorrAdd === '') {
        const action = updateStudent(newStudent);
        dispatch(action);
        window.location.reload();
      }
    }
  }

  return (
    <div className="App">
      <Form
        isAddMode={isAddMode}
        handleAddNewStudent={handleAddNewStudent}
        handleCancelUpdate={handleCancelUpdate}
        handleUpdateStudent={handleUpdateStudent}
      />

      <View
        isLoading={isLoading}
        studentsList={studentsList}
        handleEditStudent={handleEditStudent}
        handleDeleteStudent={handleDeleteStudent}
        error={error}
      />
    </div>
  );
}

export default App;