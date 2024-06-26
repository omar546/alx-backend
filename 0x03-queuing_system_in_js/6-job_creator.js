// Import the kue module to create and manage job queues
import kue from 'kue';

// Create a new Kue job queue
const queue = kue.createQueue();

// Define the data for the job
const jobData = {
  phoneNumber: '2165216525', // The phone number to send the notification to
  message: 'here is your code' // The message to be sent
};

// Create a new job in the queue with the type 'push_notification_code' and the job data
const job = queue.create('push_notification_code', jobData)
  // Save the job to the queue and log a message if the job was created successfully
  .save((error) => {
    if (!error) console.log(`Notification job created: ${job.id}`);
  });

// Set up an event listener for when the job is completed
job.on('complete', () => console.log('Notification job completed'));

// Set up an event listener for when the job fails
job.on('failed', () => console.log('Notification job failed'));
