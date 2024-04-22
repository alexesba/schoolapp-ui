import { Fragment, useEffect, useMemo } from 'react';
import { Row, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import levelsAtom from '../../../../store/atoms/levelsAtom';
import LevelProgram from './LevelProgram';
import useLevelActions from '../../../../store/actions/levelActions';

function LevelProgramFields({
  levelProgramsAttributes, removeLevelProgram, addLevelProgram, updateLevelProgram,
}) {
  const { getValues } = useFormContext();
  const selectedOptions = getValues('level_programs_attributes');
  const { getAll: getLevels } = useLevelActions();
  const { levels } = useRecoilValue(levelsAtom);

  const LEVELS = useMemo(() => levels.map(
    ({ attributes: { id, name } }) => ({ label: name, value: String(id) }),
  ), [levels]);

  console.log('LEVELS', LEVELS, 'levels', levels);

  const canAddMore = selectedOptions?.length < LEVELS?.length;

  useEffect(() => {
    getLevels({ order: 'asc' });
  }, []);

  return (
    <Card>
      <Card.Header>
        <Card.Title>Level Program's</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          {
            levelProgramsAttributes.map((field, index) => (
              <LevelProgram
                key={field.objId}
                field={field}
                index={index}
                remove={removeLevelProgram}
                levelOptions={LEVELS}
                update={updateLevelProgram}
              />
            ))
          }
        </Row>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Button variant="default" type="button" onClick={addLevelProgram} disabled={!canAddMore}>
            <i className="bi bi-plus-circle-dotted" />
            <span>Program Level</span>
          </Button>
        </Row>
      </Card.Footer>
    </Card>

  );
}
LevelProgramFields.propTypes = {
  levelProgramsAttributes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      objId: PropTypes.string,
    }),
  ).isRequired,
};
export default LevelProgramFields;
