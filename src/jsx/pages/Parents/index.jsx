import { Suspense, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner';
import useParentActions from '../../../store/actions/parentActions';
import parentsAtom from '../../../store/atoms/parentsAtom';
import Parents from '../../components/Parent/Parents';

function ParentsIndex() {
  const { getAll } = useParentActions();
  const [queryParams] = useSearchParams();
  const { parents, pagination } = useRecoilValue(parentsAtom);
  const currentPage = useMemo(() => queryParams.get('page') || 1, [queryParams]);
  const query = useMemo(() => queryParams.get('q') || '', [queryParams]);
  const sortOrder = useMemo(() => queryParams.get('order') || 'desc', [queryParams]);

  const deleteParent = () => { };
  const checkOneRow = () => { };
  const checkAllRows = () => { };

  useEffect(() => {
    getAll({ q: query, page: currentPage, order: sortOrder });
  }, [query, currentPage, sortOrder]);

  return (parents
    && (
      <Suspense fallback={<LoaderSpinner />}>
        <Parents
          query={query}
          parents={parents}
          onDeleteParent={deleteParent}
          onCheckOneRow={checkOneRow}
          onHandCheckAllRows={checkAllRows}
          pagination={pagination}
          sortOrder={sortOrder}
        />
      </Suspense>
    )
  );
}

export default ParentsIndex;
