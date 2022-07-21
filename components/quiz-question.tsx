import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

const MEDIA_MOBILE = 420;
const MEDIA_DESKTOP = 421;
const TOP_HOLE_POSITION = 54;
const BOTTOM_HOLE_POSITION = 240;

type TCard = 'question' | 'answer';

interface ISCardContainer {
  showAnswer: boolean;
  quickTransition: boolean;
}
interface ISCard {
  type: TCard;
}
interface ISHole {
  top: number;
  isQuestion: boolean;
}

const SOuterContainer = styled.div`
  perspective: 1000px;
`;
const SCardContainer = styled.div<ISCardContainer>`
  margin: auto;
  transition: transform 0.6s ease 0s;
  min-width: 200px;
  max-width: 500px;
  height: 300px;

  position: relative;
  transform-style: preserve-3d;

  transform: ${({ showAnswer }) =>
    showAnswer ? 'rotateY(180deg)' : 'rotateY(0deg)'};
  transition: transform
    ${({ quickTransition }) => (quickTransition ? '0s' : '0.6s')};
`;
const SCard = styled.div<ISCard>`
  display: flex;
  width: 100%;
  background: repeating-linear-gradient(
      #fffaf0,
      #ffffff 24px,
      #9198e5 26px,
      #9198e5 16px
    )
    0px 13px;
  overflow: auto;
  filter: drop-shadow(4px 4px 6px black);

  position: absolute;
  backface-visibility: hidden;

  ${({ type }) => type === 'question' && `transform: rotateY(0deg)`};
  ${({ type }) => type === 'answer' && `transform: rotateY(180deg)`};
`;
const SCardContent = styled.div`
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
  border-left: 1px solid #ffc2cc66;
  width: 50px;
  position: absolute;
  right: 0;
`;
const SHole = styled.div<ISHole>`
  width: 20px;
  height: 20px;
  background: #761241;
  border-radius: 50%;
  position: absolute;
  box-shadow: inset 2px 2px 6px black;

  top: ${({ top }) => top}px;
  ${({ isQuestion }) => (isQuestion ? 'left: 12px' : 'right: 12px')};
  ${({ isQuestion, top }) =>
    !isQuestion && top === BOTTOM_HOLE_POSITION && `background: #9b1139`};
  ${({ isQuestion, top }) =>
    isQuestion && top === BOTTOM_HOLE_POSITION && `background: #840c3c`};
`;

interface IQuizData {
  content: {
    question: string;
    answer: string;
  };
}
interface ICard {
  type: TCard;
  content: string;
}

const Card: FC<ICard> = ({ type, content }) => {
  return (
    <SCard type={type}>
      <SMargin />
      <SHole top={TOP_HOLE_POSITION} isQuestion={type === 'question'} />
      <SHole top={BOTTOM_HOLE_POSITION} isQuestion={type === 'question'} />
      <SCardContent>
        <SHeaderWrapper>
          <SHeader>{type === 'question' ? 'Question:' : 'Answer:'}</SHeader>
          <SHeaderFaint>
            {type === 'question' ? 'Answer:' : 'Question:'}
          </SHeaderFaint>
        </SHeaderWrapper>
        <SContent>{content}</SContent>
      </SCardContent>
      <SMarginFaint />
    </SCard>
  );
};

const QuizQuestion: FC<IQuizData> = ({ content }) => {
  const [isQuestion, setIsQuestion] = useState(true);
  const [quickTransition, setQuickTransition] = useState(false);

  useEffect(() => {
    setIsQuestion(true);
    setQuickTransition(true);
  }, [content]);

  const onClickHandler = () => {
    setIsQuestion(!isQuestion);
    quickTransition && setQuickTransition(false);
  };

  return (
    <SOuterContainer>
      <SCardContainer
        showAnswer={!isQuestion}
        quickTransition={quickTransition}
        onClick={onClickHandler}
      >
        <Card type="question" content={content.question} />
        <Card type="answer" content={content.answer} />
      </SCardContainer>
    </SOuterContainer>
  );
};

export default QuizQuestion;
