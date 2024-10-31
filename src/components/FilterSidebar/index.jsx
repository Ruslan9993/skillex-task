import { useState, useEffect } from "react";
import { Button, Drawer } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store/StoreProvider";
import CategoryFilter from "./filters/CategoryFilter";
import BrandFilter from "./filters/BrandFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import SortOptions from "./filters/SortOptions";

const FilterSidebar = observer(() => {
    const { productStore } = useStore();
    const savedFilters = productStore.filters;
    const savedSort = productStore.sortBy;

    const [category, setCategory] = useState(savedFilters.category || null);
    const [brands, setBrands] = useState(savedFilters.brands || []);
    const [priceRange, setPriceRange] = useState(savedFilters.priceRange || [0, 500]);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [isApplyDisabled, setIsApplyDisabled] = useState(true);

    const showDrawer = () => setIsDrawerVisible(true);
    const closeDrawer = () => setIsDrawerVisible(false);

    useEffect(() => {
        const hasFilters = category || brands.length > 0 || priceRange[0] > 0 || priceRange[1] < 500;
        setIsApplyDisabled(!hasFilters);
    }, [category, brands, priceRange]);

    const handleApplyFilters = () => {
        const filters = { category, brands, priceRange };
        productStore.setFilters(filters);
        closeDrawer();
    };

    const handleResetFilters = () => {
        setCategory(null);
        setBrands([]);
        setPriceRange([0, 500]);
        productStore.setFilters({});
    };

    const handleSortChange = (value) => {
        productStore.setSortBy(value);
    };

    return (
        <div className="filter-sidebar">
            <Button className="mobile-filter-btn" type="primary" onClick={showDrawer}>
                Filters
            </Button>
            <div className="filters-content desktop-only">
                <h3>Filters</h3>

                <CategoryFilter category={category} setCategory={setCategory} />
                <BrandFilter brands={brands} setBrands={setBrands} />
                <PriceRangeFilter priceRange={priceRange} setPriceRange={setPriceRange} />

                <div className="filter-buttons">
                    <Button type="primary" onClick={handleApplyFilters} disabled={isApplyDisabled}>
                        Apply Filters
                    </Button>
                    <Button onClick={handleResetFilters} style={{ marginLeft: "8px" }}>
                        Reset Filters
                    </Button>
                </div>

                <SortOptions savedSort={savedSort} handleSortChange={handleSortChange} />
            </div>
            <Drawer
                title="Filters"
                placement="left"
                closable
                onClose={closeDrawer}
                open={isDrawerVisible}
            >
                <CategoryFilter category={category} setCategory={setCategory} />
                <BrandFilter brands={brands} setBrands={setBrands} />
                <PriceRangeFilter priceRange={priceRange} setPriceRange={setPriceRange} />
                <div className="filter-buttons">
                    <Button type="primary" onClick={handleApplyFilters} disabled={isApplyDisabled}>
                        Apply Filters
                    </Button>
                    <Button onClick={handleResetFilters} style={{ marginLeft: "8px" }}>
                        Reset Filters
                    </Button>
                </div>
                <SortOptions savedSort={savedSort} handleSortChange={handleSortChange} />
            </Drawer>
        </div>
    );
});

export default FilterSidebar;