// Import the kue module to create and manage job queues
import kue from 'kue';

// Create a new Kue job queue
const queue = kue.createQueue();

// Function to send a notification
const sendNotification = (phoneNumber, message) => {
  // Log the notification details
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Define the processing function for jobs of type 'push_notification_code'
queue.process('push_notification_code', (job, done) => {
  // Call the sendNotification function with the job data
  sendNotification(job.data.phoneNumber, job.data.message);
  // Indicate that the job is complete
  done();
});
