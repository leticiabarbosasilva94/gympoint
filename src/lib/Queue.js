import Bee from 'bee-queue';
import RegistrationMail from '../app/jobs/RegistrationMail';
import redisConfig from '../config/redis';

const jobs = [RegistrationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig
        }),
        handle
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  proccessQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  // eslint-disable-next-line
  handleFailure(job, err) {
    // console.log(`Queue ${job.queue.name} failed!`, err);
  }
}

export default new Queue();
