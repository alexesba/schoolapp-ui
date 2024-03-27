import { Suspense, useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner';
import Teachers from '../../components/Teacher/Teachers';
import teachersAtom from '../../../store/atoms/teachersAtom';
import useTeacherActions from '../../../store/actions/teacherActions';

function TeachersIndex() {
  const { getAll } = useTeacherActions();
  const [queryParams] = useSearchParams();
  const { teachers, pagination } = useRecoilValue(teachersAtom);
  const currentPage = useMemo(() => queryParams.get('page') || 1, [queryParams]);
  const query = useMemo(() => queryParams.get('q') || '', [queryParams]);
  const sortOrder = useMemo(() => queryParams.get('order') || 'desc', [queryParams]);

  const deleteTeacher = () => { };
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
