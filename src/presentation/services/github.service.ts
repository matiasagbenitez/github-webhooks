import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";

export class GitHubService {
    constructor() { }

    at(): string {
        return new Date().toLocaleString('es-ES', { timeZone: 'America/Sao_Paulo', hour12: false });
    }

    onStar(payload: GitHubStarPayload): string {
        const { action, sender } = payload;
        if (action === 'created') {
            return `${this.at()} - *${sender.login}* **starred** the repository ⭐`;
        }

        if (action === 'deleted') {
            return `${this.at()} - *${sender.login}* **unstarred** the repository`;
        }

        return `Unhandled action for the star event ${action}`;
    }

    onIssue(payload: GitHubIssuePayload) {
        const { action, issue } = payload;

        if (action === 'opened') {
            return `${this.at()} - An new issue was __opened__ by *${issue.user.login}* - **${issue.title}**`;
        }

        if (action === 'closed') {
            return `${this.at()} - An issue was __closed__ by *${issue.user.login}* - **${issue.title}**`;
        }

        if (action === 'reopened') {
            return `${this.at()} - An issue was __reopened__ by *${issue.user.login}* - **${issue.title}**`;
        }

        return `Unhandled action for the issue event ${action}`;
    }
}