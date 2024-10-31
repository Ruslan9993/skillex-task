import { Select } from "antd";

const { Option } = Select;

const SortOptions = ({ savedSort, handleSortChange }) => (
    <div className="sort-section" style={{ marginTop: "1rem" }}>
        <h4>Sort by</h4>
        <Select
            value={savedSort}
            onChange={handleSortChange}
            style={{ width: "100%" }}
        >
            <Option value="price-asc">Price: Low to High</Option>
            <Option value="price-desc">Price: High to Low</Option>
            <Option value="rating-asc">Rating: Low to High</Option>
            <Option value="rating-desc">Rating: High to Low</Option>
        </Select>
    </div>
);

export default SortOptions;
