// Import the kue module to create and manage job queues
import kue from 'kue';

// Define an array of job data, each containing a phone number and a message
const jobs = [{
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

// Create a new Kue job queue
const queue = kue.createQueue();

// Iterate over the job data array and create a job for each entry
for (const j of jobs) {
  // Create a new job in the queue with the type 'push_notification_code' and the job data
  const job = queue.create('push_notification_code', j)
  // Save the job to the queue and log a message if the job was created successfully
  .save((error) => {
    if (!error) console.log(`Notification job created: ${job.id}`);
  });

  // Set up an event listener for when the job is completed
  job.on('complete', () => console.log(`Notification job ${job.id} completed`));
  
  // Set up an event listener for when the job fails
  job.on('failed', (error) => console.log(`Notification job ${job.id} failed: ${error}`));
  
  // Set up an event listener for tracking the progress of the job
  job.on('progress', (progress) => console.log(`Notification job ${job.id} ${progress}% complete`));
}
