import app from "./app.js";
import { connectDB } from "./config/db.js";
import config from "./config/envConfig.js";

connectDB();

const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
