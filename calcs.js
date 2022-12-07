// Run this code using "node calcs.js", optional params:
//     SPRING = Spring Constant (N/m)
// All other params are calculated from the above.

let ACTIVE_MASS = 0.6;
let CHASSIS_MASS = 1;

let SPRING = 3.46;
let DAMPER;

let DAMPING_RATIO = 0.7;
let NATURAL_FREQUENCY;

let WATER_VISCOUSITY = 0.001;

let POT_DIAMETER = 25/1000;
let PISTON_LENGTH = 6/1000;
let PISTON_DIAMETER;
let CLEARANCE;

// Main Logic Function
const main = () => {
    // Get the natural frequency of the system
    NATURAL_FREQUENCY = getNaturalFrequency(CHASSIS_MASS, SPRING);
    // Get the damping constant of the system
    DAMPER = 2 * getDampingConstant(DAMPING_RATIO, ACTIVE_MASS, SPRING)
    // Get the piston diameter
    PISTON_DIAMETER = getDamperDims(WATER_VISCOUSITY, PISTON_LENGTH, POT_DIAMETER, DAMPER);
    // Get the clearance of the piston relative to the pot
    CLEARANCE = getClearance(PISTON_DIAMETER, POT_DIAMETER);

    // Print the results in readable fashion
    console.table({
        "Actitve Mass": ACTIVE_MASS,
        "Chassis Mass": CHASSIS_MASS,
    });

    console.table({
        "Spring Constant (Single)": (SPRING/4).toFixed(4),
        "Spring Constant (Assembly)": SPRING.toFixed(4),
    });

    console.table({
        "Damping Constant" : DAMPER.toFixed(4), 
        "Natural Frequency" : NATURAL_FREQUENCY.toFixed(4), 
    });

    console.table({
        "Piston Diameter" : `${(PISTON_DIAMETER * 1000).toFixed(2)}mm`,
        "Piston Clearance" : `${(CLEARANCE * 1000).toFixed(2)}mm`
    });
}

const getNaturalFrequency = (mass, spring) => {
    // Formula for natural frequency of a system
    return Math.sqrt(spring / mass);
}

const getDampingConstant = (dampingRatio, mass, spring) => {
    // Formula for damping constant of a system
    return Math.sqrt(4 * dampingRatio * mass * spring);
}

const getDamperDims = (viscosity, pistonLength, potDiameter, damper) => {
    // Formula for the diameter of a damper, given the viscosity of the fluid, the length of the piston, the diameter of the pot, and the damping constant
    // This was derived from the formula for the damping force relative to velocity
    return potDiameter - (potDiameter / Math.cbrt(damper / (3 * Math.PI * viscosity * pistonLength)));
}

const getClearance = (pistonDiameter, potDiameter) => {
    // Get clearance using the piston diameter
    return (potDiameter - pistonDiameter)/2;
}

// Run the main function
main();