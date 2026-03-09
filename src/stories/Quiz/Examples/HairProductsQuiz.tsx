import React, { useEffect } from 'react';
import QuizContext from '../../../components/CioQuiz/context';
import useQuiz from '../../../hooks/useQuiz';
import { ResultContainer } from '../../../index';
import QuizQuestions from '../../../components/QuizQuestions';
import ControlBar from '../../../components/ControlBar/ControlBar';
import { IQuizProps, QuizResultsResponse } from '../../../types';
import '../../../styles.css';
import { resultCardOptions } from '../tests/mocks';

const resultsTransformer = (quizResults: QuizResultsResponse): QuizResultsResponse => {
  const results = quizResults.response?.results;
  if (!results || results.length === 0) return quizResults;

  const comboIndex = results.findIndex((r) =>
    r.value?.toLowerCase().includes('shampoo & conditioner combo')
  );
  if (comboIndex <= 0) return quizResults;

  const reordered = [...results];
  const [comboProduct] = reordered.splice(comboIndex, 1);
  reordered.unshift(comboProduct);

  return {
    ...quizResults,
    response: {
      ...quizResults.response,
      results: reordered,
    },
  };
};

export default function HairProductsQuizStory() {
  const quizProps: IQuizProps = {
    apiKey: 'key_86qjDylE6TxjxYKA',
    quizId: 'my-hair-products-quiz-1-mr-test',
    resultsPageOptions: {
      resultsTransformer,
    },
    resultCardOptions,
    callbacks: {
      onAddToCartClick: () => {},
    },
  };

  const quizHook = useQuiz(quizProps);
  const { state } = quizHook;
  const currentQuestionData = state.quiz.currentQuestion?.next_question;

  useEffect(() => {
    quizHook.events.hydrateQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='cio-quiz'>
      <QuizContext.Provider value={quizHook}>
        {!state.quiz.results ? (
          <>
            <QuizQuestions />
            <ControlBar ctaButtonText={currentQuestionData?.cta_text || undefined} />
          </>
        ) : (
          <>
            <ResultContainer resultCardOptions={resultCardOptions} onShare={() => {}} />
          </>
        )}
      </QuizContext.Provider>
    </div>
  );
}
