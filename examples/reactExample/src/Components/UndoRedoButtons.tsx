import React, {FC} from 'react';
import Store from '../Interfaces/Store';
import {Button} from 'semantic-ui-react';
import {inject, observer} from 'mobx-react';
import {actions} from '..';

interface OwnProps {
  store?: Store;
}

export type Props = OwnProps;

const UndoRedoButtons: FC<Props> = ({store}: Props) => {
  const {isAtRoot, isAtLatest} = store!;

  return (
    <Button.Group size="large">
      <Button
        icon="undo"
        primary
        content="Undo"
        disabled={isAtRoot}
        onClick={actions.goBack}></Button>
      <Button.Or></Button.Or>
      <Button
        icon="redo"
        secondary
        content="Redo"
        disabled={isAtLatest}
        onClick={actions.goForward}></Button>
    </Button.Group>
  );
};

export default inject('store')(observer(UndoRedoButtons));
