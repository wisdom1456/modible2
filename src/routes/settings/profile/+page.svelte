<script lang="ts">
  import { userSettings } from '$lib/stores/userSettings';

  let name = $userSettings.name;
  let imageFile: File | null = null;

  function handleSubmit() {
    userSettings.updateSetting('name', name);
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        userSettings.updateSetting('image', e.target?.result as string);
      };
      reader.readAsDataURL(imageFile);
    }
    userSettings.saveToStorage();
  }

  function handleImageChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target && target.files) {
      imageFile = target.files[0] || null;
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
  <div>
    <label for="name" class="block text-sm font-medium text-secondary">Name</label>
    <input type="text" id="name" bind:value={name} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-color focus:ring-accent-color sm:text-sm bg-primary text-primary">
  </div>
  <div>
    <label for="image" class="block text-sm font-medium text-secondary">Profile Image</label>
    <input type="file" id="image" accept="image/*" on:change={handleImageChange} class="mt-1 block w-full text-secondary">
  </div>
  <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-accent-color py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-accent-color focus:outline-none focus:ring-2 focus:ring-accent-color focus:ring-offset-2">Save Changes</button>
</form>