import { Fragment, useEffect, useState } from "react";
import { Col } from 'react-bootstrap';
import { useFormContext } from "react-hook-form";
import Input from "../../Forms/FormField/Input";
import SelectInput from "../../Forms/FormField/SelectInput";
import PropTypes from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image";
import useLevelProgramActions from "../../../../store/actions/levelProgramActions";

const removeLevelProgramSelectedLevels = (currentValue, currentOptionsSelected) => (option) => {
  const selectedOptions = currentOptionsSelected.filter(
    (selectedOption) => String(selectedOption.level_id) !== currentValue,
  );
  return !selectedOptions.find(
    (selectedOption) => String(selectedOption.level_id) === option.value,
  );
};

function LevelProgram({ field, index, remove, levelOptions }) {
  const { getValues, setValue } = useFormContext();
  const fieldName = (name) => `level_programs_attributes[${index}].${name}`;
  const selectedOptions = getValues('level_programs_attributes');
  const { getOneAsync: getOne } = useLevelProgramActions();
  const levelIdFieldName = fieldName('level_id')
  const currentValue = getValues(levelIdFieldName);

  const levelProgram = getOne(field.id);

  useEffect(() => {
    if (field.id && !field.level_id && levelProgram) {
      const { attributes } = levelProgram;
      Object.keys(attributes).forEach((propName) => {
        console.log(fieldName(propName), String(attributes[propName]));
        setValue(fieldName(propName), String(attributes[propName]))
      });
    }
  }, [levelProgram]);

  return (
    <Fragment key={field?.id || index}>
      <Col md={2}>
        <Input
          name={fieldName('id')}
          hidden
          label="Id"
        />
        <SelectInput
          name={fieldName('level_id')}
          label="Level"
          options={
            levelOptions.filter(removeLevelProgramSelectedLevels(currentValue, selectedOptions))
          }
        />
        <Input
          name={fieldName('program_id')}
          hidden
          label="Program Id"
        />
      </Col>
      <Col md="1">
        {index !== 0
          && (
            <i
              className="bi bi-x-circle cursor-pointer pl-10"
              onClick={() => remove(index)}
            />
          )}
      </Col>
    </Fragment>
  );
}
LevelProgram.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  levelOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,
};

export default LevelProgram;
