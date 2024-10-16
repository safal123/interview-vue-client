<script setup>
import { useField, useForm } from 'vee-validate'
import { customerFormSchema } from '../utils/schema'
import useCustomers from '../composables/useCustomers'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  customer: {
    type: Object,
    default: null,
  },
  mode: {
    type: String,
    default: 'create',
  },
})

const emit = defineEmits(['close'])
const close = () => emit('close')

const { errors, handleSubmit, setFieldValue, isSubmitting } = useForm({
  validationSchema: customerFormSchema,
})

const {
  value: name,
  errorMessage: nameError,
  setValue: setName,
} = useField('name')
const {
  value: reference,
  errorMessage: referenceError,
  setValue: setReference,
} = useField('reference')
const {
  value: category,
  errorMessage: categoryError,
  setValue: setCategory,
} = useField('category')
const {
  value: startDate,
  errorMessage: startDateError,
  setValue: setStartDate,
} = useField('startDate')
const {
  value: description,
  errorMessage: descriptionError,
  setValue: setDescription,
} = useField('description')

const { createCustomer, updateCustomer } = useCustomers()

onMounted(() => {
  if (props.customer) {
    setName(props.customer.name)
    setReference(props.customer.reference)
    setCategory(props.customer.category)
    setDescription(props.customer.description)
    const formattedStartDate = new Date(props.customer.startDate)
      .toISOString()
      .split('T')[0]
    setStartDate(formattedStartDate)
  }
})

const onSubmit = handleSubmit(async (values) => {
  console.log(props.mode)
  if (props.mode === 'create') {
    await createCustomer(values)
  } else {
    await updateCustomer({
      ...values,
      id: props.customer.id,
    })
  }
  close()
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="flex justify-between items-center border-b p-6">
      <h2 class="text-xl font-bold">
        Customers - {{ props.customer ? 'Edit' : 'Create' }}
      </h2>
      <div>
        <button @click="close" class="border rounded px-4 py-2 mr-2">
          Back
        </button>
        <button
          type="submit"
          class="border rounded px-4 py-2 bg-blue-500 text-white"
        >
          {{ props.customer ? 'Update' : 'Save' }}
        </button>
      </div>
    </div>
    <div class="grid lg:grid-cols-2 gap-4 p-6">
      <div class="space-y- border p-2">
        <h2 class="text-lg font-bold my-2">General</h2>
        <div>
          <label class="block text-sm font-bold mb-2" for="name">Name *</label>
          <input
            v-model="name"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            type="text"
            placeholder="Enter name"
          />
          <span class="text-red-500 text-sm">{{ nameError }}</span>
        </div>

        <div>
          <label class="block text-sm font-bold mb-2" for="reference"
            >Reference *</label
          >
          <input
            v-model="reference"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            type="text"
            placeholder="Enter reference"
          />
          <span class="text-red-500 text-sm">{{ referenceError }}</span>
        </div>

        <div>
          <label class="block text-sm font-bold mb-2" for="category"
            >Category *</label
          >
          <select
            v-model="category"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          >
            <option value="" disabled>Select Category</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>
          <span class="text-red-500 text-sm">{{ categoryError }}</span>
        </div>
      </div>

      <div class="space-y-4 border p-2">
        <h2 class="text-lg font-bold my-2">Details</h2>

        <div>
          <label class="block text-sm font-bold mb-2" for="startDate"
            >Start Date *</label
          >
          <input
            v-model="startDate"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            type="date"
            placeholder="Enter start date"
          />
          <span class="text-red-500 text-sm">{{ startDateError }}</span>
        </div>

        <!-- Description Field -->
        <div>
          <label class="block text-sm font-bold mb-2" for="description"
            >Description *</label
          >
          <textarea
            v-model="description"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            rows="4"
            placeholder="Enter description"
          ></textarea>
          <span class="text-red-500 text-sm">{{ descriptionError }}</span>
        </div>
      </div>
    </div>
  </form>
</template>
