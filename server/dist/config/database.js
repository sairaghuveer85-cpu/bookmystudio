"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
exports.disconnectDatabase = disconnectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const env_1 = require("./env");
const LOCAL_SOCKET_PATH = '/tmp/mongodb-27017.sock';
async function connectDatabase() {
    const primaryUri = env_1.env.MONGODB_URI;
    try {
        const conn = await mongoose_1.default.connect(primaryUri, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`✅ MongoDB connected successfully to ${mongoose_1.default.connection.host || primaryUri}`);
        return conn;
    }
    catch (initialError) {
        // If running in local sandbox or container where TCP loopback is isolated but unix socket exists:
        if ((primaryUri.includes('127.0.0.1') || primaryUri.includes('localhost')) &&
            fs_1.default.existsSync(LOCAL_SOCKET_PATH)) {
            const socketUri = `mongodb://%2Ftmp%2Fmongodb-27017.sock/bookmystudio`;
            console.log(`ℹ️ TCP connection failed, falling back to local Unix domain socket: ${LOCAL_SOCKET_PATH}`);
            try {
                const conn = await mongoose_1.default.connect(socketUri, {
                    serverSelectionTimeoutMS: 5000,
                });
                console.log(`✅ MongoDB connected successfully via Unix domain socket (${LOCAL_SOCKET_PATH})`);
                return conn;
            }
            catch (socketError) {
                console.error('❌ Failed to connect to MongoDB via Unix domain socket:', socketError.message);
                throw socketError;
            }
        }
        console.error('❌ MongoDB connection error:', initialError.message);
        throw initialError;
    }
}
async function disconnectDatabase() {
    if (mongoose_1.default.connection.readyState !== 0) {
        await mongoose_1.default.connection.close();
        console.log('🔌 MongoDB connection closed gracefully');
    }
}
mongoose_1.default.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('❌ MongoDB runtime error:', err);
});
//# sourceMappingURL=database.js.map