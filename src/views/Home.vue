<template>
  <div class="App">
    <input type="file" @change="setImageUpload" />
    <button @click="uploadFile">Upload Image</button>
    <div class="progress-bar" v-if="uploadProgress > 0">
      <div class="progress" :style="{ width: uploadProgress + '%' }"></div>
    </div>
    <div class="image-grid">
      <div v-for="(url, index) in imageUrls" :key="index" class="image-container">
        <img :src="url" class="uploaded-image" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
  StorageReference,
  UploadTask,
  UploadTaskSnapshot,
} from "firebase/storage";
import { storage } from "../firebase/index";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "App",
  setup() {
    const imageUpload = ref<File | null>(null);
    const imageUrls = ref<string[]>([]);
    const uploadProgress = ref<number>(0);

    const setImageUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      imageUpload.value = target.files?.[0] || null;
    };

    const uploadFile = async () => {
      if (!imageUpload.value) return;

      const imageRef: StorageReference = storageRef(
        storage,
        `images/${imageUpload.value.name + uuidv4()}`
      );
      const uploadTask: any = uploadBytes(imageRef, imageUpload.value);

      uploadTask.on("state_changed", (snapshot: UploadTaskSnapshot) => {
        uploadProgress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, (error: any) => {
        console.error(error);
      }, async () => {
        // Upload completed
        const url = await getDownloadURL((await uploadTask).ref);
        imageUrls.value.push(url);
        uploadProgress.value = 0;
      });
    };

    return { setImageUpload, uploadFile, imageUrls, uploadProgress };
  },
};
</script>


<style>
html, body {
  margin: 0px !important;
  padding: 0px !important;
}
.App {
  text-align: center;
  padding: 20px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.image-container {
  display: flex;
  justify-content: center;
}

.uploaded-image {
  max-width: 100%;
  height: auto;
}
.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  margin-top: 10px;
  overflow: hidden;
  border-radius: 5px;
}

.progress {
  height: 100%;
  background-color: #007bff;
  transition: width 0.3s ease;
}

</style>
