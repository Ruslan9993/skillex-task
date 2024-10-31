import productsData from "../Mocks/mockData";

const fetchProducts = (page = 1, limit = 5) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const start = (page - 1) * limit;
            const end = start + limit;
            const paginatedData = productsData.slice(start, end);

            resolve({
                data: paginatedData,
                total: productsData.length,
                page,
                limit,
            });
        }, 500);
    });
};

export default fetchProducts;
