import { Suspense, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner';
import Courses from '../../components/Course/Courses';
import useCourseActions from '../../../store/actions/courseActions';
import coursesAtom from '../../../store/atoms/courseAtom';

function CoursesIndex() {
  const { getAll } = useCourseActions();
  const [queryParams] = useSearchParams();
  const { courses, pagination } = useRecoilValue(coursesAtom);
  const currentPage = useMemo(() => queryParams.get('page') || 1, [queryParams]);
  const query = useMemo(() => queryParams.get('q') || '', [queryParams]);
  const sortOrder = useMemo(() => queryParams.get('order') || 'desc', [queryParams]);

  useEffect(() => {
    getAll({ q: query, page: currentPage, order: sortOrder });
  }, [query, currentPage, sortOrder]);

  const deleteCourse = () => {}
  const checkOneRow = () => {}
  const checkAllRows = () => {}

  return (
    <Suspense fallback={<LoaderSpinner />}>
      <Courses
        query={query}
        courses={courses}
        onDeleteCourse={deleteCourse}
        onCheckOneRow={checkOneRow}
        onHandCheckAllRows={checkAllRows}
        pagination={pagination}
        sortOrder={sortOrder}
      />
    </Suspense>
  );
}

export default CoursesIndex;
