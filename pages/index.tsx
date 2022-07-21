import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import QuizContent from '../components/quiz-content';
import { connectToDatabase } from '../util/mongodb';

const WIDTH = 160;
const HEIGHT = 70;

interface ISButtonContainer {
  isFetching: boolean;
}
interface ISStartButton {
  isDisabled: boolean;
}

const SButtonContainer = styled.div<ISButtonContainer>`
  height: ${HEIGHT}px;
  width: ${WIDTH}px;
  position: relative;
`;
const SStartButton = styled.button<ISStartButton>`
  -webkit-tap-highlight-color: transparent;
  color: #721342;
  width: 100%;
  height: 100%;
  border: 1px solid #581845;
  background: #fffaf0;
  padding: 6px 8px;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  border-radius: 8px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :active {
    background: #cfcac1;
  }

  :disabled {
    color: #58184566;
  }
`;
const SLoaderSVG = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
`;
const SRect = styled.rect`
  fill: transparent;
  stroke-width: 4;
  stroke: #9198e5;
  stroke-dashoffset: -${WIDTH / 2}px;
  animation: loader-animation 1s ease-in-out infinite;

  @keyframes loader-animation {
    0% {
      stroke-dasharray: 0, 600px;
    }
    100% {
      stroke-dasharray: 400px, 0;
    }
  }
`;

interface IIndexProps {
  isConnected: boolean;
}
interface IQuizData {
  question: string;
  answer: string;
}

const Home: NextPage<IIndexProps> = ({ isConnected }) => {
  const [fetching, setFetching] = useState(false);
  const [quizData, setQuizData] = useState<IQuizData[]>([]);

  const onStartClick = async () => {
    setFetching(true);

    fetch('/api/quizzes')
      .then((res) => res.json())
      .then(({ quizzes }) => {
        setQuizData(quizzes);
        setFetching(false);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Quizzes</title>
        <meta name="description" content="Let's get quizzical" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!isConnected && <div>Not connected</div>}
        {!quizData.length && (
          <SButtonContainer isFetching={fetching}>
            {fetching && (
              <SLoaderSVG>
                <SRect
                  x="4"
                  y="4"
                  rx="4"
                  width={WIDTH - 8}
                  height={HEIGHT - 8}
                />
              </SLoaderSVG>
            )}
            <SStartButton
              onClick={onStartClick}
              disabled={fetching}
              isDisabled={fetching}
            >
              Start Quiz
            </SStartButton>
          </SButtonContainer>
        )}
        {!!quizData.length && <QuizContent quizzes={quizData} />}
      </main>

      <footer className={styles.footer}>
        © 2022 Sean Collings. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  try {
    await (
      await connectToDatabase()
    ).client;

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
