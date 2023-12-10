import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

const QuestionForm = () => {
  const {
    currentQuestion,
    onChangeAnswer,
    answersState,
    questionsCount,
    setToPrevQuestion,
    setToNextQuestion,
  } = useMotivationPoll();
  return currentQuestion ? (
    <Paper>
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        <Typography component="h6" variant="h6" textAlign="center" mt={2}>
          Question {currentQuestion.id + 1} of {questionsCount}. Remaining
          points: {answersState[currentQuestion.id].remainingPoints}
        </Typography>
        <Typography component="h6" variant="h6" textAlign="center" m={2}>
          {currentQuestion.text}
        </Typography>
        <List sx={{ maxWidth: '600px' }}>
          {currentQuestion.answers.map((answer) => (
            <ListItem key={`${currentQuestion.id}-${answer.id}`}>
              <ListItemText
                secondary={
                  <Slider
                    aria-label={`Answer-${answer.id}`}
                    value={
                      answersState[currentQuestion.id].answers[answer.id].points
                    }
                    step={1}
                    marks
                    min={0}
                    max={11}
                    valueLabelDisplay="auto"
                    onChange={(event, value) =>
                      onChangeAnswer(
                        currentQuestion.id,
                        answer.id,
                        typeof value === 'number' ? value : value[0]
                      )
                    }
                  />
                }
              >
                {answer.text}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem>
            <Box
              display="flex"
              justifyContent="space-between"
              my={3}
              width="100%"
            >
              {currentQuestion.id > 0 ? (
                <Button type="button" onClick={setToPrevQuestion}>
                  Previous
                </Button>
              ) : (
                <Box />
              )}
              <Button
                type="button"
                onClick={setToNextQuestion}
                disabled={!answersState[currentQuestion.id].completed}
              >
                {currentQuestion.id < questionsCount - 1 ? 'Next' : 'Finish'}
              </Button>
            </Box>
          </ListItem>
        </List>
      </Box>
    </Paper>
  ) : null;
};

export default QuestionForm;
