var inc = 0.1
var scl = 20;
var cols, rows;

var t_perlin = 0;
var t_inc = 0.00006;

var nb_particles;
var stickness;

var particles = [];

var flowfield = [];

var canvas;
var particles_input;
var stickness_input;

function setup() {

    dom_setup();

    canvas = createCanvas(800, 500);
    canvas.position(0, 0);
    canvas.parent("sketch-holder");
    cols = floor(width / scl);
    rows = floor(height / scl);

    for (var i = 0; i < nb_particles; i++)
        particles[i] = new Particle();

    flowfield = new Array(cols * rows);

    background(0, 0);
}

function draw() {

    nb_particles = parseFloat(particles_input.value());

    var y_perlin = 0;

    for (var y = 0; y <= rows; y++) {
        var x_perlin = 0;

        for (var x = 0; x <= cols; x++) {
            var v = get_vector(x_perlin, y_perlin, t_perlin);
            //            draw_vector(x, y, v);

            var index = x + y * cols;
            flowfield[index] = v;

            x_perlin += inc;
        }

        y_perlin += inc;
        t_perlin += t_inc;
    }

    for (var i = 0; i < nb_particles; i++) {
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].show();
    }
}

function draw_vector(x, y, v) {

    push(); // Set the configuration
    stroke(255, 50); // Color the line
    translate(x * scl, y * scl); // Move the line
    rotate(v.heading()); // Rotate the line 
    line(0, 0, scl, 0); // Draw the line
    pop(); // Reset configuration
}

function get_vector(x_perlin, y_perlin, t_perlin) {
    var ang = sin(noise(x_perlin, y_perlin, t_perlin) * TWO_PI);
    var v = p5.Vector.fromAngle(ang);
    v.setMag(stickness);
    return v;
}

function dom_setup()
{
    particles_input = createInput();
    particles_input.position(150, 7);
    particles_input.size(50);
    particles_input.value(1000);
    nb_particles = parseFloat(particles_input.value());

    stickness_input = createInput();
    stickness_input.position(150, 44);
    stickness_input.size(50);
    stickness_input.value(0.1);
    stickness = parseFloat(stickness_input.value());




}