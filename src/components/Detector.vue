<template>
  <div class="w-full h-auto md:w-[840px] relative">
    <canvas
      ref="drawingBoard"
      class="absolute w-full h-full bg-transparent top-0 left-0 mx-auto"
    ></canvas>
    <video
      ref="video"
      class="w-full h-full mx-auto"
      autoplay
      playsinline
    ></video>
  </div>

  <Selector v-model="camera">
    <option value="">Change Camera</option>
    <option
      v-for="(item, index) in devices"
      :key="index"
      :value="item.deviceId"
    >
      {{ item.label }}
    </option>
  </Selector>

</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref, watch } from "vue";
import * as cocoSSD from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

const Selector = defineAsyncComponent(
  () => import(/*webpackChunkName:selector*/ "../components/Selector.vue")
);


const video = ref<HTMLVideoElement>();
const devices = ref<MediaDeviceInfo[]>([]);
const drawingBoard = ref<HTMLCanvasElement>();
const camera = ref<string>("");
onMounted(async () => {
  if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    devices.value = await navigator.mediaDevices.enumerateDevices();
    devices.value = devices.value.filter((item) => item.kind == "videoinput");
    camera.value = devices.value[0].deviceId;
    startStreaming();
  }
});


watch(camera, () => startStreaming())

function startStreaming(): void {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        deviceId: camera.value as string,
      },
    })
    .then((stream: MediaStream) => {
      (video.value as HTMLVideoElement).srcObject = stream;
      setInterval(()=>{
            detectObjects();
      }, 1000)
     
    });
}

async function detectObjects(): Promise<void> {

  console.log("detecting ...")

  const model = await cocoSSD.load();
  const predictions: cocoSSD.DetectedObject[] = await model.detect(
    video.value as HTMLVideoElement
  );

  let context: CanvasRenderingContext2D;

  if (drawingBoard.value) {
    context = drawingBoard.value.getContext("2d") as CanvasRenderingContext2D;
    drawingBoard.value.height = (video.value as HTMLVideoElement).videoHeight;
    drawingBoard.value.width = (video.value as HTMLVideoElement).videoWidth;
  }

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction.bbox;
    const label = prediction.class;

    const color = "blue";
    const strokeWidth = 5;
    const font = "25px Arial";
    if (context) {
      context.beginPath();
      context.font = font;
      context.strokeStyle = color;
      context.fillStyle = color;
      context.lineWidth = strokeWidth;
      context.fillText(label, x, y);
      context.rect(x, y, width, height);
      context.stroke();
    }
  });
  
}
</script>
