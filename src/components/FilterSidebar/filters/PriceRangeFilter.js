import { Slider } from "antd";

const PriceRangeFilter = ({ priceRange, setPriceRange }) => (
    <div className="filter-section">
        <h4>Price Range</h4>
        <Slider
            range
            min={0}
            max={500}
            value={priceRange}
            onChange={(value) => setPriceRange(value)}
        />
    </div>
);

export default PriceRangeFilter;
