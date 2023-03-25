import React, { useEffect } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByCategory } from '../../store/categorySlice';
import { useParams, Link } from 'react-router-dom';
import "./CategoryPage.scss";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { catProductSingle: products, catProductSingleStatus: status } = useSelector((state) => state.category);
  console.log("This is Product:");
  console.log(products);

  useEffect(() => {
    dispatch(fetchProductsByCategory(id, 'single'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="category-page">
      <div className="container">
        <div>
          <ul className="breadcrumb-items">
            <li >
              <Link to="/">
                <div style={{ display: "flex", flexDirection: "row" ,paddingRight:6}}>
                  <div>
                    <b><p><i>Back</i></p></b>
                  </div>
                  <div>
                    <i className="fas fa-home"></i>
                  </div>
                </div>
                {/* <span className = "breadcrumb-separator">
                    <i className = "fas fa-chevron-right"></i>
                  </span> */}
              </Link>
            </li>
            {/* <li>
                Category
                <span className = "breadcrumb-separator">
                  <i className = "fas fa-chevron-right"></i>
                </span>
              </li>
              <li>
                { products[0] && products[0].category.name}
              </li> */}
          </ul>
        </div>
      </div>
      <ProductList products={products} status={status} />
    </div>
  )
}

export default CategoryPage