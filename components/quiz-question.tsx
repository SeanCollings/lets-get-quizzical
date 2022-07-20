import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

const MEDIA_MOBILE = 360;
const MEDIA_DESKTOP = 361;

interface ISHole {
  top: number;
}

const SOuterContainer = styled.div`
  display: flex;
  height: 300px;
  background: repeating-linear-gradient(
      #fffaf0,
      #ffffff 24px,
      #9198e5 26px,
      #9198e5 16px
    )
    0px 13px;
  overflow: auto;
  filter: drop-shadow(4px 4px 6px black);
  min-width: 200px;
  max-width: 500px;
  margin: auto;
  position: relative;
`;
const SContainer = styled.div`
  -webkit-tap-highlight-color: transparent;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 100%;
  text-align: left;
`;
const SHeader = styled.div`
  margin-top: 12px;
  font-size: 22px;
  text-decoration: underline;
  letter-spacing: 0.0075em;
  font-weight: 500;
  padding-left: 4px;

  @media (max-width: ${MEDIA_MOBILE}px) {
    margin-top: 14px;
  }
  @media (min-width: ${MEDIA_DESKTOP}px) {
    margin-top: 12px;
  }
`;
const SContent = styled.div`
  padding: 0px 12px 0 4px;
  line-height: 1.63;

  @media (max-width: ${MEDIA_MOBILE}px) {
    margin-top: 26px;
  }
  @media (min-width: ${MEDIA_DESKTOP}px) {
    margin-top: 26px;
  }
`;
const SMargin = styled.div`
  border-right: 2px solid rgba(255, 194, 204, 0.4);
  width: 50px;
  height: 300px;
`;
const SHole = styled.div<ISHole>`
  width: 20px;
  height: 20px;
  background: #7a1141;
  border-radius: 50%;
  position: absolute;
  left: 12px;

  top: ${({ top }) => top}px;
`;

interface IQuizData {
  content: {
    question: string;
    answer: string;
  };
}

const QuizQuestion: FC<IQuizData> = ({ content }) => {
  const [isQuestion, setIsQuestion] = useState(true);

  useEffect(() => {
    setIsQuestion(true);
  }, [content]);

  const onClickHandler = () => {
    setIsQuestion(!isQuestion);
  };

  return (
    <SOuterContainer>
      <SMargin />
      <SHole top={54} />
      <SHole top={240} />
      <SContainer onClick={onClickHandler}>
        <SHeader>{isQuestion ? 'Question:' : 'Answer:'}</SHeader>
        <SContent>{isQuestion ? content.question : content.answer}</SContent>
      </SContainer>
    </SOuterContainer>
  );
};

export default QuizQuestion;
