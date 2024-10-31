import { Card, Rate } from "antd";

const ProductCard = ({ product }) => {
    return (
        <Card
            hoverable
            cover={<img alt={product.name} src={product.imageUrl} />}
            title={product.name}
        >
            <p>Category: {product.category}</p>
            <p>Brand: {product.brand}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <Rate disabled defaultValue={product.rating} />
        </Card>
    );
};

export default ProductCard;
