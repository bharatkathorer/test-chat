<template>
    <div class="w-full">

        <Disclosure :defaultOpen="defaultOpen" v-slot="{ open }">
            <DisclosureButton :disabled="disabled" ref="button" aria-label="panel"
                              :class="classes" class="w-full cursor-pointer">
                <div class="flex items-center !justify-around w-full space-x-4">
                    <div class="flex-1 text-left">
                        <slot></slot>
                    </div>
                    <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''"
                                   class="h-5 w-5 ease-in-out duration-500"/>
                </div>
            </DisclosureButton>

            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-out"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
                <DisclosurePanel>
                    <div :class="bodyClass">
                        <slot name="body"/>
                    </div>
                </DisclosurePanel>
            </transition>
        </Disclosure>
    </div>
</template>

<script setup>
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue'
import {ChevronUpIcon} from '@heroicons/vue/20/solid'
import {ref} from "vue";

const button = ref()
const props = defineProps({
    classes: [String,Array],
    defaultOpen: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    bodyClass: {
        type: String,
        default: 'mt-2'
    }

})

function openDiscloser() {
    if (!props.disabled) {
        event.preventDefault();
        if (button.value !== null) {
            button.value.$el.click()
        }
    }
}
</script>
