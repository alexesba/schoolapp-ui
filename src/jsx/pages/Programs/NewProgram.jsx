import ProgramForm from "../../components/Program/Form/ProgramForm";

function NewProgram() {
  const initialValues = {
    name: undefined,
    alpha_2_code: undefined,
    description: undefined,
  }

  const handleSubmit = (values) => console.log(values);

  return (
    <ProgramForm
      initialValues={initialValues}
      submitAction={handleSubmit}
    />
  );
}

export default NewProgram;
