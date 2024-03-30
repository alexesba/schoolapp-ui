import PropTypes from 'prop-types';
import useProgramActions from '../../../store/actions/programActions';

function Subjects({ subjects: { data } }) {
  const { getProgramByIds } = useProgramActions();

  const subjects = getProgramByIds(data?.map((program) => program.id));

  return (subjects && subjects.programs
    && (
      <div className="contact-icon">
        {subjects.programs.map(({ attributes: program }) => (
          <span className="badge badge-success light mx-2" key={program.id}>
            {program.name}
          </span>
        ))}
      </div>
    )
  );
}

Subjects.propTypes = {
  subjects: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
    })),
  }).isRequired,
};
// <span className="badge badge-secondary light mx-2">Science</span>
// <span className="badge badge-danger light">Art</span>

export default Subjects;
