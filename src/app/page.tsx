"use client";

import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import mtgData from "../../sample_data/mtg.json";

type Item = {
  name: string;
  order: number;
};

type MTGData = {
  title: string;
  description: string;
  items: Item[];
};

const mtg = mtgData as MTGData;

export default function Home() {
  return (
    <main>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1">
          {mtg.title}
        </Typography>
        <Typography variant="body1" component="p">
          {mtg.description}
        </Typography>

        <Paper elevation={3} sx={{ p: 2 }}>
          <List>
            {mtg.items.map((item) => (
              <ListItem key={item.order} divider>
                <ListItemText
                  primary={item.name}
                  secondary={`Order: ${item.order}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </main>
  );
}
