import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToMongo() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "blogSummariser",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Define blog model
const blogSchema = new mongoose.Schema(
  {
    url: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "blogs" }
);

export const Blog =
  mongoose.models.Blog || mongoose.model("Blog", blogSchema);
