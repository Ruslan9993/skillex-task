import { makeAutoObservable, runInAction } from "mobx";
import fetchProducts from "../api";

class ProductStore {
    products = [];
    filteredProducts = [];
    loading = false;
    filters = JSON.parse(localStorage.getItem("filters")) || {};
    sortBy = localStorage.getItem("sort") || "";
    page = 1;
    total = 0;
    limit = 5;

    constructor() {
        makeAutoObservable(this);
        void this.loadProducts();
    }

    async loadProducts() {
        this.setLoading(true);
        const response = await fetchProducts(this.page, this.limit);
        runInAction(() => {
            this.products = response.data;
            this.total = response.total;
            this.filteredProducts = this.applyFiltersAndSort();
            this.setLoading(false);
        });
    }

    setLoading(value) {
        this.loading = value;
    }

    setFilters(filters) {
        this.filters = filters;
        localStorage.setItem("filters", JSON.stringify(filters));
        this.filteredProducts = this.applyFiltersAndSort();
    }

    setSortBy(sortBy) {
        this.sortBy = sortBy;
        localStorage.setItem("sort", sortBy);
        this.filteredProducts = this.applyFiltersAndSort();
    }

    setPage(page) {
        this.page = page;
        void this.loadProducts();
    }

    applyFiltersAndSort() {
        let filtered = this.products;

        const { category, brands, priceRange } = this.filters;
        if (category) {
            filtered = filtered.filter((product) => product.category === category);
        }
        if (brands && brands.length > 0) {
            filtered = filtered.filter((product) => brands.includes(product.brand));
        }
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange;
            filtered = filtered.filter(
                (product) => product.price >= minPrice && product.price <= maxPrice
            );
        }

        if (this.sortBy) {
            filtered = filtered.slice().sort((a, b) => {
                switch (this.sortBy) {
                    case "price-asc":
                        return a.price - b.price;
                    case "price-desc":
                        return b.price - a.price;
                    case "rating-asc":
                        return a.rating - b.rating;
                    case "rating-desc":
                        return b.rating - a.rating;
                    default:
                        return 0;
                }
            });
        }

        return filtered;
    }
}

export default ProductStore;
