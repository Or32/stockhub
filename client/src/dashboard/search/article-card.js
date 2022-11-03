import { createStyles, Paper, Text, Title, Button } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));




export function ArticleCardImage(props) {
  const { classes } = useStyles();

  return (
    <Paper  classNames="paper"
      shadow="md"
      p="xl"
      radius="md"
      sx={{ background:  `url(${props.image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {props.category}
        </Text>
        <Title order={3} className={classes.title}>
          {props.title}
        </Title>
      </div>
      <Button variant="white" color="dark" component="a"
      target="_blank" href={props.url}>
        Read article
      </Button>
    </Paper>
  );
}