import { taskStore } from '$lib/stores/taskStore';
import { describe, it, expect } from 'vitest';

describe('taskStore', () => {
  it('should add a task', () => {
    const task = {
      id: '1',
      title: 'Test Task',
      description: '',
      dueDate: null,
      priority: 'medium',
      category: '',
    };
    taskStore.addTask(task);
    const tasks = get(taskStore);
    expect(tasks).toContain(task);
  });
});
