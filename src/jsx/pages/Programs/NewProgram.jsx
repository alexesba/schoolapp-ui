import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import ProgramForm from '../../components/Program/Form/ProgramForm';
import currentUserAtom from '../../../store/atoms/currentUserAtom';
import useProgramActions from '../../../store/actions/programActions';

function NewProgram() {
  const currentUser = useRecoilValue(currentUserAtom);
  const navigate = useNavigate();
  const { create } = useProgramActions();

  const initialValues = {
    id: '',
    name: '',
    alpha_2_code: '',
    description: '',
    organization_id: currentUser.organization_id,
  };

  const submitAction = async (programFormParams) => {
    const { status, program } = await create(programFormParams);

    if (status === 200) {
      navigate(`/programs/${program.id}/edit`);
    }
  };

  return (
    <ProgramForm
      initialValues={initialValues}
      submitAction={submitAction}
    />
  );
}

export default NewProgram;
