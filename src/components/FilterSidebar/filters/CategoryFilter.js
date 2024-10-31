import { Checkbox } from "antd";

const CategoryFilter = ({ category, setCategory }) => (
    <div className="filter-section">
        <h4>Category</h4>
        <Checkbox.Group
            options={["Electronics", "Footwear", "Clothing"]}
            value={category ? [category] : []}
            onChange={(value) => setCategory(value[0] || null)}
        />
    </div>
);

export default CategoryFilter;
