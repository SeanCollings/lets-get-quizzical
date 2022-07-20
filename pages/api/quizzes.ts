import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../util/mongodb';
import { shuffle } from '../../util/shuffle';

interface IQuizData {
  question: string;
  answer: string;
}
type Data = {
  quizzes: IQuizData[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { db } = await connectToDatabase();

  const quizzes = await db
    .collection('quizcontents')
    .find(
      { isPublic: true },
      { projection: { question: 1, answer: 1, _id: 0 } }
    )
    .toArray();

  res.status(200).json({ quizzes: shuffle(quizzes) });
};

export default handler;
