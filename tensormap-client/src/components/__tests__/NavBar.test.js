import React from 'react';
import { render } from '@testing-library/react';
import NavBar from '../Layout/NavBar/NavBar';
import '@testing-library/jest-dom/extend-expect';

describe('<NavBar />', () => {
    it('renders without crashing', () => {
        render(<NavBar />);
    });

    it('renders the logo image correctly', () => {
        const { getByAltText } = render(<NavBar />);
        const logoImg = getByAltText('logo');
        expect(logoImg).toBeInTheDocument();
        expect(logoImg.src).toBe('https://react.semantic-ui.com/logo.png');
    });
});
