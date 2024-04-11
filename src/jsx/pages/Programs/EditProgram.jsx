import { useParams } from 'react-router-dom';
import useProgramActions from '../../../store/actions/programActions';
import ProgramForm from '../../components/Program/Form/ProgramForm';

function EditProgram() {
  const { id: programId } = useParams();
  const { getOneAsync: getProgram, update } = useProgramActions();

  const program = getProgram(programId);
  let levelPrograms = program?.relationships?.level_programs?.data?.map(
    ({ id }) => ({ id, program_id: program?.id, level_id: null }),
  );

  if (levelPrograms?.length === 0) {
    levelPrograms = [{ id: null, level_id: null, program_id: program?.id }];
  }

  const initialValues = {
    id: programId,
    name: program?.attributes?.name,
    description: program?.attributes?.description,
    alpha_2_code: program?.attributes?.alpha_2_code,
    organization_id: program?.attributes?.organization_id,
    level_programs_attributes: levelPrograms,
  };

  const submitAction = (programFormParams) => {
    // console.log(programFormParams);
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
