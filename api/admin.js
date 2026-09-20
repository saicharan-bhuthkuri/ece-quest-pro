const { getDb } = require('./db');

module.exports = async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const db = getDb();
  const action = req.body?.action || (req.url.includes('login') ? 'login' : 'users');

  try {
    // 1. Admin Login
    if (action === 'login' || req.url.includes('admin/login')) {
      const username = (req.body?.username || '').trim();
      const password = (req.body?.password || '').trim();

      const validUser = process.env.ADMIN_USERNAME || 'rushanth';
      const validPass = process.env.ADMIN_PASSWORD || 'rushanth@admin';

      // Check admin credentials
      if (username === validUser && password === validPass) {
        return res.status(200).json({
          success: true,
          message: 'Admin authenticated successfully',
          adminToken: 'admin_session_' + Date.now()
        });
      }

      return res.status(401).json({
        success: false,
        error: 'Invalid admin username or password'
      });
    }

    // 2. Fetch All Registered Users with Progress
    if (action === 'users' || req.url.includes('admin/users') || req.method === 'GET' || req.method === 'POST') {
      const username = (req.body?.username || req.headers['x-admin-user'] || '').trim();
      const password = (req.body?.password || req.headers['x-admin-pass'] || '').trim();

      if (username !== 'rushanth' || password !== 'rushanth@admin') {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized access. Valid admin credentials required.'
        });
      }

      // Query registered users along with their activity metrics
      const usersRes = await db.execute(`
        SELECT 
          u.id, 
          u.name, 
          u.email, 
          u.college, 
          u.branch, 
          u.year, 
          u.email_verified, 
          u.created_at,
          COALESCE(p.xp, 0) as xp,
          COALESCE(p.streak, 0) as streak,
          COALESCE(p.total_questions, 0) as total_questions,
          COALESCE(p.correct_answers, 0) as correct_answers,
          COALESCE(p.quizzes, 0) as quizzes,
          COALESCE(p.best_score, 0) as best_score,
          p.updated_at as last_active
        FROM users u
        LEFT JOIN user_progress p ON u.email = p.email
        ORDER BY u.created_at DESC
      `);

      const users = usersRes.rows.map(row => ({
        id: row.id,
        name: row.name,
        email: row.email,
        college: row.college,
        branch: row.branch,
        year: row.year,
        emailVerified: Boolean(row.email_verified),
        createdAt: row.created_at,
        xp: Number(row.xp || 0),
        streak: Number(row.streak || 0),
        totalQuestions: Number(row.total_questions || 0),
        correctAnswers: Number(row.correct_answers || 0),
        quizzes: Number(row.quizzes || 0),
        bestScore: Number(row.best_score || 0),
        lastActive: row.last_active
      }));

      // Get stats summary
      const stats = {
        totalUsers: users.length,
        verifiedUsers: users.filter(u => u.emailVerified).length,
        totalQuizzesTaken: users.reduce((sum, u) => sum + u.quizzes, 0),
        totalQuestionsSolved: users.reduce((sum, u) => sum + u.totalQuestions, 0)
      };

      return res.status(200).json({
        success: true,
        stats: stats,
        users: users
      });
    }

    return res.status(404).json({ success: false, error: 'Endpoint not found' });

  } catch (err) {
    console.error('Admin API error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error: ' + err.message });
  }
};
