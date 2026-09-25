import { Router } from 'express';
import type { ErrorRequestHandler } from 'express';
import { getApiBaseUrl } from '../config/apiUrl.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const router = Router();

const collections = [
  {
    path: '/users/',
    resource: 'users',
    message: 'User profiles endpoint ready',
    find: () => User.find().sort({ displayName: 1 }).lean(),
  },
  {
    path: '/teams/',
    resource: 'teams',
    message: 'Team management endpoint ready',
    find: () => Team.find().sort({ name: 1 }).lean(),
  },
  {
    path: '/activities/',
    resource: 'activities',
    message: 'Activity logging endpoint ready',
    find: () => Activity.find().sort({ loggedAt: -1 }).lean(),
  },
  {
    path: '/leaderboard/',
    resource: 'leaderboard',
    message: 'Leaderboard endpoint ready',
    find: () => LeaderboardEntry.find().sort({ rank: 1 }).lean(),
  },
  {
    path: '/workouts/',
    resource: 'workouts',
    message: 'Workout suggestions endpoint ready',
    find: () => Workout.find().sort({ focus: 1, title: 1 }).lean(),
  },
];

collections.forEach(({ path, resource, message, find }) => {
  router.get(path, async (_request, response, next) => {
    try {
      const data = await find();

      response.json({
        resource,
        message,
        apiBaseUrl: getApiBaseUrl(),
        count: data.length,
        data,
      });
    } catch (error) {
      next(error);
    }
  });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API route error:', error);

  response.status(500).json({
    error: 'Internal Server Error',
    apiBaseUrl: getApiBaseUrl(),
  });
};

router.use(errorHandler);

export default router;