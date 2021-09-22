<template>
	<div></div>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
	props: [
		"ord", 
		"box_list", 
		"current_box", 
		"refresh", 
		"mouse_position",
		"draw_mode", 
		"canvas_transform", 
		"show_annotations",
  ],
  methods: {
		draw: function (ctx, done) {	
			
			if (this.show_annotations === true) {

				// eslint-disable-next-line no-inner-declarations
				function toInt(n) {
					if (isNaN(n) === false) {
						return parseInt(n);
					}
					return n;
				}

				let circle_size = 8 / this.canvas_transform["scale"]
				let font_size = 20 / this.canvas_transform["scale"]
				ctx.font = font_size + "px Verdana";

				// eslint-disable-next-line no-inner-declarations
				function draw_circle(circle_size, x, y, ctx) {
					ctx.beginPath();
					ctx.arc(x, y, circle_size, 0, 2 * Math.PI);
					ctx.stroke();
					ctx.fill();
				}

				let boxes = this.box_list;

				for (var i in boxes) {
					let box = boxes[i]

					if (box.soft_delete != true) {
						if (box.label.is_visible == null || box.label.is_visible == true) {

							ctx.beginPath();
							ctx.lineWidth = "2";

							// Setting up fill style

							let r = box.label.colour.rgba.r;
							let g = box.label.colour.rgba.g;
							let b = box.label.colour.rgba.b;

							if (box.selected === true) {
								ctx.fillStyle = "blue";
							} else {
								ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ", 1)";
							}
							
							// Drawing label on canvas
							ctx.textAlign = "start";

							if (box.label !== undefined) {
								ctx.fillText(box.label.name, toInt(box.x_min + 8), toInt(box.y_min - 8));
							}
							
							if (box.special_condition == true) {
								ctx.setLineDash([5,5])
							} else {
								ctx.setLineDash([]);
							}

							// Drawing the boxes

							if (box.selected === true) {
								ctx.strokeStyle = "blue";
							}
							else {
								ctx.strokeStyle = "rgba("+ r +","+ g +","+ b +", 1)";
							}

							ctx.beginPath();
							ctx.rect(box.x_min, box.y_min, (box.x_max - box.x_min), (box.y_max - box.y_min));
							ctx.fillStyle = "rgba("+ r +","+ g +","+ b +", 0.15)";
							ctx.fill()
							ctx.stroke();
							ctx.closePath()

							if (this.draw_mode == false) {

								// if () {
									/* TODO 
									* if the mouse position is within the rectangle and/or circles we drew
									* emit an event 'box_hover', with the current index 'i',
									* this.mouse_position.raw.x and this.mouse_position.raw.y
									* */
								// }
							}

							if (box.selected == true) {
								ctx.strokeStyle = "blue"
								ctx.fillStyle = "rgba("+ r +","+ g +","+ b +", 0.15)";
							} else {
								ctx.strokeStyle = box.label.colour.hex;
								ctx.fillStyle = "rgba("+ r +","+ g +","+ b +", 1)";
							}
							ctx.stroke()
							
							// Draw circles
							ctx.setLineDash([]);
							draw_circle(circle_size, box.x_min, box.y_min, ctx);
							draw_circle(circle_size, box.x_max, box.y_max, ctx);

						}
					}
				}
			}
			if (done !== undefined) {
				done();
			}
		},
  }
});
</script>