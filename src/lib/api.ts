import { taskStore } from '$lib/stores/taskStore';

export async function fetchTasks() {
  try {
    const response = await fetch('/api/tasks', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    taskStore.set(data);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}
