import User from "../models/User.js";
import Course from "../models/Course.js";
import Assignment from "../models/Assignment.js";
import Assessment from "../models/Assessment.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Get user's enrolled courses count
    const enrolledCourses = await Course.countDocuments();
    
    // Get assignments count
    const totalAssignments = await Assignment.countDocuments();
    const pendingAssignments = Math.floor(totalAssignments * 0.6); // Mock pending
    
    // Get completion stats (mock data for now)
    const stats = {
      coursesEnrolled: Math.min(enrolledCourses, 8),
      completionRate: Math.floor(Math.random() * 30) + 70, // 70-100%
      learningStreak: Math.floor(Math.random() * 20) + 5, // 5-25 days
      certificates: Math.floor(Math.random() * 5) + 1, // 1-5
      studyHours: Math.floor(Math.random() * 50) + 20, // 20-70 hours
      assignmentsDue: Math.min(pendingAssignments, 10),
      totalCourses: enrolledCourses,
      totalAssignments
    };
    
    res.json(stats);
  } catch (e) { next(e); }
};

export const getSystemStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalCourses,
      totalAssignments,
      totalAssessments,
      activeUsers
    ] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Assignment.countDocuments(),
      Assessment.countDocuments(),
      User.countDocuments({ 
        lastLoginAt: { 
          $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
        } 
      })
    ]);
    
    const stats = {
      users: {
        total: totalUsers,
        active: activeUsers,
        growth: Math.floor(Math.random() * 20) + 5 // Mock growth %
      },
      courses: {
        total: totalCourses,
        published: totalCourses,
        draft: 0
      },
      assignments: {
        total: totalAssignments,
        submitted: Math.floor(totalAssignments * 0.7),
        pending: Math.floor(totalAssignments * 0.3)
      },
      assessments: {
        total: totalAssessments,
        completed: Math.floor(totalAssessments * 0.8),
        averageScore: Math.floor(Math.random() * 20) + 75 // 75-95%
      }
    };
    
    res.json(stats);
  } catch (e) { next(e); }
};