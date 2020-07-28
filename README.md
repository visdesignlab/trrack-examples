# provenance-examples

All of the examples can be accessed [here](http://vdl.sci.utah.edu/trrack-examples/)

This is a collection of examples for the [trrack](https://github.com/visdesignlab/trrack) project. Many of the examples also utilize [trrack-vis](https://github.com/visdesignlab/trrack-vis) to visualize the provenance graph produced by trrack. Each example is heavily commented around areas that are utilizing trrack, and a brief overview of what can be found in each example is below.

## simpleExample

- Basic library creation, use of initProvenance.
- Defining a State for your application
- Setting up observers to track your state
- Creating and applying actions to edit your state
- Utilizing the trrack-vis library to visualize your history.

## simpleExampleAddAnnotation

- Adding annotations to nodes in your provenance graph
- Creating and using "Extra" objects to be added to specific nodes

## simpleExampleEphemeral

- Using the ephemeral keyword when creating actions
- Using goBackToNonEphemeral() and goForwardToNonEphemeral() to skip ephemeral nodes.
- Bunching ephemeral nodes together in the trrack-vis library

## lesMisExample

- Storing the state of your application in the URL to share your state easily
- Slightly more complex example of setting up state, observers and actions.

## lesMisExampleFirebaseIntegration

- Using the provenance library to easily store nodes into a firebase realtime database

## reactLesMisExample

- Integrating provenance into a react based application
