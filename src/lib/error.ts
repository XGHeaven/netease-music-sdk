export class LoginNeededError extends Error {
    constructor() {
        super('login needed')
    }
}
