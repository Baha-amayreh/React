import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('renders the component with initial count of 0', () => {
    const { getByText } = render(<Counter />);
    expect(getByText('Count: 0')).toBeInTheDocument();
});

test('increments and decrements the count when the buttons are clicked', () => {
    const { getByText } = render(<Counter />);
    const incrementButton = getByText('Increment');
    const decrementButton = getByText('Decrement');

    fireEvent.click(incrementButton);
    expect(getByText('Count: 1')).toBeInTheDocument();

    fireEvent.click(decrementButton);
    expect(getByText('Count: 0')).toBeInTheDocument();

    fireEvent.click(decrementButton);
    expect(getByText('Count: -1')).toBeInTheDocument();
});
