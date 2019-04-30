import app from './app';
import { sync } from './db';

const PORT = process.env.PORT || 3000

sync()
  .then(() => {
    console.log('DB Connected.');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...\n`))
  })
  .catch(e => {
    console.log('Failed to start server or db.', e);
  });
