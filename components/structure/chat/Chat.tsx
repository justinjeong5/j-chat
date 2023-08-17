import Dialog from "components/structure/chat/Dialog";
import Textator from "components/structure/chat/Textator";
import { Divider } from "antd";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
`;

export default function Chat() {
  return (
    <Container>
      <Dialog />
      <Divider />
      <Textator />
    </Container>
  );
}
