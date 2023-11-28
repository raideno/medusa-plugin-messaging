export default class MedusaPluginMessagingError extends Error {
    constructor(message = 'medusa-plugin-messaging-error', data) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}