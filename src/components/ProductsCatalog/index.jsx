import FilterSidebar from "../FilterSidebar/index";
import ProductList from "../ProductList";
import {Spin, Pagination, Empty, Select} from "antd";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/StoreProvider";

import "../../styles/index.scss";

const ProductCatalog = observer(() => {
    const { productStore } = useStore();
    const { filteredProducts, loading, total, page, setPage } = productStore;

    return (
        <div className="product-catalog">
            <FilterSidebar />

            {loading ? (
                <Spin size="large" style={{ display: "block", margin: "2rem auto" }} />
            ) : filteredProducts.length === 0 ? (
                <Empty description="No products found" style={{ marginTop: "2rem" }} />
            ) : (
                <div className="products">
                    <ProductList products={filteredProducts} />
                    <div className="pagination-container">
                        <Pagination
                            current={page}
                            total={total}
                            pageSize={productStore.limit}
                            onChange={setPage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
});

export default ProductCatalog;