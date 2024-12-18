import app from '@/app';
import { initializeDatabase } from './config/typeorm.config';

initializeDatabase();

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
