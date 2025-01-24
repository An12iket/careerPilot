import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardData: RequestHandler = async (req, res) => {
  const userId = req.user?.userId; // Assumes authMiddleware attaches `userId`

  try {
    // Fetch user profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Explicitly return here
    }

    // Example: Fetch additional dashboard data (e.g., career suggestions, activity)
    const suggestions = await prisma.suggestion.findMany({
      where: { userId },
      select: {
        title: true,
        description: true,
        createdAt: true,
      },
    });

    // Explicitly end the function by returning res
    return res.json({
      user,
      suggestions,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res.status(500).json({ message: "Server error" }); // Explicitly return here
  }
};
