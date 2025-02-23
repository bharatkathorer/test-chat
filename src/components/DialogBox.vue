<script setup>
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,} from '@headlessui/vue'
import {XMarkIcon} from "@heroicons/vue/24/outline";

// import Spinner from "@/Icons/Spinner.vue";
import PrimaryButton from "@/components/forms/PrimaryButton.vue";
// import SecondaryButton from "@/components/Default/SecondaryButton.vue";

defineProps({
  modelValue: Boolean,
  heading: String,
  description: String,
  buttonName: {
    type: String,
    default: 'Delete'
  },
  isCancel: {
    type: Boolean,
    default: true
  },
  is_loading: {
    type: Boolean,
    default: false
  },
  overflowHidden: {
    type: Boolean,
    default: false
  },
  CustomClass: {
    type: String,
    default: 'w-full max-w-lg'
  },
  showCancelButton: {
    type: Boolean,
    default: true
  },
  message: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue', 'confirmSubmit']);

</script>

<template>

  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" @close="emit('update:modelValue',false)" class="relative z-40">
      <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25"/>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
          >
            <DialogPanel
                class=" transform rounded-sm bg-white text-left align-middle shadow-xl transition-all"
                :class="`${overflowHidden&&'overflow-hidden'} ${CustomClass}`">

              <slot name="header">
                <DialogTitle as="h3"
                             class="text-lg leading-6 font-medium text-gray-900 flex justify-between items-center px-6 py-4 space-x-8">
                  <div class="flex-1">
                    <slot name="left-header"> {{ heading }}</slot>
                  </div>
                  <XMarkIcon @click="emit('update:modelValue',false)"
                             class="h-5 w-5 text-primary-light cursor-pointer hover:text-gray-600 ease-in-out"/>
                </DialogTitle>
              </slot>
              <div class="p-6 pb-0 pt-0">

                <div class="mt-2">
                  {{ description }}
                  <slot></slot>
                </div>
              </div>

              <slot name="footer">
                <div class="bg-gray-50 px-4 py-3 sm:px-6 flex sm:flex-row-reverse pt-3 ">

                  <div>
                    <PrimaryButton type="submit" @click="emit('confirmSubmit')"
                                   class="flex space-x-4 item-center">
                      <!--                      <Spinner v-if="is_loading" class="animate-spin h-5"/>-->
                      <span>{{ buttonName }}</span>
                    </PrimaryButton>
                  </div>
                  <div v-if="showCancelButton">
                    <PrimaryButton
                        class="!bg-white !text-primary-dark hover:!bg-gray-100 hover:border-white mx-4"
                        v-if="isCancel"
                        type="button"
                        @click="emit('update:modelValue',false)">
                      Cancel
                    </PrimaryButton>
                  </div>
                  <div class="self-center mx-2">
                    <span class="text-green-600">{{ message }}</span>
                  </div>
                </div>
              </slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
