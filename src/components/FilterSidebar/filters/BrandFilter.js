import { Checkbox } from "antd";

const BrandFilter = ({ brands, setBrands }) => (
    <div className="filter-section">
        <h4>Brand</h4>
        <Checkbox.Group
            options={["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"]}
            value={brands}
            onChange={(value) => setBrands(value)}
        />
    </div>
);

export default BrandFilter;
