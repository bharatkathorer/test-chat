<template>
  <div @click="toggleChat"
       class="fixed bottom-10 right-10 bg-blue-500 text-white flex items-center justify-center rounded-full h-10 w-10 cursor-pointer ">
    <XMarkIcon :class="!isShow&&'hidden'" class="h-6 w-6 ease-in-out duration-500"/>
    <ChatBubbleBottomCenterIcon :class="isShow&&'hidden'" class="h-6 w-6 ease-in-out duration-500"/>
  </div>
  <!-- Chat Box -->
  <div :class="!isShow&&'hidden'"
       class=" max-w-xl fixed bottom-24 z-50 right-10 bg-white ease-in-out duration-500 border rounded-lg overflow-hidden shadow-lg">
    <div class="bg-white ">
      <div v-if="!isChat" class="flex flex-col h-96 ">
        <div class="bg-gray-50 py-1 px-2 sticky top-0">
          <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Hey, User  </h2>
        </div>
        <div class="flex-1 overflow-y-auto">
          <ul>
            <slot name="messageBox">
<!--              <form @submit.prevent="sendMessage" class=" flex bg-gray-50">-->
<!--                <input v-model="searchForm.query"-->
<!--                       @input="handleSearch"-->
<!--                       type="text" placeholder="Search..."-->
<!--                       class="w-full border-b px-4 py-2 !rounded-r-none-->
<!--                        ring-0 hover:ring-0 active:ring-0 focus:ring-0-->
<!--                         focus-visible:outline-none">-->
<!--              </form>-->
            </slot>
            <li v-if="users.length">
              <a v-for="(item) in users" :key="item.id"
                 @click="openChat(item)"
                 class="flex relative items-center w-72 px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                <img class="object-cover w-10 h-10 rounded-full"
                     :src="`https://ui-avatars.com/api/?name=${item?.receiver_name}&background=4e80ee&color=fff`" alt="username"/>
                <span v-if="item.count"
                      class="absolute text-xs bg-success text-white rounded-full left-2 bottom-1 px-1">{{
                    item.count
                  }}</span>
                <div class="w-full pb-2">
                  <div class="flex justify-between">
                    <span class="block ml-2 font-semibold text-gray-600">{{ item.receiver_name??item.receiver_number }}</span>
                    <span class="block ml-2 text-sm text-gray-600">{{ item.msg_time }}</span>
                  </div>
                  <span class="block ml-2 text-sm text-gray-600 truncate w-40">{{ item.last_msg }}</span>
                </div>
              </a>
            </li>
            <li v-else class="px-4 py-4 text-center w-72">
              No record found
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="flex flex-col h-96">
        <div class="bg-gray-50  sticky top-0">
          <a
              class="flex items-center px-3 py-2  space-x-4 text-sm transition duration-150 ease-in-out border-b border-gray-300 focus:outline-none">
            <ArrowLeftIcon @click="()=>{
              isChat='';
                emit('closeChat');
            }" class="h-5 w-5 cursor-pointer "/>
            <img class="object-cover w-10 h-10 rounded-full"
                 :src="`https://ui-avatars.com/api/?name=${isChat.receiver_name??isChat.receiver_number}&background=4e80ee&color=fff`" alt="username"/>
            <div class="w-full pb-2">
              <div class="flex justify-between">
                <span class="block ml-2 font-semibold text-gray-600">{{ isChat.receiver_name??isChat.receiver_number }}</span>
              </div>
            </div>
          </a>
        </div>
        <div class="flex-1 overflow-y-auto px-4 py-2" id="chatMessage">

          <div class="flex flex-col space-y-2">
            <slot>
              <div v-for="(item,index) in user?.messages??[]" :key="index" :class="(item.is_sender==='true')?'items-end':'items-start'"
                   class="flex flex-col">
                <div class=" text-white rounded-lg p-2 max-w-xs" :class="(item.is_sender==='true')?'bg-green-500':'bg-blue-500'">
                  <p>{{ item.message }}</p>
                </div>
                <span class="text-sm text-gray-500">

                  {{ formatTime(item.created_at) }}
                </span>
              </div>
            </slot>
          </div>
        </div>

        <slot name="messageBox">
          <form @submit.prevent="sendMessage" class="p-4 border-t flex bg-gray-50">
            <input v-model="form.message"
                   type="text" placeholder="Type your message..."
                   class="w-full border rounded-lg px-4 py-2 !rounded-r-none ring-0 hover:ring-0 active:ring-0 focus:ring-0 focus-visible:outline-none ">
            <button type="submit" class="btn-front rounded-l-none rounded-lg">
              <PaperAirplaneIcon class="h-5 w-5"/>
            </button>
          </form>
        </slot>
      </div>
    </div>
  </div>

</template>
<script setup>
import {ChatBubbleBottomCenterIcon, XMarkIcon, PaperAirplaneIcon, ArrowLeftIcon} from "@heroicons/vue/20/solid";
import {onMounted, ref} from "vue";
import {debounce} from 'vue-debounce'

const isChat = ref(null);
const isShow = ref(false);
const authUser = ref({});

defineProps({
  users: [Object, Array],
  searchUsers: [Object, Array],
  user: [Object, Array],
})

onMounted(() => {
  let _user = localStorage.getItem('front_user');
  authUser.value = JSON.parse(_user);
})
const toggleChat = () => {
  isShow.value = !isShow.value;
}

const form = ref({
  message: ''
})
const searchForm = ref({
  query: ''
})
const emit = defineEmits(['sendMessage', 'openChat', 'closeChat', 'search']);

const sendMessage = () => {
  emit('sendMessage', form.value.message);
  form.value.message = '';
}
const openChat = (item) => {
  isChat.value = item;
  searchForm.value.query = null;
  emit('openChat', item);
}

const formatTime = (isoString) => {
  const date = new Date(isoString);

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Determine AM/PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${ampm}`;
};
const handleSearch = debounce((val) => emit('search', val.target.value), '400ms')


</script>
