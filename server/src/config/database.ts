import mongoose from 'mongoose';
import fs from 'fs';
import { env } from './env';

const LOCAL_SOCKET_PATH = '/tmp/mongodb-27017.sock';

export async function connectDatabase(): Promise<typeof mongoose> {
  const primaryUri = env.MONGODB_URI;

  try {
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB connected successfully to ${mongoose.connection.host || primaryUri}`);
    return conn;
  } catch (initialError: any) {
    // If running in local sandbox or container where TCP loopback is isolated but unix socket exists:
    if (
      (primaryUri.includes('127.0.0.1') || primaryUri.includes('localhost')) &&
      fs.existsSync(LOCAL_SOCKET_PATH)
    ) {
      const socketUri = `mongodb://%2Ftmp%2Fmongodb-27017.sock/bookmystudio`;
      console.log(`ℹ️ TCP connection failed, falling back to local Unix domain socket: ${LOCAL_SOCKET_PATH}`);
      try {
        const conn = await mongoose.connect(socketUri, {
          serverSelectionTimeoutMS: 5000,
        });
        console.log(`✅ MongoDB connected successfully via Unix domain socket (${LOCAL_SOCKET_PATH})`);
        return conn;
      } catch (socketError: any) {
        console.error('❌ Failed to connect to MongoDB via Unix domain socket:', socketError.message);
        throw socketError;
      }
    }

    console.error('❌ MongoDB connection error:', initialError.message);
    throw initialError;
  }
}

export async function disconnectDatabase(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed gracefully');
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB runtime error:', err);
});

