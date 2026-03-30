import app from "./src/app.ts";
import { connectDB } from "./src/config/db.ts";

const PORT: number | string = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});