import React from 'react';
import QuizContext from '../../../../components/CioQuiz/context';
import ResultContainer from '../../../../components/ResultContainer/ResultContainer';
import { useMockContextValue, resultCardOptions } from '../../tests/mocks';
import { QuizResultDataPartial } from '../../../../types';

const mockResults: QuizResultDataPartial[] = [
  {
    value: 'Regular Shampoo',
    data: {
      id: '1',
      image_url:
        'https://constructorio-integrations.s3.amazonaws.com/farmstand/2024-07-23/HiThereNameInput.png',
      price: 20,
    },
  },
  {
    value: 'Combo Pack Deal',
    data: {
      id: '2',
      image_url:
        'https://constructorio-integrations.s3.amazonaws.com/farmstand/2024-07-23/HiThereNameInput.png',
      price: 45,
    },
  },
  {
    value: 'Conditioner',
    data: {
      id: '3',
      image_url:
        'https://constructorio-integrations.s3.amazonaws.com/farmstand/2024-07-23/HiThereNameInput.png',
      price: 15,
    },
  },
];

const transformedResults: QuizResultDataPartial[] = (() => {
  const results = [...mockResults];
  const comboIndex = results.findIndex((r) => r.value?.toLowerCase().includes('combo'));
  if (comboIndex > 0) {
    const [combo] = results.splice(comboIndex, 1);
    results.unshift(combo);
  }
  return results;
})();

function Panel({ results, label }: { results: QuizResultDataPartial[]; label: string }) {
  const contextValue = useMockContextValue();
  const patchedContextValue = React.useMemo(
    () => ({
      ...contextValue,
      state: {
        ...contextValue.state,
        quiz: {
          ...contextValue.state.quiz,
          results: {
            ...contextValue.state.quiz.results!,
            response: {
              ...contextValue.state.quiz.results!.response!,
              results,
            },
          },
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [results]
  );

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 12 }}>{label}</h2>
      <ol style={{ paddingLeft: 20, marginBottom: 12, fontSize: 13, color: '#555' }}>
        {results.map((r, i) => (
          <li key={r.data?.id} style={{ fontWeight: i === 0 ? 'bold' : 'normal' }}>
            {r.value}
          </li>
        ))}
      </ol>
      <div className='cio-quiz'>
        <QuizContext.Provider value={patchedContextValue}>
          <ResultContainer resultCardOptions={resultCardOptions} onShare={() => {}} />
        </QuizContext.Provider>
      </div>
    </div>
  );
}

export default function ResultsTransformerStory() {
  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', padding: 24 }}>
      <Panel results={mockResults} label='Before resultsTransformer' />
      <Panel results={transformedResults} label='After resultsTransformer (Combo → slot 1)' />
    </div>
  );
}
