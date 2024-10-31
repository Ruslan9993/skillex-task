import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from '../components/ProductList';

describe('ProductList', () => {
    it('renders products when provided', () => {
        const mockProducts = [{ id: 1, name: 'Wireless Headphones' }];
        render(<ProductList products={mockProducts} />);

        expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    });

    it('displays "No Products Found" message when no products are passed', () => {
        render(<ProductList products={[]} />);

        expect(screen.queryByText('No Products Found')).toBeInTheDocument();
    });
});
