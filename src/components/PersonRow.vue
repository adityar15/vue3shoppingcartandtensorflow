<template>
 <tr>
  <TableCell :cellvalue="props.person.name" cellkey="name" @changed="handleChange">
    {{ props.person.name }}
  </TableCell>
  <TableCell :cellvalue="props.person.email" cellkey="email" @changed="handleChange">
    {{ props.person.email }}
  </TableCell>
  <TableCell :cellvalue="props.person.contact" cellkey="contact" @changed="handleChange">
    {{ props.person.contact }}
  </TableCell>
  </tr>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { EmittedValue, Person } from "../types/interfaces";

const props = defineProps<{
  person: Person;
}>();

const emit = defineEmits<{(e:"personupdated", value: EmittedValue) : void}>()

const TableCell = defineAsyncComponent(
  () => import(/*webpackChunkName:"tablecell"*/ "./table/TableCell.vue")
);

function handleChange(payload: EmittedValue) {
    payload.id = props.person.id
    emit("personupdated", payload)
}

</script>
