# Examples for Using the Trrack Provenance Tracking Library 

This is a collection of examples demonstrating how to use the [trrack](https://github.com/visdesignlab/trrack) provenance tracking library. Many of the examples also utilize [trrack-vis](https://github.com/visdesignlab/trrack-vis) to visualize the provenance graph produced by Trrack. Each examples are heavily commented for the parts of the code relevant to provenance tracking, and a brief overview of what can be found in each example is below.

A live version of the examples can be accessed [here](http://vdl.sci.utah.edu/trrack-examples/)

## Basic Javascript Only Examples

## Typescipt Examples

## [simpleExample](http://vdl.sci.utah.edu/trrack-examples/examples/simpleExample)

- Basic library creation, use of initProvenance.
- Defining a state for your application
- Setting up observers to track your state
- Creating and applying actions to edit your state
- Utilizing the trrack-vis library to visualize your history.

## [simpleExampleAddAnnotation](http://vdl.sci.utah.edu/trrack-examples/examples/simpleExampleAddAnnotation)

- Adding annotations to nodes in your provenance graph
- Creating and using "Extra" objects to be added to specific nodes

## [simpleExampleEphemeral](http://vdl.sci.utah.edu/trrack-examples/examples/simpleExampleEphemeral)

- Using the ephemeral keyword when creating actions
- Using goBackToNonEphemeral() and goForwardToNonEphemeral() to skip ephemeral nodes.
- Bunching ephemeral nodes together in the trrack-vis library

## [lesMisExample](http://vdl.sci.utah.edu/trrack-examples/examples/lesMisExample)

- Storing the state of your application in the URL to share your state easily
- Slightly more complex example of setting up state, observers and actions.

## [lesMisExampleFirebaseIntegration](http://vdl.sci.utah.edu/trrack-examples/examples/lesMisExampleFirebaseIntegration)

- Using the provenance library to easily store nodes into a firebase realtime database

## [reactLesMisExample](http://vdl.sci.utah.edu/provenance-lib-core-demo/)

- Integrating provenance into a react based application
