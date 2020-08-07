/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import ModalComp from '@icgc-argo/uikit/Modal';
import { withTheme } from 'emotion-theming';
import styled from '@emotion/styled';

const StyledModal = styled(ModalComp)``;

const Modal = withTheme((props) => <StyledModal {...props} />);

export default Modal;
