import { Suspense, useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner';
import Teachers from '../../components/Teacher/Teachers';
import teachersAtom from '../../../store/atoms/teachersAtom';
import useTeacherActions from '../../../store/actions/teacherActions';
import swal from 'sweetalert';

function TeachersIndex() {
  const { getAll, destroy } = useTeacherActions();
  const [queryParams] = useSearchParams();
  const { teachers, pagination } = useRecoilValue(teachersAtom);
  const currentPage = useMemo(() => queryParams.get('page') || 1, [queryParams]);
  const query = useMemo(() => queryParams.get('q') || '', [queryParams]);
  const sortOrder = useMemo(() => queryParams.get('order') || 'desc', [queryParams]);

  const deleteTeacher = async(teacherId) => {
    const willDelete = await swal({
      title: 'Are you sure?',
      text:
        'Once deleted, you will not be able to recover this record!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });

    if (willDelete) {
      const status = await destroy(teacherId);
      if (status === 204) {
        getAll({ q: query, page: currentPage, order: sortOrder });
      }
    }
  };
  const checkOneRow = () => { };
  const checkAllRows = () => { };

  useEffect(() => {
    getAll({ q: query, page: currentPage, order: sortOrder });
  }, [query, currentPage, sortOrder]);

  return (teachers
    && (
      <Suspense fallback={<LoaderSpinner />}>
        <Teachers
          query={query}
          teachers={teachers}
          onDeleteTeacher={deleteTeacher}
          onCheckOneRow={checkOneRow}
          onHandCheckAllRows={checkAllRows}
          pagination={pagination}
          sortOrder={sortOrder}
        />
      </Suspense>
    )
  );
}

export default TeachersIndex;
