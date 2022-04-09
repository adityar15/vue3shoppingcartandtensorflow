<template>
  <div
    v-bind="$attrs"
    :class="{ 'border border-gray-600 ': !editable }"
    class="w-full h-44 outline-none"
    @click="makeEditable"
  
  >
    <p
      class="h-full w-full focus:ring focus:ring-purple-500 outline-none p-4 overflow-auto"
      ref="textbox"
      :contenteditable="editable"
      @input="$emit('update:modelValue', $event.target.innerText)"
      :value="props.modelValue"
      v-text="inputText"
        @blur="makeNormal"
    ></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  placeholder: string;
  modelValue: string
}>();

const emit = defineEmits<{(e: "update:modelValue", modelValue: string) : void}>()

const editable = ref<boolean>(false);
const textbox = ref<HTMLParagraphElement>();
const inputText = ref<string>(props.placeholder);

function makeEditable(): void {
  editable.value = true;
  setTimeout(() => {
      (textbox.value as HTMLParagraphElement).focus()
  }, 100);
  inputText.value = props.modelValue || ""
}

function makeNormal(): void {
  editable.value = false;
  inputText.value = props.modelValue == "" ? props.placeholder : props.modelValue
}
</script>
