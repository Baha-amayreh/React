import React from 'react';
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders the component with the correct text', () => {
    const { getByText } = render(<MyComponent text="Hello, world!" />);
    expect(getByText('Hello, world!')).toBeInTheDocument();
});