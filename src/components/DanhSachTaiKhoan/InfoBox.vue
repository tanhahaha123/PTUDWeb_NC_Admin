<template>
  <div class="card text-white" :class="bgclass">
    <div class="card-body">
      <div class="card-left pt-1 float-left">
        <h3 class="mb-0 fw-r m-0" style="font-size: 1.75rem; font-weight: 400;">
          <div v-if="hasPercentage === 'yes'">
            <span class="count float-left">{{ counter }}</span>
            <span>{{ symbol }}</span>
          </div>
          <div v-else>
            <span class="currency float-left mr-1" v-if="symbol">{{
              symbol
            }}</span>
            <span class="count">
              <basix-counter
                :from="25698"
                :to="Number(counter)"
                :duration="4000"
              ></basix-counter>
            </span>
          </div>
        </h3>
        <p class="text-light mt-1 m-0">{{ title }}</p>
      </div>
      <!-- /.card-left -->

      <div class="card-right float-right text-right">
        <i class="icon fade-5" :class="icon"></i>
      </div>
      <!-- /.card-right -->
    </div>
  </div>
</template>

<script>
import { AnimateNumber } from "@/components";
export default {
  name: "info-icon-box",
  props: ["icon", "symbol", "counter", "title", "bgclass", "hasPercentage"]
  // props: {
  //     symbol: String,
  //     counter: Number,
  //     icon: String,
  //     title: String,
  //     bgclass: String,
  //     hasPercentage: String
  // }
};
</script>
