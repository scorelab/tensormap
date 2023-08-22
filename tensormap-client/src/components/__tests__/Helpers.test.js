import { enableValidateButton, generateModelJSON, InitialFormState } from '../DragAndDropCanvas/Helpers';

describe('Utility Functions', () => {

    describe('enableValidateButton', () => {
        it('should return true if any necessary parameter is missing', () => {
            const formState = { ...InitialFormState };
            const modelData = { edges: [], nodes: [] };
            expect(enableValidateButton(formState, modelData)).toBe(true);
        });

    });

    describe('generateModelJSON', () => {
        it('should remove unwanted properties from nodes and edges', () => {
            const model_data = {
                nodes: [{
                    id: 'a', 
                    width: 100, 
                    height: 100,
                    position: {},
                    positionAbsolute: {},
                    selected: true,
                    dragging: true,
                    data: { label: "Label A" }
                }],
                edges: [{
                    source: 'a',
                    target: 'b',
                    sourceHandle: 'handle1',
                    targetHandle: 'handle2',
                    id: 'edge1'
                }],
                viewport: {}
            };
            const result = generateModelJSON(model_data);

           
            expect(result.nodes[0].width).toBeUndefined();
            expect(result.nodes[0].height).toBeUndefined();
            expect(result.nodes[0].position).toBeUndefined();
            expect(result.nodes[0].positionAbsolute).toBeUndefined();
            expect(result.nodes[0].selected).toBeUndefined();
            expect(result.nodes[0].dragging).toBeUndefined();
            expect(result.nodes[0].data.label).toBeUndefined();

            expect(result.edges[0].sourceHandle).toBeUndefined();
            expect(result.edges[0].targetHandle).toBeUndefined();
            expect(result.edges[0].id).toBeUndefined();

            expect(result.viewport).toBeUndefined();
        });
    });
});
