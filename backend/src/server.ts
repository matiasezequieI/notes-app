import app from './app';
import env from './utils/validateEnv';
import mongoose from 'mongoose';

const port = env.NODE_PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING)
	.then(() => {
		console.log('mongoose connected');  
		app.listen(port, () => {
			console.log(`Server running on ${port}`);
		});
	}).catch(console.error);

