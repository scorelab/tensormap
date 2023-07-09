import React from "react";
import {Button, Icon, Modal, Header} from 'semantic-ui-react';

import * as strings from "../../constants/Strings";

const ModalComponent = ({ modalOpen, modelClose, sucess,Modalmessage,modalText="" }) => {
    const successModelButton = strings.PROCESS_SUCCESS_MODEL_BUTTON;
    const failModelButton = strings.PROCESS_FAIL_MODEL_BUTTON;
  
    return (
      <Modal open={modalOpen} onClose={modelClose} basic size='small'>
        <Header
          icon={sucess ? 'check circle' : 'exclamation'}
          content={Modalmessage}
        />
         {!sucess && <Header.Subheader content={modalText} />}
        <Modal.Actions>
          <Button
            color={sucess ? 'green' : 'red'}
            onClick={modelClose}
            inverted
          >
            <Icon name='checkmark' /> {sucess ? successModelButton : failModelButton}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };
  
  export default ModalComponent;
