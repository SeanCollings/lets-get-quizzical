import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import QuizQuestion from './quiz-question';

interface ISButton {
  showDisabled: boolean;
}

const SContainer = styled.div`
  width: 95%;
  text-align: center;
`;
const SButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const SButton = styled.button<ISButton>`
  -webkit-tap-highlight-color: transparent;
  margin: 5px;
  background: #ffc0cb;
  color: #581845;
  border: 1px solid #fffaf0;
  height: 52px;
  width: 105px;
  opacity: 1;
  padding: 6px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.875rem;
  overflow: hidden;

  opacity: ${({ showDisabled }) => (showDisabled ? 0.6 : 1)};

  :active {
    background: #ffc0cbcc;
  }
`;
const SText = styled.div`
  color: #dedede;
  margin-bottom: 20px;
`;

interface IQuizData {
  question: string;
  answer: string;
}
interface IQuizContent {
  quizzes: IQuizData[];
}

const QuizContent: FC<IQuizContent> = ({ quizzes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    answer: '',
  });

  useEffect(() => {
    setCurrentQuestion(quizzes[currentIndex]);
  }, [quizzes, currentIndex]);

  const onBackClick = () => {
    if (currentIndex <= 0) {
      return;
    }
    setCurrentIndex((curr) => curr - 1);
  };

  const onNextClick = () => {
    if (currentIndex + 1 === quizzes.length) {
      return;
    }
    setCurrentIndex((curr) => curr + 1);
  };

  if (!quizzes.length) {
    return <SText>Quizzes empty, yo!</SText>;
  }

  return (
    <SContainer>
      <SText>{`Question: ${currentIndex + 1}/${quizzes.length}`}</SText>
      <QuizQuestion content={currentQuestion} />
      <SButtonContainer>
        <SButton onClick={onBackClick} showDisabled={currentIndex === 0}>
          Back
        </SButton>
        <SButton
          onClick={onNextClick}
          showDisabled={currentIndex + 1 === quizzes.length}
        >
          Next
        </SButton>
      </SButtonContainer>
    </SContainer>
  );
};

export default QuizContent;
