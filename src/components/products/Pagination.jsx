import PropTypes from 'prop-types';

export default function Pagination({ pagination, changeProductPage }) {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            type='button'
            aria-label="Previous"
            onClick={() =>
              changeProductPage(
                {
                  page: pagination.current_page - 1,
                  maxPage: pagination.total_pages
                }
              )
            }
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {[...Array(pagination.total_pages).keys()].map((page) => {
          return (
            <li className="page-item" key={page}>
              <button
                className="page-link"
                type='button'
                onClick={() =>
                  changeProductPage({ page: page + 1, maxPage: pagination.total_pages })
                }
              >
                {page + 1}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <button
            className="page-link"
            type='button'
            aria-label="Next"
            onClick={() =>
              changeProductPage(
                {
                  page: pagination.current_page + 1,
                  maxPage: pagination.total_pages
                }
              )
            }
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.object,
  changeProductPage: PropTypes.func,
};
