import RetrievingAnswersStory from './RetrievingAnswers';
import HairProductsQuizStory from './HairProductsQuiz';

export default {
  title: 'Quiz/Specific Examples',
  component: RetrievingAnswersStory,
  tags: ['autodocs'],
};

// Assign a const variable here instead of directly exporting so that Storybook can space-delimit the name
export const RetrievingAnswers = RetrievingAnswersStory;
export const HairProductsQuizWithTransformer = HairProductsQuizStory;
