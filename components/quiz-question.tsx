import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

const MEDIA_MOBILE = 420;
const MEDIA_DESKTOP = 421;

interface ISHole {
  top: number;
  isQuestion: boolean;
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
const SHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SHeaderFaint = styled(SHeader)`
  padding-right: 4px;
  margin-right: 50px;
  transform: scale(-1, 1);
  opacity: 0.1;
`;
const SContent = styled.div`
  padding: 0px 12px 0 4px;
  line-height: 1.63;
  z-index: 1;

  @media (max-width: ${MEDIA_MOBILE}px) {
    margin-top: 28px;
  }
  @media (min-width: ${MEDIA_DESKTOP}px) {
    margin-top: 26px;
  }
`;
const SMargin = styled.div`
  border-right: 1px solid #ffc2cc;
  width: 50px;
  height: 300px;
`;
const SMarginFaint = styled.div`
  height: 300px;
  border-left: 1px solid rgb(255 194 204 / 0.4);
  width: 50px;
  position: absolute;
  right: 0;
`;
const SHole = styled.div<ISHole>`
  width: 20px;
  height: 20px;
  background: #7a1141;
  border-radius: 50%;
  position: absolute;
  ${({ isQuestion }) => (isQuestion ? 'left: 12px' : 'right: 12px')};

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
      <SHole top={54} isQuestion={isQuestion} />
      <SHole top={240} isQuestion={isQuestion} />
      <SContainer onClick={onClickHandler}>
        <SHeaderWrapper>
          <SHeader>{isQuestion ? 'Question:' : 'Answer:'}</SHeader>
          <SHeaderFaint>{!isQuestion ? 'Question:' : 'Answer:'}</SHeaderFaint>
        </SHeaderWrapper>
        <SContent>{isQuestion ? content.question : content.answer}</SContent>
      </SContainer>
      <SMarginFaint />
    </SOuterContainer>
  );
};

export default QuizQuestion;
