import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Dropdown } from 'react-bootstrap';
import Pagination from '../Pagination';
import Search from '../Pagination/Search';
import SortOrder from '../Pagination/SortOrder';
import noimage from '../../../images/no-img-avatar.png';
import dateToLocalString from '../../../utils/date';

function Parents({
  parents,
  query,
  onHandCheckAllRows,
  onCheckOneRow,
  sortOrder,
  onDeleteParent,
  pagination,
}) {

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
          <div className="col-xl-12">
            <div className="page-title flex-wrap">
              <Search query={query} waitTime={2000} />
              <div className="d-flex">
                <SortOrder sortOrder={sortOrder} />
                <Button as={Link} to="/parents/new" type="primary">
                  + New Parent
                </Button>
              </div>
            </div>
          </div>
          <div className="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
            <div className="table-responsive full-data">
              <div id="example-student_wrapper" className="dataTables_wrapper no-footer">
                <table className="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer" id="example-student">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="checkAll"
                          onClick={() => onHandCheckAllRows()}
                        />
                      </th>
                      <th>Name</th>
                      <th>Created At</th>
                      <th>City</th>
                      <th>Contact</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parents.map(({ attributes: item }) => (
                      <tr key={item.id}>
                        <td>
                          <div className="checkbox me-0 align-self-center">
                            <div className="custom-control custom-checkbox ">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`stud-${item.id}`}
                                checked={item.inputchecked}
                                onChange={() => onCheckOneRow(item.id)}
                              />
                              <label className="custom-control-label" htmlFor={`stud-${item.id}`} />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="trans-list">
                            <img src={item.avatar || noimage} alt="" className="avatar avatar-sm me-3" />
                            <h4>{`${item.first_name}${item.middle_name ? ` ${item.middle_name} ` : ' '}${item.last_name}`}</h4>
                          </div>
                        </td>
                        <td>
                          <div className="date">{dateToLocalString(item.created_at)}</div>
                        </td>
                        <td><h6 className="mb-0">{item.city}</h6></td>
                        <td>
                          <div className="d-flex">
                            <div className="icon-box icon-box-sm bg-light me-2">
                              <a href={item.mobile_phone ? `tel:${item.mobile_phone}` : '#'}>
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M18.4401 11C18.2201 11 17.9901 10.93 17.7701 10.88C17.3246 10.7818 16.8868 10.6515 16.4601 10.49C15.9962 10.3212 15.4862 10.33 15.0284 10.5146C14.5706 10.6992 14.1972 11.0466 13.9801 11.49L13.7601 11.94C12.7861 11.3982 11.8911 10.7252 11.1001 9.94001C10.3149 9.14902 9.64192 8.254 9.1001 7.28L9.5201 7.00001C9.96347 6.78292 10.3109 6.40954 10.4955 5.9517C10.6801 5.49386 10.6889 4.98392 10.5201 4.52001C10.3613 4.09243 10.231 3.6548 10.1301 3.21001C10.0801 2.99001 10.0401 2.76001 10.0101 2.53001C9.88867 1.82563 9.51973 1.18775 8.96972 0.731245C8.41972 0.274742 7.7248 0.0296143 7.0101 0.0400054H4.0101C3.57913 0.0359589 3.15235 0.124819 2.75881 0.300536C2.36527 0.476253 2.01421 0.734701 1.72953 1.05829C1.44485 1.38187 1.23324 1.763 1.10909 2.17572C0.984942 2.58844 0.95118 3.02306 1.0101 3.45001C1.54284 7.63939 3.45613 11.5319 6.44775 14.5126C9.43938 17.4934 13.3388 19.3925 17.5301 19.91H17.9101C18.6475 19.9111 19.3595 19.6405 19.9101 19.15C20.2265 18.867 20.4792 18.5202 20.6516 18.1323C20.8239 17.7445 20.9121 17.3244 20.9101 16.9V13.9C20.8979 13.2054 20.6449 12.5366 20.1944 12.0077C19.744 11.4788 19.1239 11.1226 18.4401 11ZM18.9401 17C18.9399 17.142 18.9095 17.2823 18.8509 17.4116C18.7923 17.5409 18.7068 17.6563 18.6001 17.75C18.4884 17.8465 18.3577 17.9185 18.2165 17.9616C18.0753 18.0047 17.9267 18.0177 17.7801 18C14.035 17.5198 10.5563 15.8065 7.89282 13.1303C5.2293 10.4541 3.53251 6.96734 3.0701 3.22001C3.05419 3.07352 3.06813 2.92534 3.1111 2.7844C3.15407 2.64346 3.22517 2.51269 3.3201 2.40001C3.41381 2.29334 3.52916 2.20785 3.65848 2.14922C3.7878 2.0906 3.92812 2.06019 4.0701 2.06001H7.0701C7.30265 2.05483 7.52972 2.13088 7.71224 2.27508C7.89476 2.41927 8.02131 2.62258 8.0701 2.85001C8.1101 3.12334 8.1601 3.39334 8.2201 3.66001C8.33562 4.18715 8.48936 4.70518 8.6801 5.21001L7.2801 5.86001C7.1604 5.91493 7.05272 5.99295 6.96326 6.0896C6.87379 6.18625 6.8043 6.29962 6.75877 6.4232C6.71324 6.54678 6.69257 6.67814 6.69795 6.80973C6.70332 6.94132 6.73464 7.07055 6.7901 7.19C8.2293 10.2728 10.7073 12.7508 13.7901 14.19C14.0336 14.29 14.3066 14.29 14.5501 14.19C14.6748 14.1454 14.7894 14.0765 14.8873 13.9872C14.9851 13.8979 15.0643 13.7901 15.1201 13.67L15.7401 12.27C16.2571 12.4549 16.7847 12.6085 17.3201 12.73C17.5868 12.79 17.8568 12.84 18.1301 12.88C18.3575 12.9288 18.5608 13.0553 18.705 13.2379C18.8492 13.4204 18.9253 13.6475 18.9201 13.88L18.9401 17Z" fill="var(--primary)" />
                                </svg>
                              </a>
                            </div>
                            <div className="icon-box icon-box-sm bg-light">
                              <a href={item.email ? `mailto:${item.email}` : '#'}>
                                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M19 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.31607 1.44129 0 2.20435 0 3V13C0 13.7956 0.31607 14.5587 0.87868 15.1213C1.44129 15.6839 2.20435 16 3 16H19C19.7956 16 20.5587 15.6839 21.1213 15.1213C21.6839 14.5587 22 13.7956 22 13V3C22 2.20435 21.6839 1.44129 21.1213 0.87868C20.5587 0.316071 19.7956 0 19 0ZM20 12.75L15.1 8.35L20 4.92V12.75ZM2 4.92L6.9 8.35L2 12.75V4.92ZM8.58 9.53L10.43 10.82C10.5974 10.9361 10.7963 10.9984 11 10.9984C11.2037 10.9984 11.4026 10.9361 11.57 10.82L13.42 9.53L18.42 14H3.6L8.58 9.53ZM3 2H19C19.1857 2.00149 19.3674 2.05467 19.5245 2.15358C19.6817 2.25249 19.8083 2.39322 19.89 2.56L11 8.78L2.11 2.56C2.19171 2.39322 2.31826 2.25249 2.47545 2.15358C2.63265 2.05467 2.81428 2.00149 3 2Z" fill="var(--primary)" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <Dropdown className="custom-dropdown float-end">
                            <Dropdown.Toggle className="i-false btn sharp tp-btn " as="div">
                              <svg width="24" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0012 0.359985C11.6543 0.359985 11.3109 0.428302 10.9904 0.561035C10.67 0.693767 10.3788 0.888317 10.1335 1.13358C9.88829 1.37883 9.69374 1.67 9.56101 1.99044C9.42828 2.31089 9.35996 2.65434 9.35996 3.00119C9.35996 3.34803 9.42828 3.69148 9.56101 4.01193C9.69374 4.33237 9.88829 4.62354 10.1335 4.8688C10.3788 5.11405 10.67 5.3086 10.9904 5.44134C11.3109 5.57407 11.6543 5.64239 12.0012 5.64239C12.7017 5.64223 13.3734 5.36381 13.8686 4.86837C14.3638 4.37294 14.6419 3.70108 14.6418 3.00059C14.6416 2.3001 14.3632 1.62836 13.8677 1.13315C13.3723 0.637942 12.7004 0.359826 12 0.359985H12.0012ZM3.60116 0.359985C3.25431 0.359985 2.91086 0.428302 2.59042 0.561035C2.26997 0.693767 1.97881 0.888317 1.73355 1.13358C1.48829 1.37883 1.29374 1.67 1.16101 1.99044C1.02828 2.31089 0.959961 2.65434 0.959961 3.00119C0.959961 3.34803 1.02828 3.69148 1.16101 4.01193C1.29374 4.33237 1.48829 4.62354 1.73355 4.8688C1.97881 5.11405 2.26997 5.3086 2.59042 5.44134C2.91086 5.57407 3.25431 5.64239 3.60116 5.64239C4.30165 5.64223 4.97339 5.36381 5.4686 4.86837C5.9638 4.37294 6.24192 3.70108 6.24176 3.00059C6.2416 2.3001 5.96318 1.62836 5.46775 1.13315C4.97231 0.637942 4.30045 0.359826 3.59996 0.359985H3.60116ZM20.4012 0.359985C20.0543 0.359985 19.7109 0.428302 19.3904 0.561035C19.07 0.693767 18.7788 0.888317 18.5336 1.13358C18.2883 1.37883 18.0937 1.67 17.961 1.99044C17.8283 2.31089 17.76 2.65434 17.76 3.00119C17.76 3.34803 17.8283 3.69148 17.961 4.01193C18.0937 4.33237 18.2883 4.62354 18.5336 4.8688C18.7788 5.11405 19.07 5.3086 19.3904 5.44134C19.7109 5.57407 20.0543 5.64239 20.4012 5.64239C21.1017 5.64223 21.7734 5.36381 22.2686 4.86837C22.7638 4.37294 23.0419 3.70108 23.0418 3.00059C23.0416 2.3001 22.7632 1.62836 22.2677 1.13315C21.7723 0.637942 21.1005 0.359826 20.4 0.359985H20.4012Z" fill="#A098AE" />
                              </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-end" align="end">
                              <Dropdown.Item as={Link} to={`${item.id}/edit`} role="button">Edit</Dropdown.Item>
                              <Dropdown.Item as={Link} to={`${item.id}`}>View</Dropdown.Item>
                              <Dropdown.Item as={Button} onClick={() => onDeleteParent(item.id)} variant="link"> Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination pagination={pagination} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Parents.propTypes = {
  onDeleteParent: PropTypes.func.isRequired,
  onCheckOneRow: PropTypes.func.isRequired,
  onHandCheckAllRows: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  pagination: PropTypes.shape({
    count: PropTypes.number,
    current_page: PropTypes.number,
    next_page: PropTypes.oneOfType([
      PropTypes.number,
    ]),
    per_page: PropTypes.number,
    previous_page: PropTypes.oneOfType([PropTypes.number]),
    total_entries: PropTypes.number,
    total_pages: PropTypes.number,
  }).isRequired,
  parents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    attributes: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      first_name: PropTypes.string,
      middle_name: PropTypes.string,
      last_name: PropTypes.string,
      no_control: PropTypes.string,
      mobile_phone: PropTypes.string,
      created_at: PropTypes.string,
      parent_names: PropTypes.arrayOf(
        PropTypes.string,
      ),
    }),
  })).isRequired,
};

export default Parents;
