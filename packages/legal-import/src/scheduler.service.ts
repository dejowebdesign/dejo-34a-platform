/** Scheduling is deliberately prepared only; deployments can wire a cron/queue implementation later. */
export class SchedulerService {
  isEnabled(): boolean {
    return false;
  }
}
