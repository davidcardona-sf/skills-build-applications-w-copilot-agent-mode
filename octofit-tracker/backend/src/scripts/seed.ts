import mongoose from 'mongoose';

import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/octofit.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const teams = [
  {
    name: 'OctoFit Sprinters',
    members: 3,
    mascot: 'Bolt',
  },
  {
    name: 'Circuit Climbers',
    members: 2,
    mascot: 'Summit',
  },
  {
    name: 'Core Crushers',
    members: 2,
    mascot: 'Flex',
  },
];

const users = [
  {
    username: 'ava_runner',
    email: 'ava.runner@example.com',
    firstName: 'Ava',
    lastName: 'Martinez',
    team: 'OctoFit Sprinters',
  },
  {
    username: 'liam_lifts',
    email: 'liam.lifts@example.com',
    firstName: 'Liam',
    lastName: 'Chen',
    team: 'Core Crushers',
  },
  {
    username: 'mia_moves',
    email: 'mia.moves@example.com',
    firstName: 'Mia',
    lastName: 'Patel',
    team: 'Circuit Climbers',
  },
  {
    username: 'noah_rows',
    email: 'noah.rows@example.com',
    firstName: 'Noah',
    lastName: 'Kim',
    team: 'OctoFit Sprinters',
  },
  {
    username: 'sophia_cycle',
    email: 'sophia.cycle@example.com',
    firstName: 'Sophia',
    lastName: 'Garcia',
    team: 'Circuit Climbers',
  },
];

const activities = [
  {
    user: 'ava_runner',
    type: 'Trail run',
    duration: 42,
    caloriesBurned: 430,
    completedAt: new Date('2026-09-10T07:30:00Z'),
  },
  {
    user: 'liam_lifts',
    type: 'Strength training',
    duration: 55,
    caloriesBurned: 380,
    completedAt: new Date('2026-09-11T18:15:00Z'),
  },
  {
    user: 'mia_moves',
    type: 'Yoga flow',
    duration: 35,
    caloriesBurned: 180,
    completedAt: new Date('2026-09-12T06:45:00Z'),
  },
  {
    user: 'noah_rows',
    type: 'Rowing intervals',
    duration: 30,
    caloriesBurned: 315,
    completedAt: new Date('2026-09-13T12:00:00Z'),
  },
  {
    user: 'sophia_cycle',
    type: 'Indoor cycling',
    duration: 48,
    caloriesBurned: 510,
    completedAt: new Date('2026-09-14T17:40:00Z'),
  },
];

const leaderboard = [
  {
    username: 'sophia_cycle',
    team: 'Circuit Climbers',
    points: 1280,
    rank: 1,
  },
  {
    username: 'ava_runner',
    team: 'OctoFit Sprinters',
    points: 1215,
    rank: 2,
  },
  {
    username: 'liam_lifts',
    team: 'Core Crushers',
    points: 1120,
    rank: 3,
  },
  {
    username: 'noah_rows',
    team: 'OctoFit Sprinters',
    points: 980,
    rank: 4,
  },
  {
    username: 'mia_moves',
    team: 'Circuit Climbers',
    points: 920,
    rank: 5,
  },
];

const workouts = [
  {
    name: 'Morning Mobility Reset',
    description: 'A low-impact routine focused on hips, shoulders, and spine mobility.',
    difficulty: 'Beginner',
    duration: 20,
  },
  {
    name: 'Lunch Break HIIT',
    description: 'Bodyweight intervals combining squats, push-ups, mountain climbers, and planks.',
    difficulty: 'Intermediate',
    duration: 28,
  },
  {
    name: 'Endurance Builder Ride',
    description: 'A steady indoor cycling workout with cadence targets and two short climbs.',
    difficulty: 'Intermediate',
    duration: 45,
  },
  {
    name: 'Strength Foundation',
    description: 'Compound strength work with deadlifts, rows, presses, and core finishers.',
    difficulty: 'Advanced',
    duration: 50,
  },
];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [createdUsers, createdTeams, createdActivities, createdLeaderboard, createdWorkouts] = await Promise.all([
      User.insertMany(users),
      Team.insertMany(teams),
      Activity.insertMany(activities),
      LeaderboardEntry.insertMany(leaderboard),
      Workout.insertMany(workouts),
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log(`Created ${createdUsers.length} users`);
    console.log(`Created ${createdTeams.length} teams`);
    console.log(`Created ${createdActivities.length} activities`);
    console.log(`Created ${createdLeaderboard.length} leaderboard entries`);
    console.log(`Created ${createdWorkouts.length} workouts`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
