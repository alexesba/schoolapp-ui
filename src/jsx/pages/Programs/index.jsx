import { Suspense, useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import swal from 'sweetalert';
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner';
import programsAtom from '../../../store/atoms/programsAtom';
import useProgramActions from '../../../store/actions/programActions';
import Programs from '../../components/Program/Programs';

function ProgramIndex() {
  const { getAll, destroy } = useProgramActions();
  const [queryParams] = useSearchParams();
  const { programs, pagination } = useRecoilValue(programsAtom);
  const currentPage = useMemo(() => queryParams.get('page') || 1, [queryParams]);
  const sortOrder = useMemo(() => queryParams.get('order') || 'desc', [queryParams]);
  const query = useMemo(() => queryParams.get('q') || '', [queryParams]);

  const deleteProgram = async (programId) => {
    const willDelete = await swal({
      title: 'Are you sure?',
      text:
        'Once deleted, you will not be able to recover this record!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });

    if (willDelete) {
      const status = await destroy(programId);
      if (status === 204) {
        getAll({ q: query, page: currentPage, order: sortOrder });
      }
    }
  };

  const checkOneRow = () => {
  };

  const checkAllRows = () => {
  };

  useEffect(() => {
    getAll({ q: query, page: currentPage, order: sortOrder });
  }, [query, currentPage, sortOrder]);

  return (programs
    && (
      <Suspense fallback={<LoaderSpinner />}>
        <Programs
          query={query}
          programs={programs}
          onDeleteProgram={deleteProgram}
          onCheckOneRow={checkOneRow}
          onCheckAllRows={checkAllRows}
          pagination={pagination}
          sortOrder={sortOrder}
        />
      </Suspense>
    )
  );
}

export default ProgramIndex;
