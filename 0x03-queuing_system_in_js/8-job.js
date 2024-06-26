// Import the kue module to create and manage job queues
import kue from 'kue';

// Import the function to create push notification jobs
import createPushNotificationsJobs from './8-job.js';

// Create a new Kue job queue
const queue = kue.createQueue();

// Sample data for push notification jobs
const list = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  }
];

// Enter test mode for the queue before running tests
before(() => queue.testMode.enter());

// Clear the queue after each test
afterEach(() => queue.testMode.clear());

// Exit test mode for the queue after all tests are done
after(() => queue.testMode.exit());

// Test case: ensure createPushNotificationsJobs function creates jobs correctly
it('creates push notification jobs correctly', () => {
  // Call the function to create push notification jobs
  createPushNotificationsJobs(list, queue);

  // Assert that there are jobs of type 'push_notification_code' in the test mode queue
  expect(queue.testMode.jobs['push_notification_code']).to.have.lengthOf(1);
});
