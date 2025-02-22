<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog v-bind="$attrs" as="div" class="relative z-40 lg:hidden" @close="emit('update:modelValue',false)">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                       enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                       leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75"/>
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                         enter-from="-translate-x-full" enter-to="translate-x-0"
                         leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                         leave-to="-translate-x-full">
          <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                             enter-to="opacity-100" leave="ease-in-out duration-300"
                             leave-from="opacity-100" leave-to="opacity-0">
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button type="button"
                        class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        @click="emit('update:modelValue',false)">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true"/>
                </button>
              </div>
            </TransitionChild>
            <div class="flex flex-shrink-0 items-center px-4">
              <slot name="head">
                <!--                                <img class="h-8 w-auto"-->
                <!--                                     src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"-->
                <!--                                     alt="Your Company"/>-->
                <!--                                <LogoIcon class="h-8 w-auto"/>-->
              </slot>
            </div>
            <div class="mt-5 h-0 flex-1 overflow-y-auto">
              <slot/>
            </div>
          </DialogPanel>
        </TransitionChild>
        <div class="w-14 flex-shrink-0">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {XMarkIcon} from '@heroicons/vue/24/outline'
// import LogoIcon from "@/Icons/LogoIcon.vue";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['update:modelValue']);
</script>
