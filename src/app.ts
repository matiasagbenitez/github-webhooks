import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/controller';
import { GitHubSha256Middleware } from './presentation/middlewares/github-sha256.middleware';

(() => {
    main();
})();

function main() {
    const app = express();

    app.use(express.json());
    
    const controller = new GithubController();
    
    app.use(GitHubSha256Middleware.verifySignature);
    app.post('/api/github', controller.webhookHandler);
    
    // Any other routes not found
    app.use((req, res) => {
        res.status(404).json({ message: 'Not Found' });
    });

    app.listen(envs.PORT, () => {
        console.log(`Server is running on port ${envs.PORT}`);
    });
}