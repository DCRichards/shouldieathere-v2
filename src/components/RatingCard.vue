<template>
  <div class="rating-card">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
       <circle cx="100" cy="50" r="40" stroke="#ccc" stroke-width="20" fill="none" />
       <circle cx="100" cy="50" r="40" stroke="#d00130" stroke-width="20" fill="none" />
    </svg> 
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      default: 0,
    },
  },
};
</script>
