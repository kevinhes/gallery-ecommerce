import PropTypes from 'prop-types';

export default function Pagination({ pagination, changeProductPage }) {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={(event) =>
              changeProductPage(
                event,
                pagination.current_page - 1,
                pagination.total_pages
              )
            }
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {[...Array(pagination.total_pages).keys()].map((page) => {
          return (
            <li className="page-item" key={page}>
              <a
                className="page-link"
                href="#"
                onClick={(event) =>
                  changeProductPage(event, page + 1, pagination.total_pages)
                }
              >
                {page + 1}
              </a>
            </li>
          );
        })}
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={(event) =>
              changeProductPage(
                event,
                pagination.current_page + 1,
                pagination.total_pages
              )
            }
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.object,
  changeProductPage: PropTypes.func,
};
