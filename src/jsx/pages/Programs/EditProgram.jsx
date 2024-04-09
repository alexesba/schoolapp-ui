import { useParams } from 'react-router-dom';
import useProgramActions from '../../../store/actions/programActions';
import ProgramForm from '../../components/Program/Form/ProgramForm';

function EditProgram() {
  const { id: programId } = useParams();
  const { getOneAsync: getProgram, update } = useProgramActions();

  const program = getProgram(programId);

  const initialValues = {
    id: programId,
    name: program?.attributes?.name,
    description: program?.attributes?.description,
    alpha_2_code: program?.attributes?.alpha_2_code,
    organization_id: program?.attributes?.organization_id,
  };

  const submitAction = (programFormParams) => {
    update(programFormParams);
  };

  return (program
    && (
      <ProgramForm
        initialValues={initialValues}
        submitAction={submitAction}
      />
    )
  );
}

export default EditProgram;
