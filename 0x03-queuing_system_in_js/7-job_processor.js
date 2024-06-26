// Import the kue module to create and manage job queues
import kue from 'kue';

// Create a new Kue job queue
const queue = kue.createQueue();

// Array of blacklisted phone numbers
const blacklistedPhoneNumbers = [
  '4153518780', '4153518781'
];

// Function to send a notification, checking if the phone number is blacklisted
const sendNotification = (phoneNumber, message, job, done) => {
  // Check if the phone number is blacklisted
  if (blacklistedPhoneNumbers.includes(phoneNumber)) {
    // If blacklisted, call 'done' with an error
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Simulate processing progress (50 out of 100)
  job.progress(50, 100);

  // Log the notification details
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Call 'done' to indicate the job is complete
  done();
}

// Process jobs of type 'push_notification_code_2' with concurrency of 2
queue.process('push_notification_code_2', 2, (job, done) => {
  // Call the sendNotification function with job data and 'done' callback
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
