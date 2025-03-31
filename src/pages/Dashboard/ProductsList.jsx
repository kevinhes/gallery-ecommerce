import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

// components
import ProductModal from '../../components/adminproduct/ProductModal';
import DeleteProductModal from '../../components/adminproduct/DeleteModal';
import Pagination from '../../components/adminproduct/Pagination';

// actions
import {
  getProductsList,
  getProductsListByPage,
  checkIsLogin
} from '../../helpers/adminProduct';

export default function ProductsList() {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState('create');
  const [tempProduct, setTempProudct] = useState([]);
  const [pagination, setPagination] = useState({});

  const [productsList, setProductsList] = useState([]);
  const productModalRef = useRef(null);
  const deleteProductModalRef = useRef(null);

  const openProductModal = function (modalType, tempProduct) {
    setModalType(modalType);
    setTempProudct(tempProduct);
    productModalRef.current.show();
  };

  const closeProductModal = function () {
    productModalRef.current.hide();
  };

  const openDeleteProductModal = function (tempProduct) {
    setTempProudct(tempProduct);
    deleteProductModalRef.current.show();
  };

  const closeDeleteProductModal = function () {
    deleteProductModalRef.current.hide();
  };

  const changeProductPage = async ( page, maxPage, navigate) => {
    const fetchPageProducts = await getProductsListByPage(page, maxPage,navigate);
    console.log(fetchPageProducts);
    
    if (fetchPageProducts) {
      setProductsList(fetchPageProducts.products);
      setPagination(fetchPageProducts.pagination);
    } else {
      Swal.fire({
        title: '目前沒有下一頁',
        icon: 'warning',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await checkIsLogin(navigate)
      const data = await getProductsListByPage(1,Infinity, navigate);
      setProductsList(data.products);
      setPagination(data.pagination);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    productModalRef.current = new Modal(
      document.querySelector('#productModalRef'),
      {
        backdrop: 'static',
      }
    );
    deleteProductModalRef.current = new Modal(
      document.querySelector('#deleteProductModalRef'),
      {
        backdrop: 'static',
      }
    );
  }, []);

  return (
    <>
      <header className="d-flex justify-content-between align-items-center">
        <h1>產品列表</h1>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => openProductModal('create', {})}
          >
            新增產品
          </button>
        </div>
      </header>
      <section>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">商品名稱</th>
              <th scope="col">商品售價</th>
              <th scope="col">商品原價</th>
              <th scope="col">是否啟用</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map((product, index) => (
              <tr
                key={product.id}
                className={product.is_enabled === 1 ? '' : 'table-secondary'}
              >
                <td> {index + 1} </td>
                <td> {product.title} </td>
                <td>{product.origin_price}</td>
                <td>{product.price}</td>
                <td>{product.is_enabled === 1 ? '是' : '否'}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => openProductModal('edit', product)}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => openDeleteProductModal(product)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          pagination={pagination}
          changeProductPage={changeProductPage}
        />
      </section>
      <ProductModal
        closeProductModal={closeProductModal}
        getProductsList={getProductsList}
        modalType={modalType}
        tempProduct={tempProduct}
        setProductsList={setProductsList}
        setPagination={setPagination}
      />
      <DeleteProductModal
        closeDeleteProductModal={closeDeleteProductModal}
        tempProduct={tempProduct}
        setProductsList={setProductsList}
        setPagination={setPagination}
      />
    </>
  );
}
