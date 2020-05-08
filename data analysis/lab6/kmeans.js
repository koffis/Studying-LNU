var btnReset;
var btnStep;
var btnDemo;
var sliderK;
var samples = [];
var means = [];
var step = 0;
var MEAN = 0;
var VARIANCE = 1.5;


var oldMu, oldSigma;
var x2, multiplier, genReady;

function normal(mu, sigma) {

    var x1, u1, u2, v1, v2, s;

    if ('number' !== typeof mu) {
        throw new TypeError('nextNormal: mu must be number.');
    }
    if ('number' !== typeof sigma) {
        throw new TypeError('nextNormal: sigma must be number.');
    }

    if (mu !== oldMu || sigma !== oldSigma) {
        genReady = false;
        oldMu = mu;
        oldSigma = sigma;
    }

    if (genReady) {
        genReady = false;
        return (sigma * x2) + mu;
    }

    u1 = Math.random();
    u2 = Math.random();

    v1 = (2 * u1) - 1;
    v2 = (2 * u2) - 1;

    s = (v1 * v1) + (v2 * v2);

    if (s >= 1) {
        return normal(mu, sigma);
    }

    multiplier = Math.sqrt(-2 * Math.log(s) / s);

    x1 = v1 * multiplier;
    x2 = v2 * multiplier;

    genReady = true;

    return (sigma * x1) + mu;
}


const settingsRect = [0, 0, 300, 150];
const colors = [
	"#ff0000",
	"#00ff00",
	"#0000ff",
	"#ff00ff",
	"#ffff00",
	"#00ffff",
	"#ff0088",
	"#88ff00",
	"#4400ff",
	"#0088ff",
];

class Point {

    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

}

class Sample extends Point {

    draw() {
        fill(this.color);
        noStroke();
        circle(this.x, this.y, 8);
    }

    assignClassToNearest(means) {
        let nearestMean;
        let nearestMeanDist;

        for (let mean of means) {
            let dist = Math.sqrt((this.x - mean.x) ** 2 + (this.y - mean.y) ** 2);
            if (!nearestMean || dist < nearestMeanDist) {
                nearestMean = mean;
                nearestMeanDist = dist;
            }
        }

        this.color = nearestMean.color;
    }

}

class Mean extends Point {

    draw() {
        fill(this.color);
        stroke(0, 0, 0);
        rect(this.x - 5, this.y - 5, this.x + 5, this.y + 5);
    }

    recalculate(samples) {
        this.x = samples.reduce((t, s) => t + s.x, 0) / samples.length;
        this.y = samples.reduce((t, s) => t + s.y, 0) / samples.length;
    }

}

function pickRandom(list, n) {
    let indexes = [...Array(list.length).keys()];
    let randomIndexes = [];

    while (randomIndexes.length < n) {
        let random = Math.floor(Math.random() * indexes.length);
        randomIndexes.push(indexes.splice(random, 1)[0]);
    }

    return randomIndexes.map((i) => list[i]);
}

function onBtnResetClick() {
    samples = [];
    means = [];
    setStep(0);
}

function onBtnDemoClick() {
    let clusters = [
		createVector(width * 0.16, height * 0.4),
		createVector(width * 0.69, height * 0.26),
		createVector(width * 0.69, height * 0.45),
		createVector(width * 0.55, height * 0.56),
		createVector(width * 0.81, height * 0.71)

	];

    for (let center of clusters) {
        for (let i = 0; i < 40  ; i++) {
            let angle = TWO_PI * Math.random();
            let T = p5.Vector.fromAngle(angle, 1);
            T.x *= normal(MEAN, VARIANCE) * 50;
            T.y *= normal(MEAN, VARIANCE) * 15;
            let point = p5.Vector.add(center, T);
            samples.push(new Sample(point.x, point.y, color(0, 0, 0)));
        }
    }
}

function setStep(newStep) {
    step = newStep;

    if (step == 0) {
        sliderK.show();
        btnDemo.show();
    } else {
        sliderK.hide();
        btnDemo.hide();
    }

    btnStep.html([
		"Центри кластерів",
		"Оприділити точки",
		"Нові центри",
	][step]);
}

function onBtnStepClick() {
    if (means.length == 0) {
        // Sample k random points as new means
        if (samples.length >= sliderK.value()) {
            let newMeans = pickRandom(samples, sliderK.value());
            let index = 0;
            for (let newMean of newMeans) {
                means.push(new Mean(newMean.x, newMean.y, color(colors[index]), index));
                index++;
            }
            setStep(1);
        } else {
            console.warn("Not enough samples for k=" + sliderK.value());
        }
    } else {
        if (step == 1) {
            // Assign each sample to its nearest mean
            for (let sample of samples) {
                sample.assignClassToNearest(means);
            }
            setStep(2);
        } else if (step == 2) {
            // Re-calculate means
            for (let mean of means) {
                mean.recalculate(samples.filter((s) => s.color == mean.color));
            }
            setStep(1);
        }
    }
}



function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CORNERS);

    btnReset = createButton('Перезавантажити');
    btnReset.position(20, 550);
    btnReset.mousePressed(onBtnResetClick);

    btnDemo = createButton('Згенерувати точки');
    btnDemo.position(170, 550);
    btnDemo.mousePressed(onBtnDemoClick);

    btnStep = createButton('Центри кластерів');
    btnStep.position(327, 550);
    btnStep.mousePressed(onBtnStepClick);

    sliderK = createSlider(2, 10, 3, 1);
    sliderK.value(5);
    sliderK.position(500, 550);
    sliderK.style('width', '80px');
}

function draw() {
   

    background(300);

    stroke(255, 255, 255);
    fill(300);
    rect.apply(this, settingsRect);

    stroke(0, 0, 0);
    fill(0, 0, 0);
    textSize(18);
    text("k = " + sliderK.value(), 500, 590);

    for (let sample of samples) {
        sample.draw();
    }
    for (let mean of means) {
        mean.draw();
    }
}
