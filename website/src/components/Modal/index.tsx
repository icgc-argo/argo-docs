/** @jsx jsx */
import { jsx } from '@emotion/core';
import ModalComp, { ModalContainer } from '@icgc-argo/uikit/Modal';
import { withTheme } from 'emotion-theming';
import styled from '@emotion/styled';

const StyledCont = styled(ModalContainer)`
  max-width: 75%;
`;

const Modal = withTheme((props) => <ModalComp ContainerEl={StyledCont} {...props} />);

export default Modal;
