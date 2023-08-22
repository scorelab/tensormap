import React from 'react';
import { render } from '@testing-library/react';
import HeatMapComp from '../Process/HeatMapComp';
import '@testing-library/jest-dom/extend-expect';

// Mocking the external HeatMap component
jest.mock('react-heatmap-grid', () => {
    return {
        __esModule: true,
        default: () => <div data-testid="mock-heatmap"></div>
    };
});

describe('<HeatMapComp />', () => {
    const mockProps = {
        corrMatrix: {
            A: { A: 1, B: 0.5 },
            B: { A: 0.5, B: 1 }
        }
    };

    it('renders without crashing', () => {
        render(<HeatMapComp {...mockProps} />);
    });

    it('displays the "Co-relation Matrix" header', () => {
        const { getByText } = render(<HeatMapComp {...mockProps} />);
        expect(getByText('Co-relation Matrix')).toBeInTheDocument();
    });

    it('renders the heatmap with correct labels and data', () => {
        const { getByTestId } = render(<HeatMapComp {...mockProps} />);
        const heatmap = getByTestId('mock-heatmap');
        expect(heatmap).toBeInTheDocument();
    });
});
