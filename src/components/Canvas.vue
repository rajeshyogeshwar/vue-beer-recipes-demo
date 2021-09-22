<template>
  <div class="wrapper">
    <canvas id="canvas" width="720" height="600" />
  </div>
</template>

<script>

import exampleImage from "../assets/kitty.jpg";
import Annotation from "./Annotation.vue";
import {
  generateBoxList,
  getCurrentBox,
} from "../utils/generateMockData";

export default {
  name: "Canvas",
  data() {
    return {
      mousePointerX: 0,
      mousePointerY: 0,
    }
  },
  methods: {
    drawImageOnCanvas() {
      var ctx = document.getElementById("canvas").getContext("2d");

      var image = new Image();
      image.src = exampleImage;
      var onImageLoad = this.drawAnnotations

      image.onload = function () {
        ctx.drawImage(image, 0, 0);
        onImageLoad();
      };
    
    },
    drawAnnotations() {
      var ctx = document.getElementById("canvas").getContext("2d");
      var annotation = new Annotation();

      let boxes = generateBoxList();

      annotation.$set(annotation, "box_list", boxes);
      annotation.$set(annotation, "current_box", getCurrentBox(boxes));
      annotation.$set(annotation, "refresh", 0);
      annotation.$set(annotation, "mouse_position", {raw: {x: 0, y: 0}});
      annotation.$set(annotation, "canvas_transform", {scale: 1});
      annotation.$set(annotation, "draw_mode", false);
      annotation.$set(annotation, "show_annotations", true);
      annotation.draw(ctx);
    },
  },
  mounted() {
    this.drawImageOnCanvas();
  }
}
</script>

<style>
  .wrapper {
    width: 720px;
    height: 600px;
    margin: auto;
  }
</style>