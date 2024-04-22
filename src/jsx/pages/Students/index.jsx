import {
  Suspense, useEffect, useMemo, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Dropdown } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';

import swal from 'sweetalert';
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner';
import studentsAtom from '../../../store/atoms/studentsAtom';
import useStudentActions from '../../../store/actions/studentActions';
import Students from '../../components/Student/Students';

function StudentsIndex() {
  const { getAll, destroy } = useStudentActions();
  const [queryParams] = useSearchParams();
  const { students, pagination } = useRecoilValue(studentsAtom);
  const currentPage = useMemo(() => queryParams.get('page') || 1, [queryParams]);
  const sortOrder = useMemo(() => queryParams.get('order') || 'desc', [queryParams]);
  const query = useMemo(() => queryParams.get('q') || '', [queryParams]);
  const [checked, setChecked] = useState(students);
  const [unchecked, setUnChecked] = useState(true);

  const checkOneRow = (id) => {
    const temp = checked.map((data) => {
      if (id === data.id) {
        return { ...data, inputchecked: !data.inputchecked };
      }
      return data;
    });
    setChecked(temp);
  };

  const deleteStudent = async (studentId) => {
    const willDelete = await swal({
      title: 'Are you sure?',
      text:
        'Once deleted, you will not be able to recover this record!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });

    if (willDelete) {
      const status = await destroy(studentId);
      if (status === 204) {
        getAll({ q: query, page: currentPage, order: sortOrder });
      }
    }
  };

  const checkAllRows = (value) => {
    const temp = checked.map((data) => ({ ...data, inputchecked: value }));
    setChecked(temp);
    setUnChecked(!unchecked);
  };

  useEffect(() => {
    getAll({ q: query, page: currentPage, order: sortOrder });
  }, [query, currentPage, sortOrder]);

  return (students
    && (
    <Suspense fallback={<LoaderSpinner />}>
      <Students
        query={query}
        students={students}
        onDeleteStudent={deleteStudent}
        onCheckOneRow={checkOneRow}
        onCheckAllRows={checkAllRows}
        pagination={pagination}
        sortOrder={sortOrder}
      />
    </Suspense>
    )
  );
}
export default StudentsIndex;
