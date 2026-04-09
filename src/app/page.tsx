// Deciding to use the stack and card components from material UI
import {Stack, Card} from '@mui/material';


export default function Home() {
  // Using the first 10 items in oregon_pop.json
  const placeholder_data = [
  { name: "Portland", order: 1 },
  { name: "Salem", order: 2 },
  { name: "Eugene", order: 3 },
  { name: "Hillsboro", order: 4 },
  { name: "Bend", order: 5 },
  { name: "Gresham", order: 6 },
  { name: "Beaverton", order: 7 },
  { name: "Medford", order: 8 },
  { name: "Corvallis", order: 9 },
  { name: "Springfield", order: 10 }
  ];

  return (
    <main>
      <div>Welcome to CS464!</div>
      <br></br>
      
      <Stack spacing={1}>
        // Map from the data, this should work with any .json data in the future.
        {placeholder_data.map((item) => (
          <Card 
            key={item.name} 
            variant="outlined" 
            sx={{
              backgroundColor: "#809c72", 
              color:'black', 
              textAlign: 'center', 
              width: 300
            }}>

            {item.name}

          </Card>
        ))}
      </Stack>

    </main>
  );
}

// Displays the data with cards in a vertical fashion, in the future we should be able to drag and order components, and
// this is a good layout for that functionality.
