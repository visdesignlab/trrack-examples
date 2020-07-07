# provenance-examples

This is a collection of examples for the [provenance-lib-core](https://github.com/visdesignlab/provenance-lib-core) project. Each example is heavily commented around areas that are utilizing provenance, and a brief overview of what can be found in each example is below.

## simpleExample

- Basic library creation, use of initProvenance.
- Defining a State for your application
- Setting up observers to track your state
- Creating and applying actions to edit your state
- Utilizing the ProvVis library to visualize your history.

## simpleExampleAddAnnotation

- Adding annotations to nodes in your provenance graph
- Creating and using "Extra" objects to be added to specific nodes

## simpleExampleEphemeral

- Using the ephemeral keyword when creating actions
- Using goBackToNonEphemeral() and goForwardToNonEphemeral() to skip ephemeral nodes.
- Bunching ephemeral nodes together in the ProvVis library

## lesMisExample

- Storing the state of your application in the URL to share your state easily
- Slightly more complex example of setting up state, observers and actions.

## lesMisExampleFirebaseIntegration

- Using the provenance library to easily store nodes into a firebase realtime database
