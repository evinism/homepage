import("stdfaust.lib");

freq = hslider("[0]freq",500,50,10000,1);
gain = hslider("[1]gain",1,0,1,0.01);

process = no.pink_noise : fi.bandpass(2,100,freq) * gain <: _, _;