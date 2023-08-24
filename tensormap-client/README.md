## Frontend setup and architecture
========

TensorMap is a web application that allows users to create machine learning algorithms visually. The front-end of TensorMap is built using ReactJS. This documentation provides an overview of the different components of the Tensor Map front-end app and how they work.

### Installation instructions

To use the TensorMap Frontend App, you need to have Node.js and NPM (Node Package Manager) installed on your system. Follow the steps below to install and run the TensorMap Frontend App:

1.  Install the dependencies by running `npm install` in the project directory.
2.  Start the development server by running `npm start` in the project directory.
3.  Open [http://localhost:3000](http://localhost:3000/) in your web browser to access the TensorMap app.

### Usage
Follow the steps below to create your machine learning algorithm:

1.  Open the TensorMap Frontend App in your web browser.
2.  Add New Dataset to the TensorMap by using Data Upload Interface.
3.  Preprocess the data in the Data Processing Tab. 
4.  Drag and drop components from the sidebar onto the canvas to create your model.
5.  Edit the properties of the selected component on the canvas to customize your algorithm.
6.  Preview your algorithm in the preview window to see how it will perform.

## Testing

For the front end, `Jest` is used for testing. All the configurations and sample tests are added in the `__tests__` directory located inside the `components` directory. To run the rests simply run `npm run test` in the terminal.
